import React from "react";
import { Layout, Breadcrumb } from "antd";
import { Dictionary } from "react-redux-firebase";
import { Link } from "react-router-dom";

interface RouteContentProps {
  breadcrumbs: Array<Dictionary<string>>;
}

const RouteContent = ({
  children,
  breadcrumbs
}: React.PropsWithChildren<RouteContentProps>) => (
  <Layout style={{ padding: "0 24px 24px" }}>
    <Breadcrumb style={{ margin: "16px 0" }}>
      {breadcrumbs.map((route, index) => (
        <Breadcrumb.Item key={`breadcrumb-${index}`}>
          <Link to={route.path}>{route.text}</Link>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
    {children}
  </Layout>
);

export default RouteContent;
