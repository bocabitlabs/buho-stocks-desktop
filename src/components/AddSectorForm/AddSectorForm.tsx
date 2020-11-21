import React, { ReactElement } from "react";
import { Button, Form, Input, message } from "antd";
import { CirclePicker } from "react-color";
import SectorService from "../../services/sector-service";
import { useHistory } from "react-router-dom";

/**
 * Add a new Currency
 */
function AddSectorForm(): ReactElement {
  const [form] = Form.useForm();
  const history = useHistory();
  const key = "updatable";
  let color = "#607d8b";

  const handleAdd = (values: any) => {
    message.loading({ content: "Adding sector...", key });

    const { name } = values;
    const sector = {
      name,
      color
    };
    const added = new SectorService().addSector(sector);
    if (added === "OK") {
      history.push({
        pathname: "/sectors",
        state: { message: { type: "success", text: "Sector has been added" } }
      });
    } else {
      setTimeout(() => {
        message.error({
          content: "Unable to add the sector",
          key,
          duration: 2
        });
      }, 1000);
    }
  };

  const handleColorChange = (color: any, event: any) => {
    console.log(color.hex);
    color = color.hex;
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
