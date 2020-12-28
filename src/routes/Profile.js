import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  Checkbox,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from "antd";

function Profile() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Update your Profile</h1>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        size="default"
      >
        <Form.Item label="First Name">
          <Input />
        </Form.Item>
        <Form.Item label="Last Name">
          <Input />
        </Form.Item>
        <Form.Item label="Gender">
          <Select>
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Country">
          <Select>
            <Select.Option value="Malaysia">Malaysia</Select.Option>
            <Select.Option value="USA">USA</Select.Option>
            <Select.Option value="Yemen">Yemen</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Notes">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Birth Date">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Salary">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Smoker">
          <Switch />
        </Form.Item>
        <Form.Item name="checkbox-group" label="Skills">
          <Checkbox.Group>
            <Checkbox value="Javascript">Javascript</Checkbox>
            <Checkbox value="React">React</Checkbox>
            <Checkbox value="Java">Java</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item
          {...{
            wrapperCol: {
              offset: 4,
              span: 16,
            },
          }}
        >
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Profile;
