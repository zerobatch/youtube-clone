import React, { Component } from "react";
import { Button, Modal, Message, Icon } from "semantic-ui-react";
import ValidationService from "../../Utils/Validations";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

class DynamicAuthModal extends Component {
  state = {
    activeForm: "sign_in",
    linkData: {
      linkMessage: "New to us?",
      linkContent: "Sign Up"
    },
    formData: {
      email: "",
      password: "",
      password_confirmation: ""
    },
    isLoading: false,
    errors: { validations: {}, server: null }
  };

  changeActiveForm = () => {
    let data = {
      activeFormToggle: "sign_up",
      linkData: {
        linkMessage: "Already have an account?",
        linkContent: "Sign In"
      }
    };

    if (this.state.activeForm === "sign_up") {
      data = {
        activeFormToggle: "sign_in",
        linkData: {
          linkMessage: "New to us?",
          linkContent: "Sign Up"
        }
      };
    }

    this.setState({
      activeForm: data.activeFormToggle,
      linkData: data.linkData
    });
  };

  handleOnChange = event =>
    this.setState({
      formData: {
        ...this.state.formData,
        [event.target.name]: event.target.value
      }
    });

  handleGoogleSignIn = async () => {
    try {
      const result = await this.props.context.signInWithGoogle();

      const token = result.credential.accessToken;
      const user = result.user;
    } catch (error) {
      console.error(error);

      this.setState({
        errors: { validations: {}, server: error.message }
      });
    }
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { activeForm, formData } = this.state;
    const { context } = this.props;

    this.setState({
      errors: { validations: {}, server: null },
      isLoading: true
    });

    try {
      const validationErrors = ValidationService.doValidation(
        formData,
        activeForm
      );

      if (Object.keys(validationErrors).length === 0) {
        if (activeForm === "sign_in") {
          const result = await context.signInWithEmailAndPassword(
            formData.email,
            formData.password
          );
          console.log(result);
        }

        if (activeForm === "sign_up") {
          const result = await context.createUserWithEmailAndPassword(
            formData.email,
            formData.password
          );
          console.log(result);
        }
      }

      this.setState({
        errors: { ...this.state.errors, validations: validationErrors },
        isLoading: false
      });
    } catch (error) {
      console.error(error);
      this.setState({
        isLoading: false,
        errors: {
          ...this.state.errors,
          server: error.message
        }
      });
    }
  };

  render() {
    const {
      activeForm,
      linkData: { linkMessage, linkContent },
      isLoading,
      errors
    } = this.state;

    return (
      <Modal
        dimmer="blurring"
        trigger={
          <Button compact basic color="blue">
            <Icon circular color="blue" name="user" />
            SIGN IN
          </Button>
        }
        centered
        closeIcon
      >
        <Modal.Content>
          {errors.server && (
            <Message
              error
              header="An error happened in the server"
              content={errors.server}
            />
          )}
          {activeForm === "sign_in" ? (
            <LoginForm
              handleGoogleSignIn={this.handleGoogleSignIn}
              handleOnChange={this.handleOnChange}
              handleSubmit={this.handleSubmit}
              isLoading={isLoading}
              errors={errors.validations}
            />
          ) : (
            <SignupForm
              handleGoogleSignUp={this.handleGoogleSignIn}
              handleOnChange={this.handleOnChange}
              handleSubmit={this.handleSubmit}
              isLoading={isLoading}
              errors={errors.validations}
            />
          )}
          <Message>
            {linkMessage}
            <a
              href="/"
              onClick={event => {
                event.preventDefault();
                this.changeActiveForm();
              }}
            >
              {linkContent}
            </a>
          </Message>
        </Modal.Content>
      </Modal>
    );
  }
}

export default DynamicAuthModal;
