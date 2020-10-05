import React, { useCallback, useState } from "react";
import { Redirect, useHistory } from "react-router";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Spin,
  Card,
  Layout
} from "antd";
import { useFirebase } from "react-redux-firebase";
import { getFirebaseAuth } from "../../selectors/profile";
import { useSelector } from "react-redux";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const LoginRoute = () => {
  const [form] = Form.useForm();
  const firebase = useFirebase();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const { uid, isLoaded }: any = useSelector(getFirebaseAuth);

  /**
   * Login the user on Firebase
   */
  const handleLogin = useCallback(
    async (values) => {
      setIsLoading(true);
      try {
        firebase
          .auth()
          .signInWithEmailAndPassword(values.email, values.password);

        history.push("/");
      } catch (error) {
        alert(error);
        setIsLoading(false);
      }
    },
    [history, firebase]
  );

  if (!isLoaded || isLoading) {
    return (
      <Row data-testid="login-spinner" justify="space-around" align="middle">
        <Col>
          <Spin />
        </Col>
      </Row>
    );
  }

  if (uid) {
    return (
      <div data-testid="redirect-id">
        <Redirect to="/home" />
      </div>
    );
  }

  return (
    <Layout style={{ height: "100vh" }}>
      <Row justify="space-around" align="middle">
        <Col span="6">
          <Card title="Buho Stocks - Login" style={{ margin: "1em" }}>
            <p>Sign in using your email and password.</p>
            <Form
              form={form}
              name="normal_login"
              className="login-form"
              onFinish={handleLogin}
              layout="vertical"
            >
              <Form.Item
                name="email"
                label="Email:"
                rules={[
                  { required: true, message: "Please, input your email" }
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  type="email"
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password:"
                rules={[
                  { required: true, message: "Please input your password!" }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
                <p>
                  Or{" "}
                  <Link to="/register" title="Register">
                    Register now
                  </Link>
                </p>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default LoginRoute;
