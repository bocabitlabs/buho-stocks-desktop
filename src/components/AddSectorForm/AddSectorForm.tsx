import React, { ReactElement, useCallback, useState } from "react";
import { Button, Form, Input } from "antd";
import { addSector } from "../../daos/sector-dao";

/**
 * Add a new Currency
 */
function AddSectorForm(): ReactElement {
  const [form] = Form.useForm();

  const [result, setResult] = useState('');

  const handleAdd = useCallback(async (values) => {
    const { name } = values;
    const sector = {
      name
    };
    addSector(sector, setResult)
  }, []);

  return (
    <Form form={form} name="basic" onFinish={handleAdd}>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          { required: true, message: "Please input the name of the sector" }
        ]}
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Sector
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddSectorForm;
