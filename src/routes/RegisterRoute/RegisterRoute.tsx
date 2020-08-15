import React, { useCallback } from "react";
import { useHistory } from "react-router";
import { useFirebase } from "react-redux-firebase";
import { Row, Col, Layout, Card, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const RegisterRoute = () => {
  const history = useHistory();
  const firebase = useFirebase();
  const [form] = Form.useForm();

  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history, firebase]
  );

  return (
    <Layout style={{ height: "100vh" }}>
      <Row justify="space-around" align="middle">
        <Col span="6">
          <Card title="Buho Stocks - Register" style={{ margin: "1em" }}>
            <p>Sign up using your email and password.</p>
            <Form form={form} onFinish={handleSignUp} layout="vertical">
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
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!"
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "The two passwords that you entered do not match"
                      );
                    }
                  })
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Sign up
                </Button>
              </Form.Item>
            </Form>
            <form onSubmit={handleSignUp}></form>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default RegisterRoute;
