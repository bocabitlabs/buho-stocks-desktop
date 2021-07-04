import { HomeOutlined } from "@ant-design/icons";
import { PageHeader } from "antd";
import { SectorsContext } from "contexts/sectors";
import React, { ReactElement, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { breadcrumbItemRender } from "utils/headers-utils";

interface Props {
  sectorId: string;
}

export default function SectorEditHeader({
  sectorId
}: Props) : ReactElement | null {
  const { t } = useTranslation();

  const { sector, getById: getSectorById } = useContext(
    SectorsContext
  );

  useEffect(() => {
    getSectorById(sectorId);
  }, [getSectorById, sectorId]);

  if (!sector) {
    return null;
  }

  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: t("Home"),
      icon: <HomeOutlined />,
      iconOnly: true
    },
    {
      path: "/sectors",
      name: "sectors",
      breadcrumbName: t("Sectors")
    },
    {
      path: `/sectors/${sectorId}/edit`,
      name: "edit",
      breadcrumbName: t("Edit")
    }
  ];

  return (
    <PageHeader
      className="site-page-header"
      title={t("Edit sector")}
      breadcrumb={{
        routes,
        itemRender: breadcrumbItemRender
      }}
    />
  );
}
