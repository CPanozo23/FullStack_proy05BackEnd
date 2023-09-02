require('dotenv').config()
require('./models/User.model')
require('./models/Consultation.model')
require('./models/Hour.model')
require('./models/Patient.model')
require('./models/Reservation.model')

const cors=require('cors')
const userRoutes=require('./routes/User.routes')
const consultationRoutes=require('./routes/Consultation.routes')
const hourRoutes=require('./routes/Hour.routes')
const patientRoutes=require('./routes/Patient.routes')
const reservationRoutes=require('./routes/Reservation.routes')

const express = require("express")
const app = express()

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

const port = process.env.PORT;



//app.use(cors(corsOptions))
app.use(cors())

/* 

const corsOptions={
    ['http://localhost:5173', 'https://carolinapanozo.netlify.app'],
    optionsSuccessStatus:200
}
const corsOptions={
    origin:[process.env.FRONTEND_URL, process.env.FRONT_URL_DEV],
    optionsSuccessStatus:200
}
app.use(cors(corsOptions))*/
app.use(express.json())
app.use('/users',userRoutes)
app.use('/consultations',consultationRoutes)
app.use('/hours',hourRoutes)
app.use('/patients',patientRoutes)
app.use('/reservations',reservationRoutes)

app.listen(port, () => {
    console.log(`escuchando en el puerto ${port}`)
  })

