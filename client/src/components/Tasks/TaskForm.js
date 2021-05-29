import React from "react";
import { Form, Input, DatePicker, Button } from "antd";

const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};

function TaskForm(props) {
  const { onFinish, disabledDate } = props;
  return (
    <Form
      layout="inline"
      name="taskform"
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
        <Button type="primary" htmlType="submit">
          Add Task
        </Button>
      </Form.Item>
    </Form>
  );
}

export default TaskForm;
