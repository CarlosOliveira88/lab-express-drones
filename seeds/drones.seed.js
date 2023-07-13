// Iteration #1

const Drone = require('../models/Drone.model');
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/lab-express-drones";


const drones = [
    { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
    { name: "Racer 57", propellers: 4, maxSpeed: 20 },
    { name: "Courier 3000i", propellers: 6, maxSpeed: 18 }
];

mongoose.connect(MONGO_URI)
    .then(() => {
        return Drone.create(drones);
    })
    .then(createdDrones => {
        console.log(`${createdDrones.length} drones creados.`);
        mongoose.connection.close(); // Cerrar la conexión con la base de datos
    })
    .catch(error => {
        console.error('Error al inicializar la base de datos:', error);
    });
