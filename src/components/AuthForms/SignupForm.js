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

const SignupForm = ({
  handleGoogleSignUp,
  handleOnChange,
  handleSubmit,
  isLoading,
  errors
}) => (
  <Grid textAlign="center" verticalAlign="middle">
    <Grid.Column>
      <Header as="h2" color="teal" textAlign="center">
        Create a new account
      </Header>
      <Form id="signup" size="large" onSubmit={handleSubmit}>
        <Segment stacked>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="E-mail address"
            name="email"
            onChange={handleOnChange}
            error={errors.email}
          />
          <span>{errors.email}</span>
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
            name="password"
            onChange={handleOnChange}
            error={errors.password}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Confirm password"
            type="password"
            name="password_confirmation"
            onChange={handleOnChange}
            error={errors.password_confirmation}
          />
          <span>{errors.password_confirmation}</span>

          <Button loading={isLoading} compact color="blue" fluid size="large">
            Create my account
          </Button>
          <Divider horizontal>Or</Divider>
          <Button
            compact
            color="red"
            fluid
            size="large"
            onClick={handleGoogleSignUp}
          >
            <Icon name="google" size="small" />
            Sign up with Google
          </Button>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
);

export default SignupForm;
