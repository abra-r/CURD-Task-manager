const express=require('express');
const router=express.Router();
const varifyToken=require('../middleware/varifyToken');
const {createTask,
    getTaskById,
    getTask,
    updateTask,
    deleteTask,
    filterTask}=require('../controllers/taskController');

router.post('/',varifyToken,createTask);
router.get('/:id',varifyToken,getTaskById);
router.get('/',varifyToken,getTask);
router.put('/:id',varifyToken,updateTask);
router.delete('/:id',varifyToken,deleteTask);
router.get('/search',varifyToken,filterTask);
module.exports=router;
