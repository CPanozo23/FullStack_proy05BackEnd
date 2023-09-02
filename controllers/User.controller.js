const mongoose = require('mongoose')
const generateToken = require('../helpers/generateToken')
const hashPassword = require('../helpers/hashPassword')

const User = require('../models/User.model')
const Patient = require('../models/Patient.model')
const Reservation = require('../models/Reservation.model')

const signup = async (req, res) => {
    const { run, name, lastName, birthday, email, password } = req.body
    const emailLowerCase = email.toLowerCase()

    try {
        const hashedPassword = hashPassword(password)

        const user = new User({
            run,
            name,
            lastName,
            birthday,
            email: emailLowerCase,
            password: hashedPassword,
            type: 2,
            patients: []
        })
        user.birthday = new Date(new Date(user.birthday).getTime() + 12 * 60 * 60 * 1000)

        const savedUser = await user.save()

        const token = generateToken(savedUser)

        return res.status(201).json({
            message: 'User created',
            token
        })
    } catch (error) {
        if(error.code===11000){
            return res.status(500).json({
                message: 'Run exist',
                code: 11000,
                detail: error.message
            })
        }
        return res.status(500).json({
            message: 'Internal Server Error',
            code: 500,
            detail: error.message
        })
    }
}

const getUsers = async (req, res) => {
    try {
        const resp = await User.find()
        return res.status(200).json({
            message: 'OK',
            detail: resp,
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            code: 500,
            detail: error,
        })
    }
}

const updateUserPatient = async (id, patientId, relationship) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                $push: {
                    patients: {
                        _id: patientId,
                        relationship: relationship
                    }
                }
            },
            { new: true }
        )
        if (updatedUser) {
            return updatedUser
        } else {
            return null
        }

    } catch (error) {
        console.error('Error al actualizar el usuario:', error)
        return null
    }
}

const updateUser = async (req, res) => {
    const _id = req.params._id
    const { type } = req.body
    try {

        if (type === 'email') {
            const { email } = req.body
            const emailLowerCase = email.toLowerCase()
            const existingUser = await User.findOne({ _id })
            if (existingUser.email === emailLowerCase) {
                return res.status(400).json({
                    message: 'Email already exists'
                })
            }
            const user = await User.findByIdAndUpdate(_id,
                { email: emailLowerCase }, // Actualizar el campo correo
                { new: true }
            )

            if (user) {
                const token = generateToken(user)
                return res.status(200).json({
                    message: 'User updated',
                    userId: user._id,
                    token
                })
            }

        } else if (type === 'pw') {
            const { password } = req.body
            const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
            if (!regexPassword.test(password)) {
                return res.status(400).json({
                    message: 'Password must be at least 8 characters long and contain at least one number, one lowercase and one uppercase letter'
                })
            } else {
                const hashedPassword = hashPassword(password)
                const user = await User.findByIdAndUpdate(_id,
                    { password: hashedPassword }, // Actualizar el campo pw
                    { new: true }
                )
                if (user) {
                    const token = generateToken(user)
                    return res.status(200).json({
                        message: 'User updated',
                        userId: user._id,
                        token
                    })
                }
            }
        }

        return res.status(404).json({
            message: 'User not found'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error',
            code: 500,
            detail: error,
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    const emailLowerCase = email.toLowerCase()
    const passwordHash = hashPassword(password)
    try {
        const userValidated = await User.findOne({ email: emailLowerCase })
        if (!userValidated) {
            return res.status(401).json({
                message: 'Usuario no registrado'
            })
        }
        if (userValidated.password === passwordHash) {
            const token = generateToken(userValidated)
            return res.status(200).json({
                message: 'Usuario logueado',
                userId: userValidated._id,
                token
            })
        } else {
            return res.status(401).json({
                message: "invalid password",
                code: 401,
                detail: error,
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: 'Server Error',
            code: 500,
            detail: error,

        })
    }
}

const getUserById = async (req, res) => {
    const { _id } = req.params
    try {
        const user = await User.findOne({ _id })
        if (user) {
            const patientsIds = []
            user.patients.forEach(patient =>
                patientsIds.push((patient._id))
            )
            try {
                const patients = await Patient.find({
                    '_id': { $in: patientsIds }
                })
                patientsIds.forEach(patient => patientsIds.push((patient._id)))

                const reservationsList = await Reservation.aggregate([
                    {
                        $match: {
                            id_patient: { $in: patientsIds }
                        }
                    },
                    {
                        $sort: { id_patient: 1, createdAt: 1 }
                    },
                    {
                        $group: {
                            _id: "$id_patient",
                            reservations: {
                                $push: {
                                    _id: "$_id",
                                    hour: {
                                        startTime: "$hour.startTime",
                                        duration: "$hour.duration"
                                    },
                                    price: "$price",
                                }
                            }
                        }
                    },
                    {
                        $replaceRoot: { newRoot: { id_patient: "$_id", reservations: "$reservations" } }
                    },
                    {
                        $project: {
                            _id: 0
                        }
                    }
                ])
                return res.status(200).json({
                    message: 'ok',
                    detail: user, patients, reservationsList
                })
            } catch (error) {
                return res.status(500).json({
                    message: 'Server Error',
                    code: 500,
                    detail: error,
                })
            }
        }
        return res.status(404).json({
            message: 'Not found'
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Server Error',
            code: 500,
            detail: error,
        })
    }
}

const updateUserById = async (req, res) => {
    const { _id, userUpdated } = req.params
    try {
        const resp = await User.findByIdAndUpdate(_id, userUpdated, { new: true })
        if (resp) {
            return res.status(200).json({
                messege: "ok",
                detail: resp,
            })
        }
        return res.status(404).json({
            message: 'Not found'
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Server Error',
            code: 500,
            detail: error,
        })
    }
}

const getPatientsByUserId = async (req, res) => {
    const { _id } = req.params
    try {
        const user = await User.findOne({ _id })
        if (user) {
            const patientsIds = []
            user.patients.forEach(patient =>
                patientsIds.push((patient._id))
            )
            const patients = await Patient.find({
                '_id': { $in: patientsIds }
            })
            return res.status(200).json({
                message: 'ok',
                detail: patients
            })
        }
        return res.status(404).json({
            message: 'Not found'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error',
            code: 500,
            detail: error,
        })
    }

}

module.exports = {
    signup,
    getUsers,
    updateUserPatient,
    login,
    getUserById,
    updateUser,
    getPatientsByUserId
}