const express = require('express');
const { SignUp, Login, allTask, addTask, updateTask, deleteTask } = require('../controllers/allControllers');
const router = express()

router.post('/signup', SignUp);
router.post('/login', Login);
router.get('/tasks', allTask);
router.post('/tasks', addTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;