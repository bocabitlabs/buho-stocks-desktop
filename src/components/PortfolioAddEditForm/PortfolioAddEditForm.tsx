import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Button, Form, Input, message, Select } from "antd";
import { useHistory } from "react-router-dom";

import { CurrenciesContext } from "contexts/currencies";
import { ICurrency } from "types/currency";
import { PortfoliosContext } from "contexts/portfolios";
import ColorSelector from "components/ColorSelector/ColorSelector";
import { useTranslation } from "react-i18next";

interface AddEditFormProps {
  portfolioId?: string;
}

function PortfolioAddEditForm({
  portfolioId
}: AddEditFormProps): ReactElement | null {
  const [form] = Form.useForm();
  const history = useHistory();
  const { t } = useTranslation();

  const { currencies } = useContext(CurrenciesContext);
  const {
    portfolio,
    getAll: getAllPortfolios,
    create: addPortfolio,
    getById: getPortfolioById,
    update: updatePortfolio
  } = useContext(PortfoliosContext);

  const [color, setColor] = useState("#607d8b");
  const key = "updatable";

  useEffect(() => {
    if (portfolioId) {
      const newPortfolio = getPortfolioById(portfolioId);
      if (newPortfolio) {
        setColor(newPortfolio.color);
      }
    }
  }, [portfolioId, getPortfolioById]);

  const handleAdd = (values: any) => {
    message.loading({ content: t("Adding portfolio..."), key });

    const { name, description, currencyId } = values;
    const newPortfolio = {
      name,
      description,
      currencyId,
      color
    };

    let changes = null;
    if (portfolioId) {
      changes = updatePortfolio(portfolioId, newPortfolio);
    } else {
      changes = addPortfolio(newPortfolio);
    }

    if (changes.changes) {
      getAllPortfolios();
      if (!currencyId) {
        message.success({ content: t("Portfolio has been added"), key });
      } else {
        message.success({ content: t("Portfolio has been updated"), key });
      }
      history.push("/home");
    } else {
      message.success({ content: t("Unable to add the portfolio"), key });
    }
  };

  const handleColorChange = (color: any, event: any) => {
    setColor(color.hex);
  };

  if (portfolioId && !portfolio) {
    return null;
  }

  return (
    <Form
      form={form}
      name="basic"
      layout="vertical"
      onFinish={handleAdd}
      initialValues={{
        name: portfolio?.name,
        description: portfolio?.description,
        currencyId: portfolio?.currencyId
      }}
    >
      <Form.Item
        name="name"
        label={t("Name")}
        rules={[
          { required: true, message: t("Please input the name of the portfolio") }
        ]}
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item
        label={
          <div>
            {t("Color")}:{" "}
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
      <Form.Item
        name="description"
        label={t("Description")}
        rules={[
          { required: true, message: t("Please input the portfolio description") }
        ]}
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item
        name="currencyId"
        label={t("Currency")}
        rules={[{ required: true }]}
      >
        <Select
          placeholder={t("Select a currency")}
          allowClear
        >
          {currencies &&
            currencies.map((currency: ICurrency, index: number) => (
              <Select.Option
                value={currency.id}
                key={`currency-${currency.id}-${index}`}
              >
                {currency.name} ({currency.abbreviation})
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {portfolioId ? t("Edit portfolio") : t("Add portfolio")}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default PortfolioAddEditForm;
