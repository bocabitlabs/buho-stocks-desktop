import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useHistory } from "react-router-dom";

import { SectorsContext } from "contexts/sectors";
import ColorSelector from "components/ColorSelector/ColorSelector";

interface AddEditFormProps {
  sectorId?: string;
}

function SectorAddEditForm({
  sectorId
}: AddEditFormProps): ReactElement | null {
  const [form] = Form.useForm();
  const history = useHistory();
  const [color, setColor] = useState("#607d8b");

  const key = "updatable";

  const {
    sector,
    addSector,
    fetchSectors,
    getById: getSectorById,
    update: updateSector
  } = useContext(SectorsContext);

  useEffect(() => {
    if (sectorId) {
      const newSector = getSectorById(sectorId);
      if (newSector) {
        setColor(newSector.color);
      }
    }
  }, [sectorId, getSectorById]);

  const handleSubmit = (values: any) => {
    message.loading({ content: "Adding sector...", key });

    const { name } = values;
    const newSector = {
      name,
      color
    };
    let changes = null;
    if (sectorId) {
      changes = updateSector(sectorId, newSector);
    } else {
      changes = addSector(newSector);
    }
    if (changes.changes) {
      fetchSectors();
      if (!sectorId) {
        message.success({ content: "Sector has been added", key });
      } else {
        message.success({ content: "Sector has been updated", key });
      }
      history.push("/sectors");
    } else {
      message.error({ content: "Unable to add the sector", key });
    }
  };

  const handleColorChange = (color: any, event: any) => {
    setColor(color.hex);
  };

  if (sectorId && !sector) {
    return null;
  }

  return (
    <Form
      form={form}
      name="basic"
      onFinish={handleSubmit}
      initialValues={{
        name: sector?.name
      }}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[
          { required: true, message: "Please input the name of the sector" }
        ]}
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item
        label={
          <div>
            Color:{" "}
            <svg
              width="35"
              height="35"
              viewBox="0 0 35 35"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="10"
                y="10"
                width="25"
                height="25"
                rx="5"
                ry="5"
                fill={color}
              />
            </svg>
          </div>
        }
      >
        <ColorSelector color={color} handleColorChange={handleColorChange} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {sectorId ? "Edit Sector" : "Add Sector"}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SectorAddEditForm;
