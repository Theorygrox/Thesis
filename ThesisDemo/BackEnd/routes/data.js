const router = require("express").Router();
let Data = require("../models/data.model");

router.route("/").get((req, res) => {
  Data.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const region = req.body.region;
  const total = req.body.total;
  const newCases = req.body.newCases;
  const death = req.body.death;

  const newUser = new Data({ region, total, newCases, death });

  newUser
    .save()
    .then(() => res.json("Data added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
