const User=require("../models/user-model")


const getAllUser=async(req,res,next)=>{

    try {
        const users=await User.find({},{password:0});
        if(!users || users.length===0){
            return res.status(200).json({message:"user not found"})
        }
        res.status(200).json(users);
        
    } catch (error) {
        next(error);
    }
}

const deleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedUser = await User.deleteOne({ _id: id });

        if (deletedUser.deletedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
};

const getSingleUser=async(req,res,next)=>{
    try {
        const id = req.params.id;
        const data=await User.findOne({_id:id},{passwaord:0})
        return res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
}

const updateUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updateUserData = req.body;
        const updatedData = await User.updateOne({ _id: id }, { $set: updateUserData });

        if (updatedData.modifiedCount === 0) {
            return res.status(404).json({ message: "User not found or no changes made" });
        }

        return res.status(200).json({ updatedData });
    } catch (error) {
        next(error);
    }
};





module.exports={getAllUser,deleteUserById,getSingleUser,updateUserById}