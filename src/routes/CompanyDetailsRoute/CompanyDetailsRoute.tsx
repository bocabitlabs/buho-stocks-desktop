// import React, { useContext, useEffect } from "react";

// import { Button, Layout, PageHeader } from "antd";

// import { Link, useHistory, useParams } from "react-router-dom";
// import CompanyListTable from "../components/CompanyListTable/CompanyListTable";
// import { useCompaniesContext } from "../hooks/companies";
// import { CompaniesContext } from "../contexts/companies";
// import { PortfoliosContext } from "../contexts/portfolios";

// export interface IPortfolioRouteParams {
//   id: string;
//   companyId: string;
// }

// const CompanyDetailsRoute = () => {
//   const history = useHistory();
//   const { portfolio, fetchPortfolio } = useContext(PortfoliosContext);

//   const companiesContext = useCompaniesContext();

//   const { id, companyId } = useParams<IPortfolioRouteParams>();

//   useEffect(() => {
//     fetchPortfolio(id);
//   }, [id, fetchPortfolio]);

//   const routes = [
//     {
//       path: "/home",
//       name: "home",
//       breadcrumbName: "Home"
//     },
//     {
//       path: `/portfolios/${id}`,
//       name: "portfolio-details",
//       breadcrumbName:
//       portfolio.length > 0 && portfolio[0] ? portfolio[0].name : ""
//     },
//     {
//       path: `/portfolios/${id}/company/${companyId}`,
//       name: "company-details",
//       breadcrumbName:
//       portfolio.length > 0 && portfolio[0] ? portfolio[0].name : ""
//     }
//   ];
//   function itemRender(route: any) {
//     return <Link to={route.path}>{route.breadcrumbName}</Link>;
//   }
//   return (
//     <>
//       {portfolio.length > 0 && (
//         <>
//           <PageHeader
//             title={`${portfolio[0].name}`}
//             breadcrumb={{
//               routes,
//               itemRender
//             }}
//             subTitle="This is a subtitle"
//             extra={[
//               <Button
//                 onClick={() => {
//                   history.push(`/portfolios/${portfolio[0].id}/add-company`);
//                 }}
//               >
//                 + Company
//               </Button>
//             ]}
//           />
//           <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
//             <CompaniesContext.Provider value={companiesContext}>
//               <CompanyListTable />
//             </CompaniesContext.Provider>
//           </Layout>
//         </>
//       )}
//     </>
//   );
// };

// export default CompanyDetailsRoute;
import { PageHeader, Button, Layout, Typography, Tabs, Tag } from "antd";
import React, { ReactElement, useContext, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import ShareListTable from "../../components/ShareListTable/ShareListTable";
import { CompaniesContext } from "../../contexts/companies";
import { SharesContext } from "../../contexts/shares";
import { useSharesContext } from "../../hooks/shares";

export interface Props {
  portfolioId: string;
  companyId: string;
}

export default function CompanyDetailsRoute(): ReactElement {
  const history = useHistory();
  const { portfolioId, companyId } = useParams<Props>();
  const { company, fetchCompany } = useContext(CompaniesContext);
  const sharesContext = useSharesContext();

  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home"
    },
    {
      path: `/portfolios/${portfolioId}`,
      name: "portfolio-details",
      breadcrumbName: company ? company.portfolioName : ""
    },
    {
      path: `/portfolios/${portfolioId}/companies/${companyId}`,
      name: "company-details",
      breadcrumbName: company ? company.name : ""
    }
  ];

  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }

  useEffect(() => {
    fetchCompany(companyId);
  }, [companyId, fetchCompany]);
  console.log(company);
  return (
    <>
      {company && (
        <>
          <PageHeader
            title={`${company.name}`}
            onBack={() => history.push(`/portfolios/${portfolioId}`)}
            tags={
              <Tag color="blue">
                <a href={`${company.url}`}>Link</a>
              </Tag>
            }
            breadcrumb={{
              routes,
              itemRender
            }}
            extra={[
              <Button
                onClick={() => {
                  history.push(
                    `/portfolios/${portfolioId}/companies/${company.id}/add-shares`
                  );
                }}
              >
                + Shares
              </Button>
            ]}
          />
          <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
            <Typography.Text type="secondary">
              {company?.description}
            </Typography.Text>
            <Tabs
              defaultActiveKey="1"
              onChange={() => {
                console.log("Tab click");
              }}
            >
              <Tabs.TabPane tab="Shares" key="1">
                <SharesContext.Provider value={sharesContext}>
                  <ShareListTable companyId={companyId} />
                </SharesContext.Provider>
              </Tabs.TabPane>
            </Tabs>
          </Layout>
        </>
      )}
    </>
  );
}
