import React, { useEffect } from "react";
import moment from "moment";
import { Form, Input, DatePicker, Button } from "antd";

const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};

function SubTaskForm(props) {
  const {
    taskData,
    setTableLoading,
    record,
    modifyTask
  } = props;

  useEffect(() => {}, [taskData]);

  // DateInput disable dates before today
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  };

  const onFinish = (fieldsValue) => {
    setTableLoading(true);
    const values = { ...record };
    values.subTasks.push({
      ...fieldsValue,
      datetime: fieldsValue["datetime"].format("YYYY-MM-DD HH:mm:ss"),
    });
    modifyTask(values, '');
    window.location.reload();
  };

  return (
    <Form
      layout="inline"
      name="subtaskform"
      className="ant-advanced-search-form"
      initialValues={{}}
      onFinish={onFinish}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please enter name!",
          },
        ]}
      >
        <Input placeholder="Enter name" />
      </Form.Item>

      <Form.Item
        label="Date & Time"
        name="datetime"
        rules={[
          {
            type: "object",
            required: true,
            message: "Please select date and time!",
          },
        ]}
      >
        <DatePicker
          showTime
          placeholder="Select date and time"
          format="YYYY-MM-DD HH:mm:ss"
          disabledDate={disabledDate}
        />
      </Form.Item>

      <Form.Item
        label="Task Name"
        name="taskname"
        rules={[
          {
            required: true,
            message: "Please enter task name!",
          },
        ]}
      >
        <Input placeholder="Enter task name" />
      </Form.Item>

      <Form.Item {...tailLayout} shouldUpdate>
        <Button type="primary" htmlType="submit" className="subTaskSubmit">
          Add Sub Task
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SubTaskForm;
