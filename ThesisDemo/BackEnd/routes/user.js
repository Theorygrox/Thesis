const router = require("express").Router();
let UserModel = require("../models/userdata");

router.route("/register").post((req, res) => {

  if (req.body.password !== req.body.cpassword) {
    res.send("error1");
  } else {
    UserModel.findOne({ username: req.body.username }, (err, data) => {
      if (err) console.log(err);
      if (data) {
        res.send("error2");
      } else {
        let newUser = [
          {
            username: req.body.username,
            password: req.body.password,
            policies: [],
            favorites: [],
            flights: [],
            labeled: []
          },
        ];
        UserModel.create(newUser, (err) => {
          if (err) return console.log(err);
        });

        res.send("success");
      }
    });
  }
});

router.route("/signin").post((req, res) => {
  UserModel.findOne(
    { username: req.body.username, password: req.body.password },
    (err, data) => {
      if (err) console.log(err);
      if (data) {
        // UserModel.updateOne({ username: req.body.username }, { $addToSet: { policies: req.body.username } }, (err, data) => {
        //   if (err) console.log(err);
        // });
        console.log(data);
        res.send("success");
      } else {
        res.send("error");
      }
    }
  );


});

router.route("/savedlist").post((req, res) => {
  UserModel.findOne(
    { username: req.body.username },
    (err, data) => {
      if (err) console.log(err);
      if (data) {
        var result = JSON.stringify(data, ['policies', 'favorites', 'flights', 'labeled']);
        res.send(result);
        console.log(result);

      } else {
        res.send("error");
      }
    }
  );


});


// UserModel.updateOne({ username: req.body.username }, { $addToSet: { policies: req.body.username } }, (err, data) => {
//   if (err) console.log(err);
// });

router.route("/addlist").post((req, res) => {

  UserModel.updateOne({ username: req.body.username }, { $addToSet: { favorites: req.body.data } }, (err, data) => {
    if (err) console.log(err);
    if (data) {
      res.send("success");
    }
  });

});

router.route("/deletelist").post((req, res) => {

  var section = req.body.section;
  var item = req.body.item;
  var query = {};
  query[section] = item;

  UserModel.updateOne({ username: req.body.username }, { $pull: query }, (err, data) => {
    if (err) console.log(err);
    if (data) {
      res.send("success");
    }
  });

});


module.exports = router;
