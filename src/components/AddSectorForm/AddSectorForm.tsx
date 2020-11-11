import React, { ReactElement, useCallback, useState } from "react";
import { Button, Form, Input } from "antd";
import { CirclePicker } from "react-color";
import SectorService from "../../services/sector-service";


/**
 * Add a new Currency
 */
function AddSectorForm(): ReactElement {
  const [form] = Form.useForm();

  const [color, setColor] = useState("#607d8b");

  const handleAdd = useCallback(async (values) => {
    const { name, color } = values;
    const sector = {
      name,
      color
    };
    const result = new SectorService().addSector(sector);
  }, []);

  const handleColorChange = (color: any, event: any) => {
    console.log(color.hex);
    setColor(color.hex);
  };

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
      <Form.Item label="Color">
        <CirclePicker onChange={handleColorChange} />
        <Input type="hidden" value={color} />
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
