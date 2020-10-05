import React from "react";
import { Layout } from "antd";

interface RouteContentProps {
}

const RouteContent = ({
  children,
}: React.PropsWithChildren<RouteContentProps>) => (
  <Layout style={{ padding: "0 24px 24px" }}>
    {children}
  </Layout>
);

export default RouteContent;