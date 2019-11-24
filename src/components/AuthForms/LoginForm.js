import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Icon,
  Divider
} from "semantic-ui-react";

const LoginForm = ({
  handleGoogleSignIn,
  handleOnChange,
  handleSubmit,
  isLoading,
  errors
}) => {
  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column>
        <Header as="h2" color="teal" textAlign="center">
          Log-in to your account
        </Header>
        <Form id="login" size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              name="email"
              type="email"
              onChange={handleOnChange}
              error={errors.email}
            />

            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
              onChange={handleOnChange}
              errors={errors.password}
            />
            <Button
              type="submit"
              loading={isLoading}
              color="teal"
              fluid
              size="large"
            >
              Login
            </Button>
            <Divider horizontal>Or</Divider>
            <Button color="red" fluid size="large" onClick={handleGoogleSignIn}>
              <Icon name="google" size="small" />
              Login with Google account
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default LoginForm;
