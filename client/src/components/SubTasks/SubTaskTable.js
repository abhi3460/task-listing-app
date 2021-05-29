import React, { useEffect } from "react";
import { Table } from "antd";

function SubTaskTable(props) {
  const { taskData, subTasks } = props;
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
  ];

  useEffect(() => {}, [taskData]);

  return (
    <div className="table-wrapper">
      <Table
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={subTasks}
        style={{ width: "100%", marginTop: "20px" }}
        rowClassName={(record, index) =>
          record.isCompleted
            ? "completed-task-bg"
            : record.isDeleted
            ? "deleted-task-bg"
            : ""
        }
      />
    </div>
  );
}

export default SubTaskTable;
