import React, { ReactElement } from "react";
import { Button, Form, Input, InputNumber, message } from "antd";
import { useHistory } from "react-router-dom";
import InflationService from "../../services/inflation-service";

/**
 * Add a new Currency
 */
function InflationAddForm(): ReactElement {
  const [form] = Form.useForm();
  const history = useHistory();
  const key = "updatable";

  const handleAdd = (values: any) => {
    message.loading({ content: "Adding inflation...", key });

    const { year, percentage } = values;
    const inflation = {
      year,
      percentage
    };
    const added = new InflationService().add(inflation);
    if (added.changes) {
      history.push("/inflations");
      message.success({ content: "Inflation has been added", key });
    } else {
      message.error({ content: "Unable to add the inflation", key });
    }
  };

  return (
    <Form form={form} name="basic" onFinish={handleAdd}>
      <Form.Item
        name="year"
        label="Year"
        rules={[
          { required: true, message: "Please input the year" }
        ]}
      >
        <InputNumber style={{ width: "20em" }} min={0} step={1} />
      </Form.Item>
      <Form.Item
        name="percentage"
        label="Percentage"
        rules={[
          { required: true, message: "Please input the percentage" }
        ]}
      >
        <InputNumber
          style={{ width: "20em" }}
          decimalSeparator="."
          formatter={(value) => `${value} %`}
          step={0.01}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Inflation
        </Button>
      </Form.Item>
    </Form>
  );
}

export default InflationAddForm;