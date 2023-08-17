const jwt=require('jsonwebtoken')
const secret=process.env.JWT_SECRET_KEY

const generateToken=(user)=>{
    const {_id,name,lastName, email,type}=user
    const typeUser= type ===1 ? "admin":"client" 
    return jwt.sign({
        _id,
        name,
        lastName,
        email,
        typeUser
    },secret, {
        expiresIn:'1d'
    } ) 
}


module.exports=generateToken
