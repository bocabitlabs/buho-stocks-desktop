import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Button, Form, Input, message, Select, Switch } from "antd";
import { useHistory } from "react-router-dom";

import { SectorsContext } from "contexts/sectors";
import ColorSelector from "components/ColorSelector/ColorSelector";
import { ISector } from "types/sector";

interface AddEditFormProps {
  sectorId?: string;
}

function SectorAddEditForm({
  sectorId
}: AddEditFormProps): ReactElement | null {
  const [form] = Form.useForm();
  const history = useHistory();
  const [color, setColor] = useState("#607d8b");
  const [sectors, setSectors] = useState<ISector[]>([]);


  const key = "updatable";

  const {
    sector,
    create: addSector,
    fetchSectors,
    getById: getSectorById,
    update: updateSector
  } = useContext(SectorsContext);

  useEffect(() => {
    const sectors = fetchSectors();
    setSectors(sectors);
    if (sectorId) {
      const newSector = getSectorById(sectorId);
      if (newSector) {
        setColor(newSector.color);
      }
    }
  }, [sectorId, getSectorById, fetchSectors]);

  const handleSubmit = (values: any) => {
    message.loading({ content: "Adding sector...", key });

    const { name, isSuperSector, superSectorId } = values;
    const newSector = {
      name,
      color,
      isSuperSector: isSuperSector? true: false,
      superSectorId
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
        name: sector?.name,
        isSuperSector: sector?.isSuperSector,
        superSectorId: sector?.superSectorId
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
      <Form.Item label="Is super sector" name="isSuperSector" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item name="superSectorId" label="Super sector">
        <Select
          placeholder="Select it's super sector"
          allowClear
        >
          {sectors &&
            sectors.filter((sec)=> sec.isSuperSector).map((sector: ISector, index: number) => (
              <Select.Option
                value={sector.id}
                key={`sector-${sector.id}-${index}`}
              >
                {sector.name}
              </Select.Option>
            ))}
        </Select>
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
