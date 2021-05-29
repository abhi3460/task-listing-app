const Tasks = require("../models/tasks.model");

// @route   GET v1/tasks/
// @desc    Get All Tasks
// @access  Public
function getTasks(req, res) {
  try {
    let { filters } = req.body;
    Tasks.find(filters)
      .sort({ createdAt: -1 })
      .then((tasks) => res.status(200).json(tasks));
  } catch (error) {
    res.status(400).json({
      message: "This is an error!",
      error,
    });
  }
}

// @route   POST v1/tasks/add-task
// @desc    Add Task
// @access  Public
function addTask(req, res) {
  try {
    let taskDetails = req.body;
    Tasks.create(taskDetails).then(() => {
      Tasks.find({}).then((tasks) =>
        res.status(200).json({
          message: "Task Added!",
          tasks,
        })
      );
    });
  } catch (error) {
    res.status(400).json({
      message: "This is an error!",
      error,
    });
  }
}

// @route   PATCH v1/tasks/:id/update-task
// @desc    Update Task By Id (This will be used for marking task as removed functionality as well)
// @access  Public
function updateTask(req, res) {
  try {
    let { id } = req.params;
    let { taskDetails } = req.body;
    Tasks.findByIdAndUpdate(id, taskDetails, (err, task) => {
      if (err) throw err;
      res.status(200).json(task);
    });
  } catch (error) {
    res.status(400).json({
      message: "This is an error!",
      error,
    });
  }
}

// @route   PATCH v1/tasks/:id/remove-task
// @desc    Permanently Remove Task By Id
// @access  Public
function removeTask(req, res) {
  try {
    let { id } = req.params;
    Tasks.deleteOne({ _id: id }, (err, task) => {
      if (err) throw err;
      Tasks.find({}).then((tasks) => res.status(200).json(tasks));
    });
  } catch (error) {
    res.status(400).send({
      message: "This is an error!",
      error,
    });
  }
}

// @route   PATCH v1/tasks/modify-multiple
// @desc    Delete All or Complete All API
// @access  Public
function ModifyMultiple(req, res) {
  try {
    let { flag } = req.body;
    if (flag === "delete") {
      Tasks.deleteMany({}).then(() => {
        res.status(200).json({ message: "All Tasks are deleted!", tasks: [] });
      });
    } else {
      Tasks.find({ isCompleted: false }).then((tasks) => {
        tasks.map((task) => {
          task.isCompleted = true;
          task.save();
        });
        res
          .status(200)
          .json({ message: "All Tasks are marked as completed!", tasks });
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "This is an error!",
      error,
    });
  }
}

module.exports = {
  getTasks,
  addTask,
  updateTask,
  removeTask,
  ModifyMultiple,
};
