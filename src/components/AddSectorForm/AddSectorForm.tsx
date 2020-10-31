import React, { ReactElement, useCallback, useContext } from "react";
import { Button, Form, Input } from "antd";
import { SectorsContext } from "../../contexts/sectors";

/**
 * Add a new Currency
 */
function AddSectorForm(): ReactElement {
  const [form] = Form.useForm();

  const { addSector } = useContext(SectorsContext);


  const handleAdd = useCallback(async (values) => {
    const { name } = values;
    const sector = {
      name
    };
    addSector(sector,)
  }, [addSector]);

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
