const router = require("express").Router();
let whoData = require("../models/whoData.model");

router.route("/").get((req, res) => {
  whoData
    .find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
});

// router.route("/fetch").post((req, res) => {
//   whoData.findOne({ Name: req.body.Name }, (err, data) => {
//     if (err) console.log(err);
//     if (data) {
//       console.log(data);
//       res.send("success");
//     } else {
//       res.send("error1");
//       console.log(req.body.Name);
//     }
//   });
// });

router.route("/fetch").post((req, res) => {
  whoData
    .findOne({ Name: req.body.Name })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
