
const Task = require('../models/task');
const asyncHandler = require('../utils/asyncHandler');

const createTask = asyncHandler(async (req, res) => {

    const user = req.user;
    const { title, description } = req.body;
    if ( !title) {
        return res.status(400).json({ error: "title is missing", title});
    }

    const owner = user.user_id;
    const task = await Task.create({ title, description, owner });
    res.status(201).json({ message: `Task \'${title}\' created` });

});
const getTaskById = asyncHandler(async (req, res) => {
    const task_id = req.params.id;
    const uid = req.user.user_id;


    const task = await Task.findOne({ _id: task_id, owner: uid });
    if (!task) {
        return res.status(404).json({ error: `No task found of the id:${task_id}` })
    }
    return res.status(200).json({ task });


});
const getTask = asyncHandler(async (req, res) => {
    const uid = req.user.user_id;
    const tasks = await Task.find({ owner: uid });
    
    return res.status(200).json({ tasks });
})
const updateTask = asyncHandler(async (req, res) => {
    const task_id = req.params.id;
    const uid = req.user.user_id;


    const task = await Task.findOne({ _id: task_id, owner: uid });

    if (!task) {
        return res.status(404).json({ error: `Task not found` });

    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    if ('completed' in req.body) {
        task.completed = req.body.completed;
    }
    const savedTask = await task.save();
    return res.status(200).json({ message: `task updated successfully`, task: savedTask });

})
const deleteTask = asyncHandler(async (req, res) => {
    const task_id = req.params.id;
    const uid = req.user.user_id;


    const task = await Task.findOne({ _id: task_id, owner: uid });
    if (!task) {
        return res.status(404).json({ error: `Task not found` });

    }

    await task.deleteOne();
    res.status(200).json({ message: `successfully the task deleted` });


});
const filterTask = asyncHandler(async (req, res) => {
    const {completed} = req.query;
    const uid = req.user.user_id;
    const query = { owner: uid };

    if (completed !== undefined) {
        query.completed = completed === 'true';
    }

    const tasks = await Task.find(query);
    return res.status(200).json({ tasks });




});
module.exports = { createTask, getTaskById, getTask, updateTask, deleteTask, filterTask };