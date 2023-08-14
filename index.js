// 1- GENERAL
const express = require("express");
const app = express();
//const port = process.env.PORT;
//const port=4000

//PARA AVANZAR EN TAREA
require("dotenv").config();
require('./models/User.model')
require('./models/Products.model')

const cors=require('cors')
const userRoutes=require('./routes/User.routes')
const productsRoutes=require('./routes/Products.routes')

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI + 'tienda');

const port = process.env.PORT;

const corsOptions={
    origin:process.env.FRONTEND_URL,
    optionsSuccessStatus:200
}
app.use(cors(corsOptions))
app.use(express.json())
app.use('/users',userRoutes)
app.use('/products',productsRoutes)

// 7- Enviar datos en la petición utilizando Body y un middleware(se sabe que lo es porque utiliza el "use"), postman
app.use(express.json())
//http://localhost:4000/body
//POSTMAN: Body -> raw -> JSON
/*
{
    "nombre" : "cecilia",
    "apellido" : "panozo"
} */ 
/*app.get("/body", (req, res) => {
    const {nombre, apellido} = req.body
    res.status(200).json({
      mensaje: `Bienvenido ${nombre} ${apellido} a web con express`
    });
  });*/
// 3- GET
/*app.get("/", (req, res) => {
    res.status(200).json({
      mensaje: "ruta get",
    });
  });
*/
  // 6- Get de ruta id con 2
  /*app.get("/:nombre/:apellido", (req, res) => {
    //Ej: http://localhost:4000/Cecilia/Panozo -> imprime Cecilia Panozo
      res.json({
          mensaje: req.params.nombre + " " + req.params.apellido
      })
      
    });*/


  // 5- Get de ruta query
  /*app.get("/rutaquery", (req, res) => {
    //Ej: http://localhost:4000/rutaquery?nombre=Cecilia&apellido=Panozo -> imprime Cecilia Panozo
      res.json({
          mensaje: req.query.nombre + " " + req.query.apellido
      })
      
    });*/
  
  // 4- Get de ruta de id: 

  //app.get("/:id", (req, res) => {
    //Ej: http://localhost:4000/holi ->imprime holi
      /*res.json({
          mensaje: req.params.id 
      })*/
     /* res.status(200).json({
        mensaje: "ruta get id",
      });
    });*/

// 2- AL FINAL
app.listen(port, () => {
    console.log(`eschuchando en el puerto ${port}`);
  });

