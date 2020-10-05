import React, { useState } from "react";
import sendAsync from "../message-control/renderer";

import { Layout, PageHeader } from "antd";

import RouteContent from "./RouteContent";
import { ExampleComponent, ExampleComponentWithType } from "../components/ExampleComponent";
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
      <RouteContent>
      <Layout.Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280
        }}
      >
              {/* <div>Hello world</div>
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
        </pre>
      </article> */}
        <h1>Home</h1>
        <div>
          <PageHeader className="site-page-header" title="Currencies" />
          <ExampleComponent who={"me"} />
          <ExampleComponentWithType who={"me2"} />
          {/* <AddCurrencyForm />
          <CurrencyList uid={uid} /> */}
        </div>
        <div>
          <PageHeader className="site-page-header" title="Companies" />
          {/* <AddCompanyForm />
          <CompanyList uid={uid} /> */}
        </div>
      </Layout.Content>
    </RouteContent>
  );
};

export default Home;
