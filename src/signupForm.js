import React from 'react';
import PropTypes from 'prop-types';
import Form from '@super-formal/form';
import ChainReaction, {joinReactions, result as ReactionResult} from '@super-formal/chain-reaction';

import {assignWithJoin, isValidEmail} from './misc';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userIDFieldValue: "",
      userIDFieldHasError: false,
      userIDFieldErrorMessage: undefined,
      emailFieldValue: "",
      emailFieldHasError: false,
      emailFieldErrorMessage: undefined,
      passwordFieldValue: "",
      passwordFieldHasError: false,
      passwordFieldErrorMessage: undefined,
      confirmPasswordFieldValue: "",
      confirmPasswordFieldHasError: false,
      confirmPasswordFieldErrorMessage: undefined,
    };

    this.validateUserIDAvailabilityTimer = undefined;

    this.copyValueToState = this.copyValueToState.bind(this);
    this.validateFieldsBeforeSending = this.validateFieldsBeforeSending.bind(this);
    this.validateUserIDAvailabilityWithTimer = this.validateUserIDAvailabilityWithTimer.bind(this);
  }

  componentWillUnmount() {
    if (this.validateUserIDAvailabilityTimer) {
      clearTimeout(this.validateUserIDAvailabilityTimer);
      this.validateUserIDAvailabilityTimer = undefined;
    }
  }

  get structure() {
    let structure = [];

    if (!this.props.hideUserIDField) {
      structure.push({type: 'text', id: 'username'});
    }

    if (!this.props.hideEmailField) {
      structure.push({type: 'text', id: 'email'});
    }

    structure = structure.concat([
      {type: 'text', id: 'password'},
      {type: 'text', id: 'confirmPassword'},
      {type: 'button', id: 'submit'},
    ]);

    return structure;
  }

  get formState() {
    let formState = {};

    if (this.props.showErrorMesssagesAtTop) {
      let errorMessages = [];

      if (!this.props.hideUserIDField && this.state.userIDFieldHasError) {
        errorMessages.push(this.state.userIDFieldErrorMessage);
      }
      if (!this.props.hideEmailField && this.state.emailFieldHasError) {
        errorMessages.push(this.state.emailFieldErrorMessage);
      }
      if (this.state.passwordFieldHasError) {
        errorMessages.push(this.state.passwordFieldErrorMessage);
      }
      if (this.state.confirmPasswordFieldHasError && this.state.confirmPasswordFieldErrorMessage) {
        errorMessages.push(this.state.confirmPasswordFieldErrorMessage);
      }

      formState.errorMessages = errorMessages;
    }

    if (this.props.showUserIdAlreadyInUseError) {
      let userIDLabel = this.props.hideUserIDField ? 'Email' : this.props.userIDLabel;
      let errorMessage = `The ${userIDLabel} is being used by an existing account`;

      if (formState.errorMessages) {
        formState.errorMessages.push(errorMessage);
      } else {
        formState.errorMessages = [errorMessage];
      }
    }

    return formState;
  }

  get usernameFieldState() {
    let state = {
      hint: this.props.userIDLabel,
      value: this.state.userIDFieldValue,
      hasError: this.state.userIDFieldHasError,
    };

    if (
      state.hasError &&
      !this.props.hideUserIDField &&
      !this.props.showErrorMesssagesAtTop
    ) {
      state.errorMessage = this.state.userIDFieldErrorMessage;
    }

    return state;
  }

  get emailFieldState() {
    let state = {
      hint: "Email",
      value: this.state.emailFieldValue,
      hasError: this.state.emailFieldHasError,
    };

    if (
      state.hasError &&
      !this.props.hideEmailField &&
      !this.props.showErrorMesssagesAtTop
    ) {
      state.errorMessage = this.state.emailFieldErrorMessage;
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

  get usernameReactions() {
    let onChangeReaction = ChainReaction.fromList([
      this.copyValueToState("userIDFieldValue"),
      this.validateUserIDAvailabilityWithTimer,
    ]);

    let reactions = {
      onChange: onChangeReaction,
    };

    return assignWithJoin(reactions, this.props.reactions.username, joinReactions);
  }

  get emailReactions() {
    let onChangeReaction = new ChainReaction();
    onChangeReaction.pushCallback(this.copyValueToState("emailFieldValue"));
    onChangeReaction.pushCallback(() => {
      if (this.props.hideUserIDField) {
        this.validateUserIDAvailabilityWithTimer();
      }
    });

    let reactions = {
      onChange: onChangeReaction,
    };

    return assignWithJoin(reactions, this.props.reactions.email, joinReactions);
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

    return assignWithJoin(reactions, this.props.reactions.password, joinReactions);
  }

  get submitReactions() {
    let submitOnClickReactionCallbacks = [];

    if (!this.props.dontValidateFieldsBeforeSending) {
      submitOnClickReactionCallbacks.push(this.validateFieldsBeforeSending);
    }

    if (this.props.onSubmitClick) {
      let onSubmitClick = () => {
        let args = [];

        if (!this.props.hideUserIDField) {
          args.push(this.state.userIDFieldValue);
        }
        if (!this.props.hideEmailField) {
          args.push(this.state.emailFieldValue);
        }
        args.push(this.state.passwordFieldValue);

        this.props.onSubmitClick(...args);
      }

      submitOnClickReactionCallbacks.push(onSubmitClick);
    }

    let defaultSubmitReactions = {
      onClick: ChainReaction.fromList(submitOnClickReactionCallbacks),
    };

    return assignWithJoin(defaultSubmitReactions, this.props.reactions.submit, joinReactions);
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

    if (!this.props.hideUserIDField && this.state.userIDFieldValue.trim() === "") {
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

    if (!this.props.hideEmailField && this.state.emailFieldValue.trim() === "") {
      this.setState({
        emailFieldHasError: true,
        emailFieldErrorMessage: "'Email' field can't be empty",
      });

      result = ReactionResult(false);
    } else if (!this.props.hideEmailField && !isValidEmail(this.state.emailFieldValue) ) {
      this.setState({
        emailFieldHasError: true,
        emailFieldErrorMessage: "The provided email has an invalid format",
      });

      result = ReactionResult(false);
    } else {
      this.setState({
        emailFieldHasError: false,
        emailFieldErrorMessage: undefined,
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

  validateUserIDAvailabilityWithTimer() {
    if (this.validateUserIDAvailabilityTimer) {
      clearTimeout(this.validateUserIDAvailabilityTimer);
      this.validateUserIDAvailabilityTimer = undefined;
    }

    let userID = this.props.hideUserIDField ? this.state.emailFieldValue : this.state.userIDFieldValue;
    if (userID.trim() === "") {
      return;
    }

    if (this.props.validateUserIDAfterXSecondsOfTyping) {
      this.validateUserIDAvailabilityTimer = setTimeout(() => {
        this.validateUserIDAvailabilityTimer = undefined;
        if (this.props.onValidateUserID) {
          this.props.onValidateUserID(userID);
        }
      }, this.props.validateUserIDAfterXSecondsOfTyping * 1000);
    }
  }

  render() {
    return (
      <Form
        structure={this.structure}
        builders={this.props.builders}
        adapters={this.props.adapters}
        state={{
          form: this.formState,
          username: this.usernameFieldState,
          email: this.emailFieldState,
          password: this.passwordFieldState,
          confirmPassword: this.confirmPasswordFieldState,
          submit: this.submitButtonState,
          ...this.props.state
        }}
        reactions={{
          username: this.usernameReactions,
          email: this.emailReactions,
          password: this.passwordReactions,
          confirmPassword: this.confirmPasswordReactions,
          submit: this.submitReactions,
          ...this.props.reactions
        }}
      />
    );
  }
}

SignupForm.propTypes = {
  builders: PropTypes.object.isRequired,
  adapters: PropTypes.object,
  state: PropTypes.object,
  reactions: PropTypes.objectOf(PropTypes.objectOf(ChainReaction)),

  onSubmitClick: PropTypes.func,
  userIDLabel: PropTypes.oneOf(['Username', 'User', 'User Name', 'Name', 'Avatar']),
  submitLabel: PropTypes.oneOf(['Sign Up', 'Signup', 'Submit']),
  showErrorMesssagesAtTop: PropTypes.bool,
  hideUserIDField: PropTypes.bool,
  hideEmailField: PropTypes.bool,
  dontValidateFieldsBeforeSending: PropTypes.bool,
  validateUserIDAfterXSecondsOfTyping: PropTypes.number,
  onValidateUserID: PropTypes.func,
  showUserIdAlreadyInUseError: PropTypes.bool,
};

SignupForm.defaultProps = {
  adapters: {},
  state: {},
  reactions: {},

  onSubmitClick: undefined,
  userIDLabel: 'Username',
  submitLabel: 'Sign Up',
  showErrorMesssagesAtTop: false,
  hideUserIDField: false,
  hideEmailField: false,
  dontValidateFieldsBeforeSending: false,
  validateUserIDAfterXSecondsOfTyping: undefined,
  onValidateUserID: undefined,
  showUserIdAlreadyInUseError: false,
};

export default SignupForm;
