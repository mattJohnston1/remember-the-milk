const express = require('express');
const asyncHandler = require('express-async-handler');

const { Task } = require('../../db/models')

const router = express.Router();

//get all tasks
router.get('/:userId/', asyncHandler(async function (req, res) {
  const userId = req.params.userId;

  const tasks = await Task.findAll({
    where: {
      userId: userId,
    }
  });

  return res.json(tasks);
}));

//get all tasks for a specific table
router.get('/list/:userId/:listId', asyncHandler(async function (req, res) {
  const userId = req.params.userId;
  const listId = req.params.listId;

  const tasks = await Task.findAll({
    where: {
      userId: userId,
      listId: listId,
    }
  });

  return res.json(tasks);
}));

router.post('/:userId/:listId', asyncHandler(async function (req, res) {
  const userId = req.params.userId;
  const listId = req.params.listId;
  const { text } = req.body;

  const newTask = await Task.create({ userId, listId, text });
  return res.json(newTask);
}));

router.delete('/:taskId', asyncHandler(async function (req, res) {
  const taskId = req.params.taskId;
  const task = await Task.findByPk(taskId);
  await task.destroy();
  // res.status(204).end();
  res.status(204)
    .json({
      status: 'success',
      data: [],
      message: `Successfully deleted`
    })
}));
//save task to a different var and create a new Task with a list id of a completed table and then delete the old one


router.get('/test/:taskId', asyncHandler(async function (req, res) {
  const taskId = req.params.taskId;
  const task = await Task.findByPk(taskId);
  return res.json(task);
}));
module.exports = router;
