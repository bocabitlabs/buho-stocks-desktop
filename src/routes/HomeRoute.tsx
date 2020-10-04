import React, { useState } from "react";
import sendAsync from "../message-control/renderer";

// import {
//   ExampleComponent,
//   ExampleComponentWithType
// } from "../components/ExampleComponent";
// import AddCurrencyForm from "../components/AddCurrencyForm/AddCurrencyForm";
// import CurrencyList from "../components/CurrencyList";
// import { useSelector } from "react-redux";
// import { getFirebaseAuth } from "../selectors/profile";
// import LogoutButton from "../components/LogoutButton";
import { Menu, Layout, Breadcrumb, PageHeader } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined
} from "@ant-design/icons";
// import AddCompanyForm from "../components/AddCompanyForm/AddCompanyForm";
// import CompanyList from "../components/CompanyList/CompanyList";

const Home = () => {
  const [message, setMessage] = useState("SELECT * FROM currencies");
  const [response, setResponse] = useState();

  function send(sql: any) {
    sendAsync(sql).then((result: React.SetStateAction<undefined>) =>
      setResponse(result)
    );
  }

  return (
    <Layout>
      <div>Hello world</div>
      <article>
        <p>
          Say <i>ping</i> to the main process.
        </p>
        <input
          type="text"
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
        />
        <button type="button" onClick={() => send(message)}>
          Send
        </button>
        <br />
        <p>Main process responses:</p>
        <br />
        <pre>
          {JSON.stringify(response)}
          {/* {(response && (response || []).join("\n")) ||
            "the main process seems quiet!"} */}
        </pre>
      </article>
      {/* <Layout.Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Layout.Header>
      <Layout>
        <Layout.Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
              <Menu.Item key="1">option1</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              icon={<NotificationOutlined />}
              title="subnav 3"
            >
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Layout.Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout.Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            <h1>Home</h1>
            <div>
              <PageHeader
                className="site-page-header"
                title="Currencies"
              />
              <ExampleComponent who={"me"} />
              <ExampleComponentWithType who={"me2"} />
              <AddCurrencyForm />
              <CurrencyList uid={uid} />
            </div>
            <div>
              <PageHeader
                className="site-page-header"
                title="Companies"
              />
              <AddCompanyForm />
              <CompanyList uid={uid} />
            </div>
            <LogoutButton />
          </Layout.Content>
        </Layout>
      </Layout> */}
    </Layout>
  );
};

export default Home;
