import React from "react";

import { Layout, PageHeader } from "antd";

import { Link } from "react-router-dom";
import AddSectorForm from "../../components/AddSectorForm/AddSectorForm";

const AddSectorRoute = () => {
  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home"
    },
    {
      path: "/add-sector",
      name: "add-sector",
      breadcrumbName: "Add sector"
    }
  ];
  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }
  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Add a sector"
        breadcrumb={{
          routes,
          itemRender
        }}
        subTitle="This is a subtitle"
      />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: '#fff' }}>
        <AddSectorForm />
      </Layout>
    </>
  );
};

export default AddSectorRoute;