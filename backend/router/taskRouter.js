const express=require('express');
const router=express.Router();
const varifyToken=require('../middleware/varifyToken');
const {createTask,
    getTaskById,
    getTask,
    updateTask,
    deleteTask,
    filterTask}=require('../controllers/taskController');
router.get('/filter',varifyToken,filterTask);
router.post('/create',varifyToken,createTask);
router.get('/:id',varifyToken,getTaskById);
router.get('/',varifyToken,getTask);
router.put('/edit/:id',varifyToken,updateTask);
router.delete('/delete/:id',varifyToken,deleteTask);

module.exports=router;
