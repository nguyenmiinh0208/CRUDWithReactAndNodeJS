const express = require('express');
const personRoutes = express.Router();

// Require Business model in our routes module
let Person = require('./businessModel');

personRoutes.route('/add').post(function (req, res) {
  let person = new Person(req.body);
  person.save()
      .then(person => {
          res.status(200).json({'person': 'person in added successfully'});
      })
      .catch(err => {
          res.status(400).send("unable to save to database");
      });
});

personRoutes.route('/').get(function(req, res) {
  Person.find(function(err, person) {
    if (err) throw err;
    else res.json(person);
  });
});

personRoutes.route('/edit/:id').get(function(req, res) {
  let id = req.params.id;
  Person.findById(id, function(err, business) {
    res.json(business);
  });
});

personRoutes.route('/update/:id').post(function(req, res) {
  let id = req.params.id;
  Person.findById(id, function(err, person) {
    if (!person) {
      res.status(404).send('Data is not found');
    } else {
      console.log(person);
      person.name = req.body.name;
      person.company = req.body.company;
      person.age = req.body.age;
      person.save()
        .then(business => {
          res.json('Update complete')
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

personRoutes.route('/delete/:id').get(function(req, res) {
  Person.findOneAndDelete({_id: req.params.id}, function(err, person){
    if (err) throw err;
    else res.json('Remove successfully');
  })
});

module.exports = personRoutes;