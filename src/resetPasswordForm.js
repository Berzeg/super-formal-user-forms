import React from 'react';
import PropTypes from 'prop-types';
import Form from '@super-formal/form';
import ChainReaction, {joinReactions, result as ReactionResult} from '@super-formal/chain-reaction';

import {assignWithJoin} from './misc';

class ResetPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userIDFieldValue: "",
      userIDFieldHasError: false,
      userIDFieldErrorMessage: undefined,
      tokenFieldValue: "",
      tokenFieldHasError: false,
      tokenFieldErrorMessage: undefined,
      passwordFieldValue: "",
      passwordFieldHasError: false,
      passwordFieldErrorMessage: undefined,
      confirmPasswordFieldValue: "",
      confirmPasswordFieldHasError: false,
      confirmPasswordFieldErrorMessage: undefined,
    };

    this.copyValueToState = this.copyValueToState.bind(this);
    this.validateFieldsBeforeSending = this.validateFieldsBeforeSending.bind(this);
  }

  get formState() {
    let formState = {};

    if (this.props.showErrorMesssagesAtTop) {
      if (!formState.errorMessages) formState.errorMessages = [];

      if (this.state.userIDFieldHasError) {
        formState.errorMessages.push(this.state.userIDFieldErrorMessage);
      }
    }

    if (this.props.showInvalidUsernameOrTokenError) {
      if (!formState.errorMessages) formState.errorMessages = [];
      formState.errorMessages.push(this.props.invalidUsernameOrTokenMessage);
    }

    if (this.props.showPasswordHasBeenChangedSuccess) {
      if (!formState.successMessages) formState.successMessages = [];
      formState.successMessages.push(this.props.passwordHasBeenChangedMessage);
    }

    return formState;
  }

  get userIDFieldState() {
    let state = {
      hint: this.props.userIDLabel,
      value: this.state.userIDFieldValue,
      hasError: this.state.userIDFieldHasError,
    };

    if (state.hasError && !this.props.showErrorMesssagesAtTop) {
      state.errorMessage = this.state.userIDFieldErrorMessage;
    }

    return state;
  }

  get tokenFieldState() {
    let state = {
      hint: "Token",
      value: this.state.tokenFieldValue,
      hasError: this.state.tokenFieldHasError,
    };

    if (state.hasError && !this.props.showErrorMesssagesAtTop) {
      state.errorMessage = this.state.tokenFieldErrorMessage;
    }

    return state;
  }

  get passwordFieldState() {
    let state = {
      hint: "Password",
      value: this.state.passwordFieldValue,
      hasError: this.state.passwordFieldHasError,
      password: true,
    };

    if (state.hasError && !this.props.showErrorMesssagesAtTop) {
      state.errorMessage = this.state.passwordFieldErrorMessage;
    }

    return state;
  }

  get confirmPasswordFieldState() {
    let state = {
      hint: "Confirm Password",
      value: this.state.confirmPasswordFieldValue,
      hasError: this.state.confirmPasswordFieldHasError,
      password: true,
    };

    if (state.hasError && !this.props.showErrorMesssagesAtTop) {
      state.errorMessage = this.state.confirmPasswordFieldErrorMessage;
    }

    return state;
  }

  get submitButtonState() {
    return {
      label: this.props.submitLabel,
    };
  }

  get userIDReactions() {
    let onChangeReaction = new ChainReaction();
    onChangeReaction.pushCallback(this.copyValueToState("userIDFieldValue"));

    let reactions = {
      onChange: onChangeReaction,
    };

    return assignWithJoin(reactions, this.props.reactions.userID, joinReactions);
  }

  get tokenReactions() {
    let onChangeReaction = new ChainReaction();
    onChangeReaction.pushCallback(this.copyValueToState("tokenFieldValue"));

    let reactions = {
      onChange: onChangeReaction,
    };

    return assignWithJoin(reactions, this.props.reactions.token, joinReactions);
  }

  get passwordReactions() {
    let onChangeReaction = new ChainReaction();
    onChangeReaction.pushCallback(this.copyValueToState("passwordFieldValue"));

    let reactions = {
      onChange: onChangeReaction,
    };

    return assignWithJoin(reactions, this.props.reactions.password, joinReactions);
  }

  get confirmPasswordReactions() {
    let onChangeReaction = new ChainReaction();
    onChangeReaction.pushCallback(this.copyValueToState("confirmPasswordFieldValue"));

    let reactions = {
      onChange: onChangeReaction,
    };

    return assignWithJoin(reactions, this.props.reactions.confirmPassword, joinReactions);
  }

  get submitReactions() {
    let submitOnClickReactionCallbacks = [];

    if (!this.props.dontValidateFieldsBeforeSending) {
      submitOnClickReactionCallbacks.push(this.validateFieldsBeforeSending);
    }

    if (this.props.onSubmitClick) {
      let onSubmitClick = () => {
        this.props.onSubmitClick(
          this.state.userIDFieldValue,
          this.state.tokenFieldValue,
          this.state.passwordFieldValue,
        );
      }

      submitOnClickReactionCallbacks.push(onSubmitClick);
    }

    let reactions = {
      onClick: ChainReaction.fromList(submitOnClickReactionCallbacks),
    };

    return assignWithJoin(reactions, this.props.reactions.submit, joinReactions);
  }

  copyValueToState(stateFieldID) {
    return event => {
      if (event && event.target) {
        this.setState({[stateFieldID]: event.target.value});
      }
    };
  }

  validateFieldsBeforeSending() {
    let result = undefined;

    if (this.state.userIDFieldValue.trim() === "") {
      this.setState({
        userIDFieldHasError: true,
        userIDFieldErrorMessage: `'${this.props.userIDLabel}' field can't be empty`,
      });

      result = ReactionResult(false);
    } else {
      this.setState({
        userIDFieldHasError: false,
        userIDFieldErrorMessage: undefined,
      });
    }

    if (this.state.tokenFieldValue.trim() === "") {
      this.setState({
        tokenFieldHasError: true,
        tokenFieldErrorMessage: "'Token' field can't be empty",
      });

      result = ReactionResult(false);
    } else {
      this.setState({
        tokenFieldHasError: false,
        tokenFieldErrorMessage: undefined,
      });
    }

    if (this.state.passwordFieldValue.trim() === "") {
      this.setState({
        passwordFieldHasError: true,
        passwordFieldErrorMessage: "'Password' field can't be empty",
      });

      result = ReactionResult(false);
    } else if (this.state.passwordFieldValue !== this.state.confirmPasswordFieldValue) {
      this.setState({
        passwordFieldHasError: true,
        passwordFieldErrorMessage: "'Password' and 'Confirm Password' field values are mismatching. They must be the same.",
      });

      result = ReactionResult(false);
    } else {
      this.setState({
        passwordFieldHasError: false,
        passwordFieldErrorMessage: undefined,
      });
    }

    if (this.state.confirmPasswordFieldValue.trim() === "") {
      this.setState({
        confirmPasswordFieldHasError: true,
        confirmPasswordFieldErrorMessage: "'Confirm Password' field can't be empty",
      });

      result = ReactionResult(false);
    } else if (this.state.passwordFieldValue !== this.state.confirmPasswordFieldValue) {
      this.setState({
        confirmPasswordFieldHasError: true,
        confirmPasswordFieldErrorMessage: undefined,
      });

      result = ReactionResult(false);
    } else {
      this.setState({
        confirmPasswordFieldHasError: false,
        confirmPasswordFieldErrorMessage: undefined,
      });
    }

    return result;
  }

  render() {
    return (
      <Form
        structure={[
          {type: "text", id: "userID"},
          {type: "text", id: "token"},
          {type: "text", id: "password"},
          {type: "text", id: "confirmPassword"},
          {type: "button", id: "submit"},
        ]}
        builders={this.props.builders}
        adapters={this.props.adapters}
        state={{
          form: this.formState,
          userID: this.userIDFieldState,
          token: this.tokenFieldState,
          password: this.passwordFieldState,
          confirmPassword: this.confirmPasswordFieldState,
          submit: this.submitButtonState,
          ...this.props.state
        }}
        reactions={{
          userID: this.userIDReactions,
          token: this.tokenReactions,
          password: this.passwordReactions,
          confirmPassword: this.confirmPasswordReactions,
          submit: this.submitReactions,
          ...this.props.reactions
        }}
      />
    );
  }
}

ResetPasswordForm.propTypes = {
  builders: PropTypes.object.isRequired,
  adapters: PropTypes.object,
  state: PropTypes.object,
  reactions: PropTypes.objectOf(PropTypes.objectOf(ChainReaction)),

  onSubmitClick: PropTypes.func,
  userIDLabel: PropTypes.oneOf(['Username', 'Email', 'User', 'User Name']),
  submitLabel: PropTypes.oneOf(['Reset Password', 'Reset', 'Submit']),
  showErrorMesssagesAtTop: PropTypes.bool,
  dontValidateFieldsBeforeSending: PropTypes.bool,
  showPasswordHasBeenChangedSuccess: PropTypes.bool,
  passwordHasBeenChangedMessage: PropTypes.string,
  showInvalidUsernameOrTokenError: PropTypes.bool,
  invalidUsernameOrTokenMessage: PropTypes.string,
};

ResetPasswordForm.defaultProps = {
  adapters: {},
  state: {},
  reactions: {},

  onSubmitClick: undefined,
  userIDLabel: 'Username',
  submitLabel: 'Reset Password',
  showErrorMesssagesAtTop: false,
  dontValidateFieldsBeforeSending: false,
  showPasswordHasBeenChangedSuccess: false,
  passwordHasBeenChangedMessage: "Your password has been successfully updated.",
  showInvalidUsernameOrTokenError: false,
  invalidUsernameOrTokenMessage: "The provided username and token are invalid. Password has not been reset.",
};

export default ResetPasswordForm;
