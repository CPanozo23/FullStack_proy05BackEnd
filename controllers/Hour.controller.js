const mongoose=require('mongoose')
const cron = require('node-cron');
const Hour=mongoose.model('Hour')

const register= async (req,res)=>{
    const {startTime,duration}=req.body
    try {
        console.log(req.body)
        const hour= new Hour({
            startTime,duration,
            state:"available"
        })
        console.log("Hour creado ", hour)
        const resp=await hour.save()
        console.log("resp: ", resp)
        return res.status(201).json({
            message: 'Hour created',
            hour
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            code:500,
            detail: error,
        })
    }
}
const getHours= async(req,res)=>{
    try {
        const resp=await Hour.find()
        return res.status(200).json({
            message:'OK',
            detail:resp,
        })
    } catch (error) {
         return res.status(500).json({
            message: 'Internal Server Error',
            code:500,
            detail: error,
         })
    }
}
const updateHour=async (req,res)=>{
    const{_id,hourUpdated}=req.body
    console.log(_id,hourUpdated)
    try {
        const resp=await Hour.findByIdAndUpdate(_id,hourUpdated, {new:true})
        return res.status(200).json({
            messege:"ok",
            detail:resp,
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error",
            code:500,
            detail: error,
        })
    }
}

const deleteHour=async (req,res)=>{
    const{_id}=req.body
    console.log(_id)
    try {
        const resp=await Hour.findByIdAndDelete(_id)
        return res.status(200).json({
            messege:"ok",
            detail:resp,
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error",
            code:500,
            detail: error,
        })
    }
}

const getHourById=async(req,res)=>{
    const _id=req.params
    try {
        const hour=await Hour.findOne({_id})
        if(hour){
            return res.status(200).json({
                message:'ok',
                detail:hour
            })
        }
        return res.status(404).json({
            message:'Not found'
        })
        
    } catch (error) {
        return res.status(500).json({
            message:'Server Error',
            code:500,
            detail: error,
        })
    }   
}
const deleteHourById=async(req,res)=>{
    const{_id}=req.params
    try {
        const resp=await Hour.findByIdAndDelete(_id)
        if(resp){            
            return res.status(200).json({
            messege:"ok",
            detail:resp,
        })
        }
        return res.status(404).json({
            message:'Not found'
        })
        
    } catch (error) {
        return res.status(500).json({
            message:'Server Error',
            code:500,
            detail: error,
        })
    }   
}
const updateHourById=async(req,res)=>{
    const{_id}=req.params
    const{hourUpdated}=req.body
    try {
        const resp=await Hour.findByIdAndUpdate(_id,hourUpdated, {new:true})
        if(resp){            
            return res.status(200).json({
            messege:"ok",
            detail:resp,
        })
        }
        return res.status(404).json({
            message:'Not found'
        })
        
    } catch (error) {
        return res.status(500).json({
            message:'Server Error',
            code:500,
            detail: error,
        })
    }   
}

const getHourByIdd=async(_id)=>{
    try {
        const hour=await Hour.findOne({_id})
        if(hour){
            return hour
            }
        return null      
    } catch (error) {
        return error
    }
    
}
const updateHourByIdd=async(_id)=>{
    try {
        const hour = await Hour.findByIdAndUpdate(
            _id,
            { $set: { state: "reserved" } },
            { new: true }
        )
        if(hour){
            console.log("cambio de estado de hour")            
            return hour
        }
        console.log("no cambio de estado de hour") 
        return
    } catch (error) {
        console.log("no no cambio de estado de hour") 
        return
    }   
}

const updateHourByIddReq=async(req,res)=>{
    const{id_hour, newState}=req.body
    const _id=id_hour
    
    try {
        const resp = await Hour.findByIdAndUpdate(
            _id,
            { $set: { state: newState } },
            { new: true }
        )

        console.log(resp)
        if(resp){   
            cron.schedule('*/5 * * * *', () => {
                if (resp.state === "pending") {
                  updateHourToAvailable(_id)
                }
              })         
            return res.status(200).json({
            messege:"ok",
            detail:resp,
        })
        }
        return res.status(404).json({
            message:'Not found'
        })
        
    } catch (error) {
        return res.status(500).json({
            message:'Server Error',
            code:500,
            detail: error,
        })
    } 
}

const getHoursTrue = async (req, res) => {
    try {
        const currentDate = new Date()
        currentDate.setDate(currentDate.getDate() + 1)

        const resp = await Hour.aggregate([
            {
                $match: {
                    startTime: { $gte: currentDate },
                    state: "available",
                }
            },
            {
                $addFields: {
                    day: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$startTime",
                        }
                    }
                }
            },
            {
                $group: {
                    _id: "$day",
                    hours: { $push: "$$ROOT" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);
        console.log(resp)
        return res.status(200).json({
            message: 'OK',
            detail: resp,
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            code:500,
            detail: error,
        })
    }
}

const updateHourToAvailable = async (_id) => {
    try {
      const hour = await Hour.findByIdAndUpdate(
        _id,
        { $set: { state: "available" } },
        { new: true }
      );
      if (hour) {
        console.log("Change to 'available' hour");
      }
    } catch (error) {
      console.error("Error in change to 'available' hour", error);
    }
  }

module.exports={
    register,
    getHours,
    updateHour,
    deleteHour,
    getHourById,
    deleteHourById,
    updateHourById,
    getHourByIdd, //from other controller
    updateHourByIdd, //from other controller
    getHoursTrue,
    updateHourByIddReq
}