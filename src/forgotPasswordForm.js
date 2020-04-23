import React from 'react';
import PropTypes from 'prop-types';
import Form from '@super-formal/form';
import ChainReaction, {joinReactions, result as ReactionResult} from '@super-formal/chain-reaction';

import {assignWithJoin} from './misc';

class ForgotPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userIDFieldValue: "",
      userIDFieldHasError: false,
      userIDFieldErrorMessage: undefined,
      emailFieldValue: "",
      emailFieldHasError: false,
      emailFieldErrorMessage: undefined,
    };

    this.copyValueToState = this.copyValueToState.bind(this);
    this.validateFieldsBeforeSending = this.validateFieldsBeforeSending.bind(this);
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

      formState.errorMessages = errorMessages;
    }

    if (this.props.showResetTokenHasBeenSentSuccess) {
      formState.successMessages = [this.props.resetTokenHasBeenSentMessage];
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

  get submitButtonState() {
    return {
      label: this.props.submitLabel,
    };
  }

  get usernameReactions() {
    let onChangeReaction = new ChainReaction();
    onChangeReaction.pushCallback(this.copyValueToState("userIDFieldValue"));

    let reactions = {
      onChange: onChangeReaction,
    };

    return assignWithJoin(reactions, this.props.reactions.username, joinReactions);
  }

  get emailReactions() {
    let onChangeReaction = new ChainReaction();
    onChangeReaction.pushCallback(this.copyValueToState("emailFieldValue"));

    let reactions = {
      onChange: onChangeReaction,
    };

    return assignWithJoin(reactions, this.props.reactions.email, joinReactions);
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

        this.props.onSubmitClick(...args);
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
    } else {
      this.setState({
        emailFieldHasError: false,
        emailFieldErrorMessage: undefined,
      });
    }

    return result;
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
          submit: this.submitButtonState,
          ...this.props.state
        }}
        reactions={{
          username: this.usernameReactions,
          email: this.emailReactions,
          submit: this.submitReactions,
          ...this.props.reactions
        }}
      />
    );
  }
}

ForgotPasswordForm.propTypes = {
  builders: PropTypes.object.isRequired,
  adapters: PropTypes.object,
  state: PropTypes.object,
  reactions: PropTypes.objectOf(PropTypes.objectOf(ChainReaction)),

  onSubmitClick: PropTypes.func,
  userIDLabel: PropTypes.oneOf(['Username', 'User', 'User Name', 'Name']),
  submitLabel: PropTypes.oneOf(['Request Token', 'Request', 'Submit']),
  showErrorMesssagesAtTop: PropTypes.bool,
  dontValidateFieldsBeforeSending: PropTypes.bool,
  showResetTokenHasBeenSentSuccess: PropTypes.bool,
  resetTokenHasBeenSentMessage: PropTypes.string,
  hideUserIDField: PropTypes.bool,
  hideEmailField: PropTypes.bool,
};

ForgotPasswordForm.defaultProps = {
  adapters: {},
  state: {},
  reactions: {},

  onSubmitClick: undefined,
  userIDLabel: 'Username',
  submitLabel: 'Request Token',
  showErrorMesssagesAtTop: false,
  dontValidateFieldsBeforeSending: false,
  showResetTokenHasBeenSentSuccess: false,
  resetTokenHasBeenSentMessage: "A reset token has been sent to your email account",
  hideUserIDField: false,
  hideEmailField: false,
};

export default ForgotPasswordForm;
