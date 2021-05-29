const mongoose = require("mongoose");

const { Schema } = mongoose;

const SubTaskSchema = Schema(
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
  },
  {
    timestamps: true,
  }
);

const SubTasks = mongoose.model("SubTasks", SubTaskSchema);

module.exports = SubTasks;
