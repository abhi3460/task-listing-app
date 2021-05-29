import React from "react";
import { Button, Table, Popconfirm } from "antd";

import useTimer from "../../services/useTimer";
import { formatTime } from "../../utils";
import SubTaskForm from "../SubTasks/SubTaskForm";
import SubTaskTable from "../SubTasks/SubTaskTable";

function TaskTable(props) {
  const {
    columns,
    taskData,
    isTableLoading,
    setTableLoading,
    completeOrDeleteAll,
    modifyTask,
  } = props;

  const { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset } = useTimer(0);

  return (
    <div className="table-wrapper">
      <Table
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={taskData}
        loading={isTableLoading}
        style={{ width: "100%" }}
        rowClassName={(record, index) =>
          record.isCompleted
            ? "completed-task-bg"
            : record.isDeleted
            ? "deleted-task-bg"
            : ""
        }
        expandable={{
          expandedRowRender: (record) => (
            <>
              <div>
                <div className="stopwatch-card">
                  <h3>Timer</h3>
                  <p>{formatTime(timer)}</p>
                  <div className="buttons">
                    {!isActive && !isPaused ? (
                      <button onClick={handleStart}>Start</button>
                    ) : isPaused ? (
                      <button onClick={handlePause}>Pause</button>
                    ) : (
                      <button onClick={handleResume}>Resume</button>
                    )}
                    <button onClick={handleReset} disabled={!isActive}>
                      Reset
                    </button>
                  </div>
                </div>
              </div>
              {record.subTasks ? (
                <>
                  <h3>Add Sub Task</h3>
                  <SubTaskForm
                    taskData={taskData}
                    setTableLoading={setTableLoading}
                    record={record}
                    modifyTask={modifyTask}
                  />
                  <SubTaskTable
                    taskData={taskData}
                    subTasks={record.subTasks}
                  />
                </>
              ) : (
                <p>No Subtasks Available</p>
              )}
            </>
          ),
        }}
        footer={() => (
          <>
            {taskData.length !== 0 && (
              <div className="footer-btn text-center">
                <Button
                  type="primary"
                  onClick={(e) => completeOrDeleteAll("complete")}
                >
                  Mark all as complete
                </Button>
                <Popconfirm
                  title="Are you sure to delete all these tasks?"
                  onConfirm={(e) => completeOrDeleteAll("delete")}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="ghost">Delete All</Button>
                </Popconfirm>
              </div>
            )}
          </>
        )}
      />
    </div>
  );
}

export default TaskTable;
