const express = require('express');
const { createTask, updateTask, deleteTask, getAllTask, getTaskById } = require('../controllers/lists');
const verifyToken = require('../middleware/verifytoken');
const router = express.Router();

router.post('/addTask',verifyToken,createTask);
router.put('/editTask/:id',verifyToken,updateTask);
router.delete('/deleteTask/:id',deleteTask);
router.get('/getAllTasks/:id',verifyToken,getAllTask);
router.get('/getTask/:id',verifyToken,getTaskById);

module.exports = router;