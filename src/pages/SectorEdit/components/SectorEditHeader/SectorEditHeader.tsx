import { HomeOutlined } from "@ant-design/icons";
import { PageHeader } from "antd";
import { SectorsContext } from "contexts/sectors";
import React, { ReactElement, useContext, useEffect } from "react";
import { breadcrumbItemRender } from "utils/headers-utils";

interface Props {
  sectorId: string;
}

export default function SectorEditHeader({
  sectorId
}: Props) : ReactElement | null {
  console.info("Sectors Edit", sectorId)
  const { sector, getById: getSectorById } = useContext(
    SectorsContext
  );

  useEffect(() => {
    console.debug("Get sector", sectorId)
    getSectorById(sectorId);
  }, [getSectorById, sectorId]);

  if (!sector) {
    return null;
  }

  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home",
      icon: <HomeOutlined />,
      iconOnly: true
    },
    {
      path: "/sectors",
      name: "sectors",
      breadcrumbName: "Sectors"
    },
    {
      path: `/sectors/${sectorId}/edit`,
      name: "edit",
      breadcrumbName: "Edit"
    }
  ];

  return (
    <PageHeader
      className="site-page-header"
      title="Edit"
      breadcrumb={{
        routes,
        itemRender: breadcrumbItemRender
      }}
    />
  );
}
