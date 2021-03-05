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
        UserModel.updateOne({ username: req.body.username }, { $addToSet: { policies: req.body.username } }, (err, data) => {
          if (err) console.log(err);
        });
        console.log(data);
        res.send("success");
      } else {
        res.send("error");
      }
    }
  );


});

module.exports = router;
