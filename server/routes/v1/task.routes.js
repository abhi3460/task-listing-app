const express = require('express');

const taskController = require('../../controllers/task.controller');

const router = express.Router();

router.get('/', taskController.getTasks);
router.post('/add-task', taskController.addTask);
router.patch('/:id/update-task', taskController.updateTask);
router.delete('/:id/remove-task', taskController.removeTask);
router.patch('/modify-multiple', taskController.ModifyMultiple);

module.exports = router;