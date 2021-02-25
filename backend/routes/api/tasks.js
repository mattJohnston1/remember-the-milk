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
  // const userId = 1;
  // const listId = 2;

  const tasks = await Task.findAll({
    where: {
      userId: userId,
      listId: listId,
    },
    // order: createdAt,
  });

  return res.json(tasks);
}));

module.exports = router;
