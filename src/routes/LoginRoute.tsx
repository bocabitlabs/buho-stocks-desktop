import React, { useCallback } from "react";
import { withRouter, Redirect, RouteComponentProps } from "react-router";
import { Form, Input, Button, Row, Col } from "antd";
import { useFirebase } from "react-redux-firebase";
import { getFirebaseAuth } from "../selectors/profile";
import { useSelector } from "react-redux";

const Login = ({ history }: RouteComponentProps) => {
  const [form] = Form.useForm();
  const firebase = useFirebase();
  const { uid }: any = useSelector(getFirebaseAuth);

  const handleLogin = useCallback(
    async (values) => {
      console.log("Call handleLogin");
      console.log(values);
      try {
        const result = firebase
          .auth()
          .signInWithEmailAndPassword(values.email, values.password);

        console.log("Login successful");
        console.log(result);

        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history, firebase]
  );

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  if (uid) {
    return <Redirect to="/" />;
  }

  return (
    <Row>
      <Col span={12} offset={6}>
        <h1>Log in</h1>
        <Form
          form={form}
          name="basic"
          onFinish={handleLogin}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="email"
            label="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default withRouter(Login);
