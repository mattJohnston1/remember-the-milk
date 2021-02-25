const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const sidebarRouter = require('./sidebar.js');
const taskRouter = require('./tasks.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/sidebar', sidebarRouter);

router.use('/tasks', taskRouter);

router.post('/test', function (req, res) {
  res.json({ requestBody: req.body });
});


module.exports = router;
