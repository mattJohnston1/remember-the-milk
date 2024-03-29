const express = require('express');
const asyncHandler = require('express-async-handler');

const { List } = require('../../db/models')

const router = express.Router();

router.get('/:userId/lists', asyncHandler(async function (req, res) {
  const id = req.params.userId;

  const lists = await List.findAll({
    where: {
      userId: id,
    }
  })
  return res.json(lists);
}));

router.get('/:listId', asyncHandler(async function (req, res) {
  const listId = req.params.listId;

  const list = await List.findByPk(listId);

  return res.json(list);
}))

router.delete('/list/:listId', asyncHandler(async function (req, res) {
  const listId = req.params.listId;
  const list = await List.findByPk(listId);
  await list.destroy();

  return res.json(list);
}))



router.post('/:userId/lists', asyncHandler(async function (req, res) {
  const id = req.params.userId;
  const { name } = req.body;

  await List.create({ name, userId: id, createdAt: new Date(), updatedAt: new Date() });
  const lists = await List.findAll({
    where: {
      userId: id,
    }
  })
  return res.json(lists);
}));

// router.get('/:userId/tags', asyncHandler(async function (req, res) {
//   const id = req.params.userId;

//   const tags
// }))

module.exports = router;
