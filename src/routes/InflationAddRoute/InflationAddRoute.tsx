import { Layout } from 'antd'
import React, { ReactElement } from 'react'
import InflationAddForm from '../../components/InflationAddForm/InflationAddForm'
import InflationAddRouteHeader from './InflationAddRouteHeader'


export default function InflationAddRoute(): ReactElement {
  return (
    <>
    <InflationAddRouteHeader />
    <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
      <InflationAddForm />
    </Layout>
  </>
  )
}
