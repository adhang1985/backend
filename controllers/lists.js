const User = require('../model/userSchema');
const List = require('../model/listSchema');

// create task
const createTask = async(req,res) => {
    try {
        const { title,body,email } = req.body;
        if(!title || !body || !email){
            return res.status(404).json({message: "Please fill all the inputs!"});
        }
        const existingUser = await User.findOne({email});
        // if(!existingUser){
        //     return res.status(404).json({message: "User with this email is not exist!"})
        // }
        const newList = new List({title,body,user:existingUser});
        await newList.save();
        existingUser.list.push(newList);
        await existingUser.save();
        res.status(201).json({
            success: true,
            message: "Task is created Successfully"
        })
    } catch (error) {
        res.status(500).json({message:'Server error'});
        
    }
}

// update task
const updateTask = async(req,res) => {
    try {
        const { title,body } = req.body;
        
        await List.findByIdAndUpdate(req.params.id,{title,body});
        res.status(200).json({
            success: true,
            message: "Task is updated Successfully"
        })
    } catch (error) {
        res.status(500).json({message:'Server error'});
        
    }
}

// delete task
const deleteTask = async(req,res) => {
    try {
        const { email } = req.body;
        const existingUser = await User.findOneAndUpdate({email},{$pull:{list:req.params.id}});
        
        if(existingUser){
            await List.findByIdAndDelete(req.params.id);
            res.status(200).json({
                success: true,
                message: "Task is deleted"
            })
        }
        
    } catch (error) {
        res.status(500).json({message:'Server error'});
        
    }
}

// get task by list id
const getTaskById = async(req,res) => {
    try {
        const taskId = req.params.id;
        const selectedTask = await List.findOne({_id:taskId});
        res.status(200).json({
            status:"success",
            data:selectedTask,
            message:"data fetched successfully"
        })
    } catch (error) {
        res.status(500).json("Internal server error");
    }
}

// get tasks
const getAllTask = async(req,res) => {
    try {
        const allTask = await List.find({user:req.params.id}).sort({createdAt: -1});
        if(allTask.length !== 0){
            res.status(200).json({
                success: true,
                data:allTask
            })
        }
        else{
            res.status(200).json({
                message: "No Task Found"
            })
        }
        
    } catch (error) {
        res.status(500).json({message:'Server error'});
    }
}

module.exports = {createTask,updateTask,deleteTask,getAllTask,getTaskById};