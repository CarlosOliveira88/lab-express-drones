const express = require('express');
const router = express.Router();
const Drone = require('../models/Drone.model');
// require the Drone model here

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find()
    .then((drones) => {
      res.render('drones/list', { drones });
    })
    .catch((error) => {
      console.error('Error al recuperar los drones:', error);
      next(error);
    });
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render('drones/create-form');
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  const { name, propellers, maxSpeed } = req.body;

  const newDrone = new Drone({ name, propellers, maxSpeed });

  newDrone.save()
    .then(() => {
      res.redirect('/drones');
    })
    .catch((error) => {
      console.error('Error al guardar el nuevo dron:', error);
      res.render('drones/create-form');
    });
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const dronId = req.params.id;

  Drone.findById(dronId)
    .then((dron) => {
      res.render('drones/update-form', { dron });
    })
    .catch((error) => {
      console.error('Error al obtener el dron:', error);
      next(error);
    });
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const dronId = req.params.id;
  const { name, propellers, maxSpeed } = req.body;

  Drone.findByIdAndUpdate(dronId, { name, propellers, maxSpeed })
    .then(() => {
      res.redirect('/drones');
    })
    .catch((error) => {
      console.error('Error al actualizar el dron:', error);
      res.render('drones/update-form', { dron: req.body });
    });
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  const dronId = req.params.id;

  Drone.findByIdAndDelete(dronId)
    .then(() => {
      res.redirect('/drones');
    })
    .catch((error) => {
      console.error('Error al eliminar el dron:', error);
      next(error);
    });
});

module.exports = router;
