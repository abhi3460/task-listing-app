const mongoose = require("mongoose");

const { Schema } = mongoose;

const TaskSchema = Schema(
  {
    taskname: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    datetime: {
      type: String,
      required: true,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    timer_time: {
      type: Number,
      default: 0,
    },
    subTasks: [],
  },
  {
    timestamps: true,
  }
);

const Tasks = mongoose.model("Tasks", TaskSchema);

module.exports = Tasks;
