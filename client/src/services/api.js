import axios from "axios";

const BASE_URL = "http://localhost:3001/v1/tasks";

// Get Task List
export const getTaskList = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(`${BASE_URL}/`)
        .then((res) => {
          resolve({
            message: "Tasks are fetched!",
            tasks: res.data,
          });
        })
        .catch((error) => {
          /* eslint-disable no-throw-literal */
          throw {
            message: "There seems to be a problem on fetching tasks!",
            error,
          };
        });
    } catch (error) {
      reject(error);
    }
  });
};

// Add Task to list
export const addTask = (taskDetails) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(`${BASE_URL}/add-task`, taskDetails)
        .then((res) => {
          resolve({
            message: res.data.message,
            tasks: res.data.tasks
          });
        })
        .catch((error) => {
          /* eslint-disable no-throw-literal */
          throw {
            message: "There seems to be a problem on fetching tasks!",
            error,
          };
        });
    } catch (error) {
      reject(error);
    }
  });
};

// Update Task By ID
export const updateTask = ({ taskId, updateDetails }) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .patch(`${BASE_URL}/${taskId}/update-task`, {taskDetails: updateDetails})
        .then((res) => {
          resolve({
            message: "Task Updated!",
            task: res.data,
          });
        })
        .catch((error) => {
          /* eslint-disable no-throw-literal */
          throw {
            message: "There seems to be a problem on updating this task!",
            error,
          };
        });
    } catch (error) {
      reject(error);
    }
  });
};

// Remove Task By ID
export const removeTask = (taskId) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .delete(`${BASE_URL}/${taskId}/remove-task`)
        .then((res) => {
          console.log(res.data);
          resolve(res.data);
        })
        .catch((error) => {
          /* eslint-disable no-throw-literal */
          throw {
            message: "There seems to be a problem on updating this task!",
            error,
          };
        });
    } catch (error) {
      reject(error);
    }
  });
};

// Complete or Delete All Tasks
export const ModifyMultiple = (flag) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .patch(`${BASE_URL}/modify-multiple`, { flag })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          /* eslint-disable no-throw-literal */
          throw {
            message: "There seems to be a problem on updating this task!",
            error,
          };
        });
    } catch (error) {
      reject(error);
    }
  });
};