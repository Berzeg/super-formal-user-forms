# @super-formal/user-forms

Common user forms (log in, sign up, etc.) as react components to get your app going quick and well.

## Index

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Motivation](#motivation)
- [The `LoginForm` Component](#the-loginform-component)
  - [`builders` prop](#loginForm-builders)
  - [`adapters` prop](#loginForm-adapters)
  - [`state` prop](#loginForm-state)
  - [`reactions` prop](#loginForm-reactions)
  - [`onSubmitClick` prop](#loginForm-onSubmitClick)
  - [`userIDLabel` prop](#loginForm-userIDLabel)
  - [`submitLabel` prop](#loginForm-submitLabel)
  - [`showErrorMesssagesAtTop` prop](#loginForm-showErrorMesssagesAtTop)
  - [`showMismatchingUserAndPasswordError` prop](#loginForm-showMismatchingUserAndPasswordError)
  - [`dontValidateFieldsBeforeSending` prop](#loginForm-dontValidateFieldsBeforeSending)


- [The `SignupForm` Component](#the-signupform-component)
  - [`builders` prop](#signupForm-builders)
  - [`adapters` prop](#signupForm-adapters)
  - [`state` prop](#signupForm-state)
  - [`reactions` prop](#signupForm-reactions)
  - [`onSubmitClick` prop](#signupForm-onSubmitClick)
  - [`userIDLabel` prop](#signupForm-userIDLabel)
  - [`submitLabel` prop](#signupForm-submitLabel)
  - [`showErrorMesssagesAtTop` prop](#signupForm-showErrorMesssagesAtTop)
  - [`hideUserIDField` prop](#signupForm-hideUserIDField)
  - [`hideEmailField` prop](#signupForm-hideEmailField)
  - [`dontValidateFieldsBeforeSending` prop](#signupForm-dontValidateFieldsBeforeSending)
  - [`validateUserIDAfterXSecondsOfTyping` prop](#signupForm-validateUserIDAfterXSecondsOfTyping)
  - [`onValidateUserID` prop](#signupForm-onValidateUserID)
  - [`showUserIdAlreadyInUseError` prop](#signupForm-showUserIdAlreadyInUseError)


- [The `ForgotPasswordForm` Component](#the-forgotpasswordform-component)
  - [`builders` prop](#forgotPasswordForm-builders)
  - [`adapters` prop](#forgotPasswordForm-adapters)
  - [`state` prop](#forgotPasswordForm-state)
  - [`reactions` prop](#forgotPasswordForm-reactions)
  - [`onSubmitClick` prop](#forgotPasswordForm-onSubmitClick)
  - [`userIDLabel` prop](#forgotPasswordForm-userIDLabel)
  - [`submitLabel` prop](#forgotPasswordForm-submitLabel)
  - [`showErrorMesssagesAtTop` prop](#forgotPasswordForm-showErrorMesssagesAtTop)
  - [`dontValidateFieldsBeforeSending` prop](#forgotPasswordForm-dontValidateFieldsBeforeSending)
  - [`showResetTokenHasBeenSentSuccess` prop](#forgotPasswordForm-showResetTokenHasBeenSentSuccess)
  - [`resetTokenHasBeenSentMessage` prop](#forgotPasswordForm-resetTokenHasBeenSentMessage)
  - [`hideUserIDField` prop](#forgotPasswordForm-hideUserIDField)
  - [`hideEmailField` prop](#forgotPasswordForm-hideEmailField)


- [The `ResetPasswordForm` Component](#the-resetpasswordform-component)
  - [`builders` prop](#resetPasswordForm-builders)
  - [`adapters` prop](#resetPasswordForm-adapters)
  - [`state` prop](#resetPasswordForm-state)
  - [`reactions` prop](#resetPasswordForm-reactions)
  - [`onSubmitClick` prop](#resetPasswordForm-onSubmitClick)
  - [`userIDLabel` prop](#resetPasswordForm-userIDLabel)
  - [`submitLabel` prop](#resetPasswordForm-submitLabel)
  - [`showErrorMesssagesAtTop` prop](#resetPasswordForm-showErrorMesssagesAtTop)
  - [`dontValidateFieldsBeforeSending` prop](#resetPasswordForm-dontValidateFieldsBeforeSending)
  - [`showPasswordHasBeenChangedSuccess` prop](#resetPasswordForm-showPasswordHasBeenChangedSuccess)
  - [`passwordHasBeenChangedMessage` prop](#resetPasswordForm-passwordHasBeenChangedMessage)
  - [`showInvalidUsernameOrTokenError` prop](#resetPasswordForm-showInvalidUsernameOrTokenError)
  - [`invalidUsernameOrTokenMessage` prop](#resetPasswordForm-invalidUsernameOrTokenMessage)


## Installation

Using npm:

```
npm i -g npm
npm i --save @super-formal/user-forms
```

Using yarn:

```
yarn add @super-formal/user-forms
```

## Basic Usage

After installing the package you can use it in your React project as follows:

```
import {
  LoginForm,
  SignupForm,
  ForgotPasswordForm,
  ResetPasswordForm,
} from '@super-formal/user-forms';

const DEFAULT_BUILDERS = {
  'form': Form, // You have to define this component
  'text': TextField, // You have to define this component
  'button': Button, // You have to define this component
};

// inside your render() function
<div>
  <LoginForm
    builders={DEFAULT_BUILDERS}
    onSubmitClick={(username, password) => {
      // try to log the user in
    }}
  />

  <SignupForm
    builders={DEFAULT_BUILDERS}
    onSubmitClick={(username, email, password) => {
      // try to sign the user up
    }}
  />


  <ForgotPasswordForm
    builders={DEFAULT_BUILDERS}
    onSubmitClick={(username, email) => {
      // start the reset password procedure for this user
    }}
  />

  <ResetPasswordForm
    builders={DEFAULT_BUILDERS}
    onSubmitClick={(username, token, password) => {
      // reset the user's password
    }}
  />
</div>
```

## Motivation

User forms are one of the first hurdles you encounter when trying to build an app. These components intend to make it easy to quickly set up the user forms and get going with the rest of the app.

## The `LoginForm` Component

The `LoginForm` is a `Form` with the following structure:

```
[
  {type: "text", id: "userID"},
  {type: "text", id: "password"},
  {type: "button", id: "submit"}
]
```

It also has the implicit structural component `{type: "form", id: "form"}`.

### <a id="loginForm-builders"></a> `builders` prop

`{Object<type: String, id: String>}` - required - The builders (React components) to use when building each of the structural components of the form. You should at least provide the following builders:

```
{
  text: *your Text component*,
  button: *your Button component*
}
```

See the [`Form.builders` prop's docs](https://github.com/Berzeg/super-formal-form#builders-prop) for more information.

### <a id="loginForm-adapters"></a> `adapters` prop

`{Object<String, Function>}` - optional - The adapters that modify the state provided by the form to each of your components. By default an identity function is used as an adapter for each field in the form. This means the state and reactions are passed from the Form to the components as props without modifications. Here's a template you can use for the login form adapters:

```
adapters={{
  form: ({
    errorMessages: Array<String> - A list of error messages to display at the top of the form.
  }) => ({
    thisKeyMatchesAPropForYourComponent: thisIsAValueForThatProp,
    ...
  }),

  userID: ({
    hint: String - The label for the user field.
    value: String - The value typed into the user field.
    hasError: Boolean - `true` if this field has an error.
    errorMessage: String - The error message associated with this field.
    onChange: Function - The callback to be called when the value of the field changes.
  }) => ({
    thisKeyMatchesAPropForYourComponent: thisIsAValueForThatProp,
    ...
  }),

  password: ({
    hint: String - The label for the password field.
    value: String - The value typed into the password field.
    hasError: Boolean - `true` if this field has an error.
    errorMessage: String - The error message associated with this field.
    password: Boolean - `true`.
    onChange: Function - The callback to be called when the value of the field changes.
  }) => ({
    thisKeyMatchesAPropForYourComponent: thisIsAValueForThatProp,
    ...
  }),

  submit: ({
    label: String - The label to show in the button
    onClick: Function - The callback to be called when the submit button is clicked.
  }) => ({
    thisKeyMatchesAPropForYourComponent: thisIsAValueForThatProp,
    ...
  })
}}
```

See the [`Form.adapters` prop's docs](https://github.com/Berzeg/super-formal-form#adapters-prop) for more information.

### <a id="loginForm-state"></a> `state` prop

`{Object<String, Object<String, Any>>}` - optional - Any additional state values to be passed as props to the fields in the form. Do not pass callbacks to the fields through the `state` prop. Use the `reactions` prop for that instead.

See the [`Form.state` prop's docs](https://github.com/Berzeg/super-formal-form#state-prop) for more information.

### <a id="loginForm-reactions"></a> `reactions` prop

`{Object<String, Object<String, Function | Array<Function> | ChainReaction>>}` - optional - Any additional callback values to be passed as props to the fields in the form. Do not pass state props to the fields through the `reactions` prop. Use the `state` prop for that instead.

See the [`Form.reactions` prop's docs](https://github.com/Berzeg/super-formal-form#reactions-prop) for more information.

### <a id="loginForm-onSubmitClick"></a> `onSubmitClick` prop

`{Function}` - optional - A callback to call when the `submit` button is clicked. It has the following signature:

```
(username, password) => {
  // log the user in
}
```

### <a id="loginForm-userIDLabel"></a> `userIDLabel` prop

`{String}` - optional - The label (hint) to show for the `userID` field. Defaults to `"Email"`.

### <a id="loginForm-submitLabel"></a> `submitLabel` prop

`{String}` - optional - The label to show on the `submit` button. Defaults to `"Log In"`.

### <a id="loginForm-showErrorMesssagesAtTop"></a> `showErrorMesssagesAtTop` prop

`{Boolean}` - optional - Defualts to `false`. `true` if you want to show all errors at the top of the form. Otherwise, each error will be displayed under its respective field.

### <a id="loginForm-showMismatchingUserAndPasswordError"></a> `showMismatchingUserAndPasswordError` prop

`{Boolean}` - optional - Defualts to `false`. `true` if you want to show an error message indicating that the submitted `userID` and `password` values failed to log in. Set this to `true` after you send a log in request and your server fails to log in the user.

### <a id="loginForm-dontValidateFieldsBeforeSending"></a> `dontValidateFieldsBeforeSending` prop

`{Boolean}` - optional - Defualts to `false`. `true` if you don't want the form to validate the inputs before sending. They are validated by default. The validation simply verifies that the `userID` and `password` fields are not empty.

## The `SignupForm` Component

The `SignupForm` is a `Form` with the following structure:

```
[
  {type: "text", id: "username"},
  {type: "text", id: "email"},
  {type: "text", id: "password"},
  {type: "text", id: "confirmPassword"},
  {type: "button", id: "submit"}
]
```

It also has the implicit structural component `{type: "form", id: "form"}`.

### <a id="signupForm-builders"></a> `builders` prop

`{Object<type: String, id: String>}` - required - The builders (React components) to use when building each of the structural components of the form. You should at least provide the following builders:

```
{
  text: *your Text component*,
  button: *your Button component*
}
```

See the [`Form.builders` prop's docs](https://github.com/Berzeg/super-formal-form#builders-prop) for more information.

### <a id="signupForm-adapters"></a> `adapters` prop

`{Object<String, Function>}` - optional - The adapters that modify the state provided by the form to each of your components. By default an identity function is used as an adapter for each field in the form. This means the state and reactions are passed from the Form to the components as props without modifications. Here's a template you can use for the login form adapters:

```
adapters={{
  form: ({
    errorMessages: Array<String> - A list of error messages to display at the top of the form.
  }) => ({
    thisKeyMatchesAPropForYourComponent: thisIsAValueForThatProp,
    ...
  }),

  username: ({
    hint: String - The label for the username field.
    value: String - The value typed into the username field.
    hasError: Boolean - `true` if this field has an error.
    errorMessage: String - The error message associated with this field.
    onChange: Function - The callback to be called when the value of the field changes.
  }) => ({
    thisKeyMatchesAPropForYourComponent: thisIsAValueForThatProp,
    ...
  }),

  email: ({
    hint: String - The label for the user field.
    value: String - The value typed into the user field.
    hasError: Boolean - `true` if this field has an error.
    errorMessage: String - The error message associated with this field.
    onChange: Function - The callback to be called when the value of the field changes.
  }) => ({
    thisKeyMatchesAPropForYourComponent: thisIsAValueForThatProp,
    ...
  }),

  password: ({
    hint: String - The label for the password field.
    value: String - The value typed into the password field.
    hasError: Boolean - `true` if this field has an error.
    errorMessage: String - The error message associated with this field.
    password: Boolean - `true`.
    onChange: Function - The callback to be called when the value of the field changes.
  }) => ({
    thisKeyMatchesAPropForYourComponent: thisIsAValueForThatProp,
    ...
  }),

  confirmPassword: ({
    hint: String - The label for the confirm password field.
    value: String - The value typed into the confirm password field.
    hasError: Boolean - `true` if this field has an error.
    errorMessage: String - The error message associated with this field.
    password: Boolean - `true`.
    onChange: Function - The callback to be called when the value of the field changes.
  }) => ({
    thisKeyMatchesAPropForYourComponent: thisIsAValueForThatProp,
    ...
  }),

  submit: ({
    label: String - The label to show in the button
    onClick: Function - The callback to be called when the submit button is clicked.
  }) => ({
    thisKeyMatchesAPropForYourComponent: thisIsAValueForThatProp,
    ...
  })
}}
```

See the [`Form.adapters` prop's docs](https://github.com/Berzeg/super-formal-form#adapters-prop) for more information.

### <a id="signupForm-state"></a> `state` prop

`{Object<String, Object<String, Any>>}` - optional - Any additional state values to be passed as props to the fields in the form. Do not pass callbacks to the fields through the `state` prop. Use the `reactions` prop for that instead.

See the [`Form.state` prop's docs](https://github.com/Berzeg/super-formal-form#state-prop) for more information.

### <a id="signupForm-reactions"></a> `reactions` prop

`{Object<String, Object<String, Function | Array<Function> | ChainReaction>>}` - optional - Any additional callback values to be passed as props to the fields in the form. Do not pass state props to the fields through the `reactions` prop. Use the `state` prop for that instead.

See the [`Form.reactions` prop's docs](https://github.com/Berzeg/super-formal-form#reactions-prop) for more information.

### <a id="signupForm-onSubmitClick"></a> `onSubmitClick` prop

`{Function}` - optional - A callback to call when the `submit` button is clicked. It has the following signature:

```
(username, email, password) => {
  // sign the user up
}
```

Note that the username parameter will be removed from the signature if the `hideUserIDField` is set to `true`, and the email parameter will removed from the signature if the `hideEmailField` is set to `true`.

### <a id="signupForm-userIDLabel"></a> `userIDLabel` prop

`{String}` - optional - The label (hint) to show for the `userID` field. Defaults to `"Username"`.

### <a id="signupForm-submitLabel"></a> `submitLabel` prop

`{String}` - optional - The label to show on the `submit` button. Defaults to `"Sign Up"`.

### <a id="signupForm-showErrorMesssagesAtTop"></a> `showErrorMesssagesAtTop` prop

`{Boolean}` - optional - Defualts to `false`. `true` if you want to show all errors at the top of the form. Otherwise, each error will be displayed under its respective field.

### <a id="signupForm-hideUserIDField"></a> `hideUserIDField` prop

`{Boolean}` - optional - Defaults to `false`. If `true` this removes the `userID` field from the structure of this `Form`. Use this if the user accounts in your app/service only require an email and a password for users to join.

### <a id="signupForm-hideEmailField"></a> `hideEmailField` prop

`{Boolean}` - optional - Defaults to `false`. If `true` this removes the `email` field from the structure of this `Form`. Use this if the user accounts in your app/service only require a username and a password for users to join.

### <a id="signupForm-dontValidateFieldsBeforeSending"></a> `dontValidateFieldsBeforeSending` prop

`{Boolean}` - optional - Defualts to `false`. `true` if you don't want the form to validate the inputs before sending. They are validated by default. The validation simply verifies that the `userID`, `email`, `password`, and `confirmPassword` fields are not empty. It also verifies that the `email` value has a valid email format. It also verifies that the `password` and `confirmPassword` values are the same.

### <a id="signupForm-validateUserIDAfterXSecondsOfTyping"></a> `validateUserIDAfterXSecondsOfTyping` prop

`{Number}` - optional - Defaults to `undefined`. Set to a positive integer to indicate how many seconds after the user changes the value for the `username` field (or the `email` field if `hideUserIDField` is set to `true`). If the user changes the value again before the specified number of seconds had passed then the validation will be delayed further. After the specified time passes without interruption then the callback in the `onValidateUserID` prop is called.

### <a id="signupForm-onValidateUserID"></a> `onValidateUserID` prop

`{Function}` - optional - Defaults to `undefined` - Set to a callback function with the signature `(userIDValue as String) => {// verify that user ID is valid / available}`. This callback is called once the the `username` value changes (or the `email` value if `hideUserIDField` is set to `true`), see the description for the `validateUserIDAfterXSecondsOfTyping` prop. You are supposed to verify whether the userID is valid and available, and raise the `showUserIdAlreadyInUseError` flag otherwise.

### <a id="signupForm-showUserIdAlreadyInUseError"></a> `showUserIdAlreadyInUseError` prop

`{Boolean}` - optional - Defaults to `false`. If `true` then an error message will be passed to the form saying tha that the entered userID is not available.

## The `ForgotPasswordForm` Component

The `ForgotPasswordForm` is a `Form` with the following structure:

```
[
  {type: "text", id: "username"},
  {type: "text", id: "email"},
  {type: "button", id: "submit"}
]
```

It also has the implicit structural component `{type: "form", id: "form"}`.

### <a id="forgotPasswordForm-builders"></a> `builders` prop

`{Object<type: String, id: String>}` - required - The builders (React components) to use when building each of the structural components of the form. You should at least provide the following builders:

```
{
  text: *your Text component*,
  button: *your Button component*
}
```

See the [`Form.builders` prop's docs](https://github.com/Berzeg/super-formal-form#builders-prop) for more information.

### <a id="forgotPasswordForm-adapters"></a> `adapters` prop

`{Object<String, Function>}` - optional - The adapters that modify the state provided by the form to each of your components. By default an identity function is used as an adapter for each field in the form. This means the state and reactions are passed from the Form to the components as props without modifications. Here's a template you can use for the login form adapters:

```
adapters={{
  form: ({
    errorMessages: Array<String> - A list of error messages to display at the top of the form.
    successMessages: Array<String> - A list of success messages to display at the top of the form.
  }) => ({
    thisKeyMatchesAPropForYourComponent: thisIsAValueForThatProp,
    ...
  }),

  username: ({
    hint: String - The label for the username field.
    value: String - The value typed into the username field.
    hasError: Boolean - `true` if this field has an error.
    errorMessage: String - The error message associated with this field.
    onChange: Function - The callback to be called when the value of the field changes.
  }) => ({
    thisKeyMatchesAPropForYourComponent: thisIsAValueForThatProp,
    ...
  }),

  email: ({
    hint: String - The label for the email field.
    value: String - The value typed into the email field.
    hasError: Boolean - `true` if this field has an error.
    errorMessage: String - The error message associated with this field.
    onChange: Function - The callback to be called when the value of the field changes.
  }) => ({
    thisKeyMatchesAPropForYourComponent: thisIsAValueForThatProp,
    ...
  }),

  submit: ({
    label: String - The label to show in the button
    onClick: Function - The callback to be called when the submit button is clicked.
  }) => ({
    thisKeyMatchesAPropForYourComponent: thisIsAValueForThatProp,
    ...
  })
}}
```

See the [`Form.adapters` prop's docs](https://github.com/Berzeg/super-formal-form#adapters-prop) for more information.

### <a id="forgotPasswordForm-state"></a> `state` prop

`{Object<String, Object<String, Any>>}` - optional - Any additional state values to be passed as props to the fields in the form. Do not pass callbacks to the fields through the `state` prop. Use the `reactions` prop for that instead.

See the [`Form.state` prop's docs](https://github.com/Berzeg/super-formal-form#state-prop) for more information.

### <a id="forgotPasswordForm-reactions"></a> `reactions` prop

`{Object<String, Object<String, Function | Array<Function> | ChainReaction>>}` - optional - Any additional callback values to be passed as props to the fields in the form. Do not pass state props to the fields through the `reactions` prop. Use the `state` prop for that instead.

See the [`Form.reactions` prop's docs](https://github.com/Berzeg/super-formal-form#reactions-prop) for more information.

### <a id="forgotPasswordForm-onSubmitClick"></a> `onSubmitClick` prop

`{Function}` - optional - A callback to call when the `submit` button is clicked. It has the following signature:

```
(username, email) => {// start the reset password procedure for this user}
```

Note that the username parameter will be removed from the signature if the `hideUserIDField` is set to `true`, and the email parameter will be removed from the signature if the `hideEmailField` is set to `true`.

### <a id="forgotPasswordForm-userIDLabel"></a> `userIDLabel` prop

`{String}` - optional - The label (hint) to show for the `username` field. Defaults to `"Username"`.

### <a id="forgotPasswordForm-submitLabel"></a> `submitLabel` prop

`{String}` - optional - The label to show on the `submit` button. Defaults to `"Request Token"`.

### <a id="forgotPasswordForm-showErrorMesssagesAtTop"></a> `showErrorMesssagesAtTop` prop

`{Boolean}` - optional - Defualts to `false`. `true` if you want to show all errors at the top of the form. Otherwise, each error will be displayed under its respective field.

### <a id="forgotPasswordForm-dontValidateFieldsBeforeSending"></a> `dontValidateFieldsBeforeSending` prop

`{Boolean}` - optional - Defualts to `false`. `true` if you don't want the form to validate the inputs before sending. They are validated by default. The validation simply verifies that the `username` and `email` fields are not empty.

### <a id="forgotPasswordForm-showResetTokenHasBeenSentSuccess"></a> `showResetTokenHasBeenSentSuccess` prop

`{Boolean}` - optional - Defaults to `false`. `true` if you want to show a message at the top of the form informing the user that the reset token has been successfully sent to their email account.

### <a id="forgotPasswordForm-resetTokenHasBeenSentMessage"></a> `resetTokenHasBeenSentMessage` prop

`{String}` - optional - Defaults to `"A reset token has been sent to your email account"`. You can set this value to a different message to show to the user. This mesasge is displayed at the top of the form when the `showResetTokenHasBeenSentSuccess` prop is set to `true`.

### <a id="forgotPasswordForm-hideUserIDField"></a> `hideUserIDField` prop

`{Boolean}` - optional - Defaults to `false`. If `true` then the `userID` field is removed from the structure of this `Form`. Use this if the user accounts in your app/service only require an email and a password for users to join.

### <a id="forgotPasswordForm-hideEmailField"></a> `hideEmailField` prop

`{Boolean}` - optional - Defaults to `false`. If `true` then the `email` field is removed from the structure of this `Form`.

## The `ResetPasswordForm` Component

The `ResetPasswordForm` is a `Form` with the following structure:

```
[
  {type: "text", id: "userID"},
  {type: "text", id: "token"},
  {type: "text", id: "password"},
  {type: "text", id: "confirmPassword"},
  {type: "button", id: "submit"},
]
```

It also has the implicit structural component `{type: "form", id: "form"}`.

### <a id="resetPasswordForm-builders"></a> `builders` prop

`{Object<type: String, id: String>}` - required - The builders (React components) to use when building each of the structural components of the form. You should at least provide the following builders:

```
{
  text: *your Text component*,
  button: *your Button component*
}
```

See the [`Form.builders` prop's docs](https://github.com/Berzeg/super-formal-form#builders-prop) for more information.

### <a id="resetPasswordForm-adapters"></a> `adapters` prop

`{Object<String, Function>}` - optional - The adapters that modify the state provided by the form to each of your components. By default an identity function is used as an adapter for each field in the form. This means the state and reactions are passed from the Form to the components as props without modifications. Here's a template you can use for the login form adapters:

```
adapters={{
  form: ({
    errorMessages: Array<String> - A list of error messages to display at the top of the form.
  }) => ({
    thisKeyMatchesAPropForYourComponent: thisIsAValueForThatProp,
    ...
  }),

  userID: ({
    hint: String - The label for the userID field.
    value: String - The value typed into the userID field.
    hasError: Boolean - `true` if this field has an error.
    errorMessage: String - The error message associated with this field.
    onChange: Function - The callback to be called when the value of the field changes.
  }) => ({
    thisKeyMatchesAPropForYourComponent: thisIsAValueForThatProp,
    ...
  }),

  token: ({
    hint: String - The label for the token field.
    value: String - The value typed into the token field.
    hasError: Boolean - `true` if this field has an error.
    errorMessage: String - The error message associated with this field.
    onChange: Function - The callback to be called when the value of the field changes.
  }) => ({
    thisKeyMatchesAPropForYourComponent: thisIsAValueForThatProp,
    ...
  }),

  password: ({
    hint: String - The label for the password field.
    value: String - The value typed into the password field.
    hasError: Boolean - `true` if this field has an error.
    errorMessage: String - The error message associated with this field.
    password: Boolean - `true`.
    onChange: Function - The callback to be called when the value of the field changes.
  }) => ({
    thisKeyMatchesAPropForYourComponent: thisIsAValueForThatProp,
    ...
  }),

  confirmPassword: ({
    hint: String - The label for the confirm password field.
    value: String - The value typed into the confirm password field.
    hasError: Boolean - `true` if this field has an error.
    errorMessage: String - The error message associated with this field.
    password: Boolean - `true`.
    onChange: Function - The callback to be called when the value of the field changes.
  }) => ({
    thisKeyMatchesAPropForYourComponent: thisIsAValueForThatProp,
    ...
  }),

  submit: ({
    label: String - The label to show in the button
    onClick: Function - The callback to be called when the submit button is clicked.
  }) => ({
    thisKeyMatchesAPropForYourComponent: thisIsAValueForThatProp,
    ...
  })
}}
```

See the [`Form.adapters` prop's docs](https://github.com/Berzeg/super-formal-form#adapters-prop) for more information.

### <a id="resetPasswordForm-state"></a> `state` prop

`{Object<String, Object<String, Any>>}` - optional - Any additional state values to be passed as props to the fields in the form. Do not pass callbacks to the fields through the `state` prop. Use the `reactions` prop for that instead.

See the [`Form.state` prop's docs](https://github.com/Berzeg/super-formal-form#state-prop) for more information.

### <a id="resetPasswordForm-reactions"></a> `reactions` prop

`{Object<String, Object<String, Function | Array<Function> | ChainReaction>>}` - optional - Any additional callback values to be passed as props to the fields in the form. Do not pass state props to the fields through the `reactions` prop. Use the `state` prop for that instead.

See the [`Form.reactions` prop's docs](https://github.com/Berzeg/super-formal-form#reactions-prop) for more information.

### <a id="resetPasswordForm-onSubmitClick"></a> `onSubmitClick` prop

`{Function}` - optional - A callback to call when the `submit` button is clicked. It has the following signature:

```
(username, token, password) => {
  // reset the user's password
}
```

### <a id="resetPasswordForm-userIDLabel"></a> `userIDLabel` prop

`{String}` - optional - The label (hint) to show for the `userID` field. Defaults to `"Username"`.

### <a id="resetPasswordForm-submitLabel"></a> `submitLabel` prop

`{String}` - optional - The label to show on the `submit` button. Defaults to `"Reset Password"`.

### <a id="resetPasswordForm-showErrorMesssagesAtTop"></a> `showErrorMesssagesAtTop` prop

`{Boolean}` - optional - Defualts to `false`. `true` if you want to show all errors at the top of the form. Otherwise, each error will be displayed under its respective field.

### <a id="resetPasswordForm-dontValidateFieldsBeforeSending"></a> `dontValidateFieldsBeforeSending` prop

`{Boolean}` - optional - Defualts to `false`. `true` if you don't want the form to validate the inputs before sending. They are validated by default. The validation verifies that the `userID`, `token`, `password`, and `confirmPassword` fields are not empty. Then it verifies that the values for the `password` and `confirmPassword` fields match.

### <a id="resetPasswordForm-showPasswordHasBeenChangedSuccess"></a> `showPasswordHasBeenChangedSuccess` prop

`{Boolean}` - optional - Defaults to `false`. `true` if you want to show a message at the top of the form informing the user that the password to their account as been successfully reset.

### <a id="resetPasswordForm-passwordHasBeenChangedMessage"></a> `passwordHasBeenChangedMessage` prop

`{String}` - optional - Defaults to `"Your password has been successfully updated."`. You can set this value to a different message to show to the user. This mesasge is displayed at the top of the form when the `showPasswordHasBeenChangedSuccess` prop is set to `true`.

### <a id="resetPasswordForm-showInvalidUsernameOrTokenError"></a> `showInvalidUsernameOrTokenError` prop

`{Boolean}` - optional - Defaults to `false`. `true` if you want to show an error message at the top of the form informing the user that the provided `username` or the `token` values are invalid. You should set this to `true` if the backend fails to validate the reset token for the user.

### <a id="resetPasswordForm-invalidUsernameOrTokenMessage"></a> `invalidUsernameOrTokenMessage` prop

`{String}` - optional - Defaults to `"The provided username and token are invalid. Password has not been reset."`. You can set this value to a different message to show to the user. This mesasge is displayed at the top of the form when the `showInvalidUsernameOrTokenError` prop is set to `true`.
