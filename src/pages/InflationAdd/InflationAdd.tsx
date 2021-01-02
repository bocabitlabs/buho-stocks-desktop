import { Layout } from 'antd'
import React, { ReactElement } from 'react'
import InflationAddForm from './components/InflationAddForm/InflationAddForm'
import InflationAddHeader from './components/InflationAddHeader/InflationAddHeader'


export default function InflationAddRoute(): ReactElement {
  return (
    <>
    <InflationAddHeader />
    <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
      <InflationAddForm />
    </Layout>
  </>
  )
}
