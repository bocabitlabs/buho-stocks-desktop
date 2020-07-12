import React, { useCallback } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { useFirebase } from "react-redux-firebase";
import { Row, Col } from "antd";

const SignUp = ({ history }: RouteComponentProps) => {
  const firebase = useFirebase();
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
    <Row>
      <Col span={12} offset={6}>
        <h1>Sign up</h1>
        <form onSubmit={handleSignUp}>
          <label>
            Email
            <input name="email" type="email" placeholder="Email" />
          </label>
          <label>
            Password
            <input name="password" type="password" placeholder="Password" />
          </label>
          <button type="submit">Sign Up</button>
        </form>
      </Col>
    </Row>
  );
};

export default withRouter(SignUp);
