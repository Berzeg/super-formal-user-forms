import React from 'react';
import PropTypes from 'prop-types';
import Form from '@super-formal/form';
import ChainReaction, {joinReactions, result as ReactionResult} from '@super-formal/chain-reaction';

import {assignWithJoin} from './misc';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userIDFieldValue: '',
      userIDFieldHasError: false,
      userIDFieldErrorMessage: "",
      passwordFieldValue: '',
      passwordFieldHasError: false,
      passwordFieldErrorMessage: "",
    };

    this.copyValueToState = this.copyValueToState.bind(this);
    this.validateFieldsBeforeSending = this.validateFieldsBeforeSending.bind(this);
  }

  get formState() {
    let formState = {};

    if (this.props.showErrorMesssagesAtTop) {
      let errorMessages = [];

      if (this.state.userIDFieldHasError) {
        errorMessages.push(this.state.userIDFieldErrorMessage);
      }
      if (this.state.passwordFieldHasError) {
        errorMessages.push(this.state.passwordFieldErrorMessage);
      }

      formState.errorMessages = errorMessages;
    }

    if (this.props.showMismatchingUserAndPasswordError) {
      let userIDLabelLowercase = this.props.userIDLabel.toLowerCase();
      let errorMessage = `Mismatching ${userIDLabelLowercase} and password`;
      if (formState.errorMessages) {
        formState.errorMessages.push(errorMessage);
      } else {
        formState.errorMessages = [errorMessage];
      }
    }

    return formState;
  }

  get userFieldState() {
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

  get passwordFieldState() {
    let state = {
      hint: 'Password',
      value: this.state.passwordFieldValue,
      password: true,
      hasError: this.state.passwordFieldHasError,
    };

    if (state.hasError && !this.props.showErrorMesssagesAtTop) {
      state.errorMessage = this.state.passwordFieldErrorMessage;
    }

    return state;
  }

  get userReactions() {
    let onChangeReaction = new ChainReaction();
    onChangeReaction.pushCallback(this.copyValueToState("userIDFieldValue"));

    let reactions = {
      onChange: onChangeReaction,
    };

    return assignWithJoin(reactions, this.props.reactions.userID, joinReactions);
  }

  get passwordReactions() {
    let onChangeReaction = new ChainReaction();
    onChangeReaction.pushCallback(this.copyValueToState("passwordFieldValue"));

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
        this.props.onSubmitClick(
          this.state.userIDFieldValue,
          this.state.passwordFieldValue,
        );
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

    if (this.state.userIDFieldValue.trim().length === 0) {
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

    if (this.state.passwordFieldValue.trim().length === 0) {
      this.setState({
        passwordFieldHasError: true,
        passwordFieldErrorMessage: "'Password' field can't be empty",
      });

      result = ReactionResult(false);
    } else {
      this.setState({
        passwordFieldHasError: false,
        passwordFieldErrorMessage: undefined,
      });
    }

    return result;
  }

  render() {
    let submitButtonState = {
      label: this.props.submitLabel,
    };

    return (
      <Form
        structure={[
          {type: 'text', id: 'userID'},
          {type: 'text', id: 'password'},
          {type: 'button', id: 'submit'},
        ]}
        builders={this.props.builders}
        adapters={this.props.adapters}
        state={{
          form: this.formState,
          userID: this.userFieldState,
          password: this.passwordFieldState,
          submit: submitButtonState,
          ...this.props.state,
        }}
        reactions={{
          userID: this.userReactions,
          password: this.passwordReactions,
          submit: this.submitReactions,
          ...this.props.reactions,
        }}
      />
    );
  }
}

LoginForm.propTypes = {
  builders: PropTypes.object.isRequired,
  adapters: PropTypes.object,
  state: PropTypes.object,
  reactions: PropTypes.objectOf(PropTypes.objectOf(ChainReaction)),

  onSubmitClick: PropTypes.func,
  userIDLabel: PropTypes.oneOf(['Username', 'Email']),
  submitLabel: PropTypes.oneOf(['Submit', 'Log In']),
  showErrorMesssagesAtTop: PropTypes.bool,
  showMismatchingUserAndPasswordError: PropTypes.bool,
  dontValidateFieldsBeforeSending: PropTypes.bool,
};

LoginForm.defaultProps = {
  adapters: {},
  state: {},
  reactions: {},

  onSubmitClick: undefined,
  userIDLabel: 'Email',
  submitLabel: 'Log In',
  showErrorMesssagesAtTop: false,
  showMismatchingUserAndPasswordError: false,
  dontValidateFieldsBeforeSending: false,
};

export default LoginForm;
