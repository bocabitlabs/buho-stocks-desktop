import React from "react";

import { Button, Layout, PageHeader } from "antd";

import { Link, useHistory } from "react-router-dom";
import SectorListTable from "../../components/SectorListTable/SectorListTable";

const SectorListRoute = () => {
  const history = useHistory();

  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home"
    },
    {
      path: "/sectors",
      name: "sectors",
      breadcrumbName: "Sectors"
    }
  ];
  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }
  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Sectors"
        breadcrumb={{
          routes,
          itemRender
        }}
        subTitle="This is a subtitle"
        extra={[
          <Button
            onClick={() => {
              history.push("/add/sector");
            }}
          >
            Add Sector
          </Button>
        ]}
      />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: '#fff' }}>
        <SectorListTable />
      </Layout>
    </>
  );
};

export default SectorListRoute;
