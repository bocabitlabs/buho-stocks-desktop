import React, { ReactElement } from 'react'

import { Button, PageHeader } from "antd";
import { useHistory } from "react-router-dom";
import { HomeOutlined } from '@ant-design/icons';
import { breadcrumbItemRender } from 'utils/headers-utils';

export default function InflationListHeader(): ReactElement {
  const history = useHistory();

  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home",
      icon: <HomeOutlined />,
      iconOnly: true
    },
    {
      path: "/inflations",
      name: "inflation",
      breadcrumbName: "Inflations"
    }
  ];

  return (
    <PageHeader
      className="site-page-header"
      title="Inflations"
      breadcrumb={{
        routes,
        itemRender: breadcrumbItemRender
      }}
      extra={[
        <Button
          onClick={() => {
            history.push("/add/inflation");
          }}
        >
          Add inflation
        </Button>
      ]}
    />
  );
}

