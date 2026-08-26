
const Task = require('../models/task');
const createTask = async (req, res) => {

    const user = req.user;
    const { title, descreption } = req.body;
    if (!user || !title) {
        return res.status(401).json({ error: "invalid user or title is missing", title, user });
    }

    const owner = user.user_id;
    const task = await Task.create({ title, descreption, owner });
    res.status(201).json({ message: `Task \'${title}\' created` });

}
const getTaskById = async (req, res) => {
    const task_id = req.params.id;
    const uid = req.user.user_id;

    try {
        const task = await Task.findOne({ _id: task_id, owner: uid });
        if (!task) {
            return res.status(404).json({ error: `No task found of the id:${task_id}` })
        }
        return res.status(200).json({ task });
    }
    catch (err) {
        return res.status(400).json({ error: err });
    }

}
const getTask = async (req, res) => {
    const uid = req.user.user_id;
    const tasks = await Task.find({ owner: uid });
    if (!tasks) {
        return res.status(404).json({ error: "No task found for the user" });

    }
    return res.status(200).json({ tasks });
}
const updateTask = async (req, res) => {
    const task_id = req.params.id;
    const uid = req.user.user_id;


    const task = await Task.findOne({ _id: task_id, owner: uid });

    if (!task) {
        return res.status(404).json({ error: `Task not found` });

    }

    task.title = req.body.title || task.title;
    task.descreption = req.body.descreption || task.descreption;
    if ('completed' in req.body) {
        task.completed = req.body.completed;
    }
    const savedTask = await task.save();
    return res.status(200).json({ message: `task updated successfully`, task: savedTask });

}
const deleteTask = async (req, res) => {
    const task_id = req.params.id;
    const uid = req.user.user_id;


    const task = await Task.findOne({ _id: task_id, owner: uid });
    if (!task) {
        return res.status(404).json({ error: `Task not found` });

    }
    try {
        await Task.deleteOne({ _id: task_id });
        res.status(202).json({ message: `successfully the task deleted` });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}
const filterTask = async (req, res) => {
    const completed = req.query;
    const uid = req.user.user_id;
    const query = { owner: uid };

    if (completed != undefined) {
        query.completed = completed === 'true';
    }
    try {
        const tasks = await Task.find(query);
        return res.status(200).json({ tasks });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }

}
module.exports = { createTask, getTaskById, getTask, updateTask, deleteTask, filterTask };