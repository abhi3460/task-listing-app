import React, { useEffect, useState } from "react";
import { Layout, Button, Popover, notification, Tooltip } from "antd";
import { BookOutlined, DashOutlined } from "@ant-design/icons";
import moment from "moment";

import {
  getTaskList,
  addTask,
  updateTask,
  ModifyMultiple,
  removeTask,
} from "../services/api";
import "./App.css";

import TaskForm from "./Tasks/TaskForm";
import TaskTable from "./Tasks/TaskTable";

const { Header, Content, Footer } = Layout;

function App() {
  const [taskData, setTasks] = useState([]);
  const [isTableLoading, setTableLoading] = useState(false);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
      key: "name",
    },
    {
      title: "Date & Time",
      dataIndex: "datetime",
      align: "center",
      key: "datetime",
    },
    {
      title: "Task Name",
      dataIndex: "taskname",
      key: "taskname",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <Popover
          content={
            <div className="action-btns">
              <Button
                type="ghost"
                disabled={record.isCompleted}
                onClick={(e) => {
                  modifyTask(record, "complete");
                }}
              >
                Complete
              </Button>
              <Button type="ghost" onClick={(e) => {}}>
                Edit
              </Button>
              <Button
                type="ghost"
                onClick={(e) => {
                  setTableLoading(true);
                  let obj = {
                    datetime: record.datetime,
                    name: record.name,
                    subTasks: record.subTasks,
                    taskname: record.taskname,
                  };
                  addTask(obj)
                    .then((res) => {
                      setTasks(res.tasks);
                      setTableLoading(false);
                      openNotificationWithIcon("success", {
                        title: "Task Cloned!",
                        desc: "",
                      });
                    })
                    .catch((error) => {
                      setTableLoading(false);
                      openNotificationWithIcon("error", {
                        title: error.message,
                        desc: "",
                      });
                    });
                }}
              >
                Clone
              </Button>
              {!record.isCompleted ? (
                <Button
                  type="ghost"
                  disabled={record.isDeleted}
                  onClick={(e) => {
                    if (record.subTasks.length === 0) {
                      modifyTask(record, "delete");
                    } else {
                      openNotificationWithIcon("error", {
                        title:
                          "Sorry, you can not remove primary task if there are sub tasks available.",
                        desc: "",
                      });
                    }
                  }}
                >
                  Delete
                </Button>
              ) : (
                <Tooltip
                  placement="top"
                  title="This will remove task permanently!"
                >
                  <Button
                    type="ghost"
                    danger
                    disabled={record.isDeleted}
                    onClick={(e) => {
                      if (record.subTasks.length === 0) {
                        removeTask(record._id)
                          .then((data) => {
                            openNotificationWithIcon("error", {
                              title: "Task Removed!",
                              desc: "",
                            });
                            setTasks(Array.isArray(data) ? data : [data]);
                          })
                          .catch((error) => {
                            openNotificationWithIcon("error", {
                              title: error.message,
                              desc: "",
                            });
                          });
                      } else {
                        openNotificationWithIcon("error", {
                          title:
                            "Sorry, you can not remove primary task if there are sub tasks available.",
                          desc: "",
                        });
                      }
                    }}
                  >
                    Delete
                  </Button>
                </Tooltip>
              )}
            </div>
          }
        >
          <Button>
            <DashOutlined />
          </Button>
        </Popover>
      ),
    },
  ];

  useEffect(() => {
    setTableLoading(true);
    getTaskList()
      .then((data) => {
        openNotificationWithIcon("success", { title: data.message, desc: "" });
        setTasks(data.tasks);
        setTableLoading(false);
      })
      .catch((error) => {
        openNotificationWithIcon("error", { title: error.message, desc: "" });
        setTableLoading(false);
      });
  }, []);

  // Notification accessor
  const openNotificationWithIcon = (type, data) => {
    let obj = {
      message: data.title,
    };
    if (data.desc) {
      obj.desc = data.desc;
    }
    notification[type](obj);
  };

  // Form Submit
  const onFinish = (fieldsValue) => {
    setTableLoading(true);
    const values = {
      ...fieldsValue,
      datetime: fieldsValue["datetime"].format("YYYY-MM-DD HH:mm:ss"),
    };
    addTask(values)
      .then((res) => {
        setTasks(res.tasks);
        setTableLoading(false);
        openNotificationWithIcon("success", { title: res.message, desc: "" });
      })
      .catch((error) => {
        setTableLoading(false);
        openNotificationWithIcon("error", { title: error.message, desc: "" });
      });
  };

  // DateInput disable dates before today
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  };

  // This functionality is just for my convenience that can remove all tasks(with their sub tasks)
  // and to mark complete to all tasks.
  const completeOrDeleteAll = (flag) => {
    ModifyMultiple(flag)
      .then((data) => {
        setTasks(data.tasks);
        setTableLoading(false);
        openNotificationWithIcon("info", { title: data.message, desc: "" });
      })
      .catch((error) => {
        setTableLoading(false);
        openNotificationWithIcon("error", { title: error.message, desc: "" });
      });
  };

  // Update Task function
  const modifyTask = (data, flag) => {
    if (flag === "complete") {
      data.isCompleted = true;
    } else if (flag === "delete") {
      data.isDeleted = true;
      if (data.subTasks.length === 0) {
        updateTaskDetails(data);
      } else {
        openNotificationWithIcon("error", {
          title:
            "Sorry, you can not remove primary task if there are sub tasks available.",
          desc: "",
        });
      }
    } else {
      updateTaskDetails(data);
    }
  };

  const updateTaskDetails = (data) => {
    updateTask({ taskId: data._id, updateDetails: data })
    .then((res) => {
      let tempData = [...taskData];
      let index = tempData.findIndex((task) => task._id === data._id);
      tempData[index] = data;
      setTasks(tempData);
      setTableLoading(false);
      openNotificationWithIcon("success", { title: res.message, desc: "" });
    })
    .catch((error) => {
      setTableLoading(false);
      openNotificationWithIcon("error", { title: error.message, desc: "" });
    });
  }

  return (
    <div className="App">
      <Layout className="layout">
        <Header>
          <h1 className="nav-title">
            Task List <BookOutlined />
          </h1>
        </Header>
        <Content className="content-wrapper">
          <div className="site-layout-content">
            <TaskForm onFinish={onFinish} disabledDate={disabledDate} />
            <TaskTable
              columns={columns}
              taskData={taskData}
              isTableLoading={isTableLoading}
              setTableLoading={setTableLoading}
              completeOrDeleteAll={completeOrDeleteAll}
              modifyTask={modifyTask}
            />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Task List App ©2021 Created by Abhishek Vasvelia
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
