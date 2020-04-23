'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var PropTypes = _interopDefault(require('prop-types'));
var Form = _interopDefault(require('@super-formal/form'));
var ChainReaction = require('@super-formal/chain-reaction');
var ChainReaction__default = _interopDefault(ChainReaction);

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (_isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o) {
  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) {
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var it,
      normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function assignWithJoin(objectA, objectB, join) {
  if (objectB && objectB.entries) {
    var _iterator = _createForOfIteratorHelper(objectB.entries),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _slicedToArray(_step.value, 2),
            key = _step$value[0],
            valueB = _step$value[1];

        if (objectA.hasOwnProperty(key)) {
          var valueA = objectA[key];
          objectA[key] = join(valueA, valueB);
        } else {
          objectA[key] = valueB;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  return objectA;
} // from https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#Validation

function isValidEmail(email) {
  var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  var matches = email.match(regex);
  return matches && matches.length > 0;
}

var LoginForm = /*#__PURE__*/function (_React$Component) {
  _inherits(LoginForm, _React$Component);

  var _super = _createSuper(LoginForm);

  function LoginForm(props) {
    var _this;

    _classCallCheck(this, LoginForm);

    _this = _super.call(this, props);
    _this.state = {
      userIDFieldValue: '',
      userIDFieldHasError: false,
      userIDFieldErrorMessage: "",
      passwordFieldValue: '',
      passwordFieldHasError: false,
      passwordFieldErrorMessage: ""
    };
    _this.copyValueToState = _this.copyValueToState.bind(_assertThisInitialized(_this));
    _this.validateFieldsBeforeSending = _this.validateFieldsBeforeSending.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(LoginForm, [{
    key: "copyValueToState",
    value: function copyValueToState(stateFieldID) {
      var _this2 = this;

      return function (event) {
        if (event && event.target) {
          _this2.setState(_defineProperty({}, stateFieldID, event.target.value));
        }
      };
    }
  }, {
    key: "validateFieldsBeforeSending",
    value: function validateFieldsBeforeSending() {
      var result = undefined;

      if (this.state.userIDFieldValue.trim().length === 0) {
        this.setState({
          userIDFieldHasError: true,
          userIDFieldErrorMessage: "'".concat(this.props.userIDLabel, "' field can't be empty")
        });
        result = ChainReaction.result(false);
      } else {
        this.setState({
          userIDFieldHasError: false,
          userIDFieldErrorMessage: undefined
        });
      }

      if (this.state.passwordFieldValue.trim().length === 0) {
        this.setState({
          passwordFieldHasError: true,
          passwordFieldErrorMessage: "'Password' field can't be empty"
        });
        result = ChainReaction.result(false);
      } else {
        this.setState({
          passwordFieldHasError: false,
          passwordFieldErrorMessage: undefined
        });
      }

      return result;
    }
  }, {
    key: "render",
    value: function render() {
      var submitButtonState = {
        label: this.props.submitLabel
      };
      return /*#__PURE__*/React.createElement(Form, {
        structure: [{
          type: 'text',
          id: 'userID'
        }, {
          type: 'text',
          id: 'password'
        }, {
          type: 'button',
          id: 'submit'
        }],
        builders: this.props.builders,
        adapters: this.props.adapters,
        state: _objectSpread2({
          form: this.formState,
          userID: this.userFieldState,
          password: this.passwordFieldState,
          submit: submitButtonState
        }, this.props.state),
        reactions: _objectSpread2({
          userID: this.userReactions,
          password: this.passwordReactions,
          submit: this.submitReactions
        }, this.props.reactions)
      });
    }
  }, {
    key: "formState",
    get: function get() {
      var formState = {};

      if (this.props.showErrorMesssagesAtTop) {
        var errorMessages = [];

        if (this.state.userIDFieldHasError) {
          errorMessages.push(this.state.userIDFieldErrorMessage);
        }

        if (this.state.passwordFieldHasError) {
          errorMessages.push(this.state.passwordFieldErrorMessage);
        }

        formState.errorMessages = errorMessages;
      }

      if (this.props.showMismatchingUserAndPasswordError) {
        var userIDLabelLowercase = this.props.userIDLabel.toLowerCase();
        var errorMessage = "Mismatching ".concat(userIDLabelLowercase, " and password");

        if (formState.errorMessages) {
          formState.errorMessages.push(errorMessage);
        } else {
          formState.errorMessages = [errorMessage];
        }
      }

      return formState;
    }
  }, {
    key: "userFieldState",
    get: function get() {
      var state = {
        hint: this.props.userIDLabel,
        value: this.state.userIDFieldValue,
        hasError: this.state.userIDFieldHasError
      };

      if (state.hasError && !this.props.showErrorMesssagesAtTop) {
        state.errorMessage = this.state.userIDFieldErrorMessage;
      }

      return state;
    }
  }, {
    key: "passwordFieldState",
    get: function get() {
      var state = {
        hint: 'Password',
        value: this.state.passwordFieldValue,
        password: true,
        hasError: this.state.passwordFieldHasError
      };

      if (state.hasError && !this.props.showErrorMesssagesAtTop) {
        state.errorMessage = this.state.passwordFieldErrorMessage;
      }

      return state;
    }
  }, {
    key: "userReactions",
    get: function get() {
      var onChangeReaction = new ChainReaction__default();
      onChangeReaction.pushCallback(this.copyValueToState("userIDFieldValue"));
      var reactions = {
        onChange: onChangeReaction
      };
      return assignWithJoin(reactions, this.props.reactions.userID, ChainReaction.joinReactions);
    }
  }, {
    key: "passwordReactions",
    get: function get() {
      var onChangeReaction = new ChainReaction__default();
      onChangeReaction.pushCallback(this.copyValueToState("passwordFieldValue"));
      var reactions = {
        onChange: onChangeReaction
      };
      return assignWithJoin(reactions, this.props.reactions.password, ChainReaction.joinReactions);
    }
  }, {
    key: "submitReactions",
    get: function get() {
      var _this3 = this;

      var submitOnClickReactionCallbacks = [];

      if (!this.props.dontValidateFieldAreEmpty) {
        submitOnClickReactionCallbacks.push(this.validateFieldsBeforeSending);
      }

      if (this.props.onSubmitClick) {
        var onSubmitClick = function onSubmitClick() {
          _this3.props.onSubmitClick(_this3.state.userIDFieldValue, _this3.state.passwordFieldValue);
        };

        submitOnClickReactionCallbacks.push(onSubmitClick);
      }

      var defaultSubmitReactions = {
        onClick: ChainReaction__default.fromList(submitOnClickReactionCallbacks)
      };
      return assignWithJoin(defaultSubmitReactions, this.props.reactions.submit, ChainReaction.joinReactions);
    }
  }]);

  return LoginForm;
}(React.Component);

LoginForm.propTypes = {
  builders: PropTypes.object.isRequired,
  adapters: PropTypes.object,
  state: PropTypes.object,
  reactions: PropTypes.objectOf(PropTypes.objectOf(ChainReaction__default)),
  onSubmitClick: PropTypes.func,
  userIDLabel: PropTypes.oneOf(['Username', 'Email']),
  submitLabel: PropTypes.oneOf(['Submit', 'Log In']),
  showErrorMesssagesAtTop: PropTypes.bool,
  showMismatchingUserAndPasswordError: PropTypes.bool,
  dontValidateFieldAreEmpty: PropTypes.bool
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
  dontValidateFieldAreEmpty: false
};

var SignupForm = /*#__PURE__*/function (_React$Component) {
  _inherits(SignupForm, _React$Component);

  var _super = _createSuper(SignupForm);

  function SignupForm(props) {
    var _this;

    _classCallCheck(this, SignupForm);

    _this = _super.call(this, props);
    _this.state = {
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
      confirmPasswordFieldErrorMessage: undefined
    };
    _this.validateUserIDAvailabilityTimer = undefined;
    _this.copyValueToState = _this.copyValueToState.bind(_assertThisInitialized(_this));
    _this.validateFieldsBeforeSending = _this.validateFieldsBeforeSending.bind(_assertThisInitialized(_this));
    _this.validateUserIDAvailabilityWithTimer = _this.validateUserIDAvailabilityWithTimer.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SignupForm, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.validateUserIDAvailabilityTimer) {
        clearTimeout(this.validateUserIDAvailabilityTimer);
        this.validateUserIDAvailabilityTimer = undefined;
      }
    }
  }, {
    key: "copyValueToState",
    value: function copyValueToState(stateFieldID) {
      var _this2 = this;

      return function (event) {
        if (event && event.target) {
          _this2.setState(_defineProperty({}, stateFieldID, event.target.value));
        }
      };
    }
  }, {
    key: "validateFieldsBeforeSending",
    value: function validateFieldsBeforeSending() {
      var result = undefined;

      if (!this.props.hideUserIDField && this.state.userIDFieldValue.trim() === "") {
        this.setState({
          userIDFieldHasError: true,
          userIDFieldErrorMessage: "'".concat(this.props.userIDLabel, "' field can't be empty")
        });
        result = ChainReaction.result(false);
      } else {
        this.setState({
          userIDFieldHasError: false,
          userIDFieldErrorMessage: undefined
        });
      }

      if (!this.props.hideEmailField && this.state.emailFieldValue.trim() === "") {
        this.setState({
          emailFieldHasError: true,
          emailFieldErrorMessage: "'Email' field can't be empty"
        });
        result = ChainReaction.result(false);
      } else if (!this.props.hideEmailField && !isValidEmail(this.state.emailFieldValue)) {
        this.setState({
          emailFieldHasError: true,
          emailFieldErrorMessage: "The provided email has an invalid format"
        });
        result = ChainReaction.result(false);
      } else {
        this.setState({
          emailFieldHasError: false,
          emailFieldErrorMessage: undefined
        });
      }

      if (this.state.passwordFieldValue.trim() === "") {
        this.setState({
          passwordFieldHasError: true,
          passwordFieldErrorMessage: "'Password' field can't be empty"
        });
        result = ChainReaction.result(false);
      } else if (this.state.passwordFieldValue !== this.state.confirmPasswordFieldValue) {
        this.setState({
          passwordFieldHasError: true,
          passwordFieldErrorMessage: "'Password' and 'Confirm Password' field values are mismatching. They must be the same."
        });
        result = ChainReaction.result(false);
      } else {
        this.setState({
          passwordFieldHasError: false,
          passwordFieldErrorMessage: undefined
        });
      }

      if (this.state.confirmPasswordFieldValue.trim() === "") {
        this.setState({
          confirmPasswordFieldHasError: true,
          confirmPasswordFieldErrorMessage: "'Confirm Password' field can't be empty"
        });
        result = ChainReaction.result(false);
      } else if (this.state.passwordFieldValue !== this.state.confirmPasswordFieldValue) {
        this.setState({
          confirmPasswordFieldHasError: true,
          confirmPasswordFieldErrorMessage: undefined
        });
        result = ChainReaction.result(false);
      } else {
        this.setState({
          confirmPasswordFieldHasError: false,
          confirmPasswordFieldErrorMessage: undefined
        });
      }

      return result;
    }
  }, {
    key: "validateUserIDAvailabilityWithTimer",
    value: function validateUserIDAvailabilityWithTimer() {
      var _this3 = this;

      if (this.validateUserIDAvailabilityTimer) {
        clearTimeout(this.validateUserIDAvailabilityTimer);
        this.validateUserIDAvailabilityTimer = undefined;
      }

      var userID = this.props.hideUserIDField ? this.state.emailFieldValue : this.state.userIDFieldValue;

      if (userID.trim() === "") {
        return;
      }

      if (this.props.validateUserIDAfterXSecondsOfTyping) {
        this.validateUserIDAvailabilityTimer = setTimeout(function () {
          _this3.validateUserIDAvailabilityTimer = undefined;

          if (_this3.props.onValidateUserID) {
            _this3.props.onValidateUserID(userID);
          }
        }, this.props.validateUserIDAfterXSecondsOfTyping * 1000);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(Form, {
        structure: this.structure,
        builders: this.props.builders,
        adapters: this.props.adapters,
        state: _objectSpread2({
          form: this.formState,
          username: this.usernameFieldState,
          email: this.emailFieldState,
          password: this.passwordFieldState,
          confirmPassword: this.confirmPasswordFieldState,
          submit: this.submitButtonState
        }, this.props.state),
        reactions: _objectSpread2({
          username: this.usernameReactions,
          email: this.emailReactions,
          password: this.passwordReactions,
          confirmPassword: this.confirmPasswordReactions,
          submit: this.submitReactions
        }, this.props.reactions)
      });
    }
  }, {
    key: "structure",
    get: function get() {
      var structure = [];

      if (!this.props.hideUserIDField) {
        structure.push({
          type: 'text',
          id: 'username'
        });
      }

      if (!this.props.hideEmailField) {
        structure.push({
          type: 'text',
          id: 'email'
        });
      }

      structure = structure.concat([{
        type: 'text',
        id: 'password'
      }, {
        type: 'text',
        id: 'confirmPassword'
      }, {
        type: 'button',
        id: 'submit'
      }]);
      return structure;
    }
  }, {
    key: "formState",
    get: function get() {
      var formState = {};

      if (this.props.showErrorMesssagesAtTop) {
        var errorMessages = [];

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
        var userIDLabel = this.props.hideUserIDField ? 'Email' : this.props.userIDLabel;
        var errorMessage = "The ".concat(userIDLabel, " is being used by an existing account");

        if (formState.errorMessages) {
          formState.errorMessages.push(errorMessage);
        } else {
          formState.errorMessages = [errorMessage];
        }
      }

      return formState;
    }
  }, {
    key: "usernameFieldState",
    get: function get() {
      var state = {
        hint: this.props.userIDLabel,
        value: this.state.userIDFieldValue,
        hasError: this.state.userIDFieldHasError
      };

      if (state.hasError && !this.props.hideUserIDField && !this.props.showErrorMesssagesAtTop) {
        state.errorMessage = this.state.userIDFieldErrorMessage;
      }

      return state;
    }
  }, {
    key: "emailFieldState",
    get: function get() {
      var state = {
        hint: "Email",
        value: this.state.emailFieldValue,
        hasError: this.state.emailFieldHasError
      };

      if (state.hasError && !this.props.hideEmailField && !this.props.showErrorMesssagesAtTop) {
        state.errorMessage = this.state.emailFieldErrorMessage;
      }

      return state;
    }
  }, {
    key: "passwordFieldState",
    get: function get() {
      var state = {
        hint: "Password",
        value: this.state.passwordFieldValue,
        hasError: this.state.passwordFieldHasError,
        password: true
      };

      if (state.hasError && !this.props.showErrorMesssagesAtTop) {
        state.errorMessage = this.state.passwordFieldErrorMessage;
      }

      return state;
    }
  }, {
    key: "confirmPasswordFieldState",
    get: function get() {
      var state = {
        hint: "Confirm Password",
        value: this.state.confirmPasswordFieldValue,
        hasError: this.state.confirmPasswordFieldHasError,
        password: true
      };

      if (state.hasError && !this.props.showErrorMesssagesAtTop) {
        state.errorMessage = this.state.confirmPasswordFieldErrorMessage;
      }

      return state;
    }
  }, {
    key: "submitButtonState",
    get: function get() {
      return {
        label: this.props.submitLabel
      };
    }
  }, {
    key: "usernameReactions",
    get: function get() {
      var onChangeReaction = ChainReaction__default.fromList([this.copyValueToState("userIDFieldValue"), this.validateUserIDAvailabilityWithTimer]);
      var reactions = {
        onChange: onChangeReaction
      };
      return assignWithJoin(reactions, this.props.reactions.username, ChainReaction.joinReactions);
    }
  }, {
    key: "emailReactions",
    get: function get() {
      var _this4 = this;

      var onChangeReaction = new ChainReaction__default();
      onChangeReaction.pushCallback(this.copyValueToState("emailFieldValue"));
      onChangeReaction.pushCallback(function () {
        if (_this4.props.hideUserIDField) {
          _this4.validateUserIDAvailabilityWithTimer();
        }
      });
      var reactions = {
        onChange: onChangeReaction
      };
      return assignWithJoin(reactions, this.props.reactions.email, ChainReaction.joinReactions);
    }
  }, {
    key: "passwordReactions",
    get: function get() {
      var onChangeReaction = new ChainReaction__default();
      onChangeReaction.pushCallback(this.copyValueToState("passwordFieldValue"));
      var reactions = {
        onChange: onChangeReaction
      };
      return assignWithJoin(reactions, this.props.reactions.password, ChainReaction.joinReactions);
    }
  }, {
    key: "confirmPasswordReactions",
    get: function get() {
      var onChangeReaction = new ChainReaction__default();
      onChangeReaction.pushCallback(this.copyValueToState("confirmPasswordFieldValue"));
      var reactions = {
        onChange: onChangeReaction
      };
      return assignWithJoin(reactions, this.props.reactions.password, ChainReaction.joinReactions);
    }
  }, {
    key: "submitReactions",
    get: function get() {
      var _this5 = this;

      var submitOnClickReactionCallbacks = [];

      if (!this.props.dontValidateFieldsBeforeSending) {
        submitOnClickReactionCallbacks.push(this.validateFieldsBeforeSending);
      }

      if (this.props.onSubmitClick) {
        var onSubmitClick = function onSubmitClick() {
          var _this5$props;

          var args = [];

          if (!_this5.props.hideUserIDField) {
            args.push(_this5.state.userIDFieldValue);
          }

          if (!_this5.props.hideEmailField) {
            args.push(_this5.state.emailFieldValue);
          }

          args.push(_this5.state.passwordFieldValue);

          (_this5$props = _this5.props).onSubmitClick.apply(_this5$props, args);
        };

        submitOnClickReactionCallbacks.push(onSubmitClick);
      }

      var defaultSubmitReactions = {
        onClick: ChainReaction__default.fromList(submitOnClickReactionCallbacks)
      };
      return assignWithJoin(defaultSubmitReactions, this.props.reactions.submit, ChainReaction.joinReactions);
    }
  }]);

  return SignupForm;
}(React.Component);

SignupForm.propTypes = {
  builders: PropTypes.object.isRequired,
  adapters: PropTypes.object,
  state: PropTypes.object,
  reactions: PropTypes.objectOf(PropTypes.objectOf(ChainReaction__default)),
  onSubmitClick: PropTypes.func,
  userIDLabel: PropTypes.oneOf(['Username', 'User', 'User Name', 'Name', 'Avatar']),
  submitLabel: PropTypes.oneOf(['Sign Up', 'Signup', 'Submit']),
  showErrorMesssagesAtTop: PropTypes.bool,
  hideUserIDField: PropTypes.bool,
  hideEmailField: PropTypes.bool,
  dontValidateFieldsBeforeSending: PropTypes.bool,
  validateUserIDAfterXSecondsOfTyping: PropTypes.number,
  onValidateUserID: PropTypes.func,
  showUserIdAlreadyInUseError: PropTypes.bool
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
  showUserIdAlreadyInUseError: false
};

var ForgotPasswordForm = /*#__PURE__*/function (_React$Component) {
  _inherits(ForgotPasswordForm, _React$Component);

  var _super = _createSuper(ForgotPasswordForm);

  function ForgotPasswordForm(props) {
    var _this;

    _classCallCheck(this, ForgotPasswordForm);

    _this = _super.call(this, props);
    _this.state = {
      userIDFieldValue: "",
      userIDFieldHasError: false,
      userIDFieldErrorMessage: undefined,
      emailFieldValue: "",
      emailFieldHasError: false,
      emailFieldErrorMessage: undefined
    };
    _this.copyValueToState = _this.copyValueToState.bind(_assertThisInitialized(_this));
    _this.validateFieldsBeforeSending = _this.validateFieldsBeforeSending.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ForgotPasswordForm, [{
    key: "copyValueToState",
    value: function copyValueToState(stateFieldID) {
      var _this2 = this;

      return function (event) {
        if (event && event.target) {
          _this2.setState(_defineProperty({}, stateFieldID, event.target.value));
        }
      };
    }
  }, {
    key: "validateFieldsBeforeSending",
    value: function validateFieldsBeforeSending() {
      var result = undefined;

      if (!this.props.hideUserIDField && this.state.userIDFieldValue.trim() === "") {
        this.setState({
          userIDFieldHasError: true,
          userIDFieldErrorMessage: "'".concat(this.props.userIDLabel, "' field can't be empty")
        });
        result = ChainReaction.result(false);
      } else {
        this.setState({
          userIDFieldHasError: false,
          userIDFieldErrorMessage: undefined
        });
      }

      if (!this.props.hideEmailField && this.state.emailFieldValue.trim() === "") {
        this.setState({
          emailFieldHasError: true,
          emailFieldErrorMessage: "'Email' field can't be empty"
        });
        result = ChainReaction.result(false);
      } else {
        this.setState({
          emailFieldHasError: false,
          emailFieldErrorMessage: undefined
        });
      }

      return result;
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(Form, {
        structure: this.structure,
        builders: this.props.builders,
        adapters: this.props.adapters,
        state: _objectSpread2({
          form: this.formState,
          username: this.usernameFieldState,
          email: this.emailFieldState,
          submit: this.submitButtonState
        }, this.props.state),
        reactions: _objectSpread2({
          username: this.usernameReactions,
          email: this.emailReactions,
          submit: this.submitReactions
        }, this.props.reactions)
      });
    }
  }, {
    key: "structure",
    get: function get() {
      var structure = [];

      if (!this.props.hideUserIDField) {
        structure.push({
          type: 'text',
          id: 'username'
        });
      }

      if (!this.props.hideEmailField) {
        structure.push({
          type: 'text',
          id: 'email'
        });
      }

      structure = structure.concat([{
        type: 'button',
        id: 'submit'
      }]);
      return structure;
    }
  }, {
    key: "formState",
    get: function get() {
      var formState = {};

      if (this.props.showErrorMesssagesAtTop) {
        var errorMessages = [];

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
  }, {
    key: "usernameFieldState",
    get: function get() {
      var state = {
        hint: this.props.userIDLabel,
        value: this.state.userIDFieldValue,
        hasError: this.state.userIDFieldHasError
      };

      if (state.hasError && !this.props.hideUserIDField && !this.props.showErrorMesssagesAtTop) {
        state.errorMessage = this.state.userIDFieldErrorMessage;
      }

      return state;
    }
  }, {
    key: "emailFieldState",
    get: function get() {
      var state = {
        hint: "Email",
        value: this.state.emailFieldValue,
        hasError: this.state.emailFieldHasError
      };

      if (state.hasError && !this.props.hideEmailField && !this.props.showErrorMesssagesAtTop) {
        state.errorMessage = this.state.emailFieldErrorMessage;
      }

      return state;
    }
  }, {
    key: "submitButtonState",
    get: function get() {
      return {
        label: this.props.submitLabel
      };
    }
  }, {
    key: "usernameReactions",
    get: function get() {
      var onChangeReaction = new ChainReaction__default();
      onChangeReaction.pushCallback(this.copyValueToState("userIDFieldValue"));
      var reactions = {
        onChange: onChangeReaction
      };
      return assignWithJoin(reactions, this.props.reactions.username, ChainReaction.joinReactions);
    }
  }, {
    key: "emailReactions",
    get: function get() {
      var onChangeReaction = new ChainReaction__default();
      onChangeReaction.pushCallback(this.copyValueToState("emailFieldValue"));
      var reactions = {
        onChange: onChangeReaction
      };
      return assignWithJoin(reactions, this.props.reactions.email, ChainReaction.joinReactions);
    }
  }, {
    key: "submitReactions",
    get: function get() {
      var _this3 = this;

      var submitOnClickReactionCallbacks = [];

      if (!this.props.dontValidateFieldsBeforeSending) {
        submitOnClickReactionCallbacks.push(this.validateFieldsBeforeSending);
      }

      if (this.props.onSubmitClick) {
        var onSubmitClick = function onSubmitClick() {
          var _this3$props;

          var args = [];

          if (!_this3.props.hideUserIDField) {
            args.push(_this3.state.userIDFieldValue);
          }

          if (!_this3.props.hideEmailField) {
            args.push(_this3.state.emailFieldValue);
          }

          (_this3$props = _this3.props).onSubmitClick.apply(_this3$props, args);
        };

        submitOnClickReactionCallbacks.push(onSubmitClick);
      }

      var reactions = {
        onClick: ChainReaction__default.fromList(submitOnClickReactionCallbacks)
      };
      return assignWithJoin(reactions, this.props.reactions.submit, ChainReaction.joinReactions);
    }
  }]);

  return ForgotPasswordForm;
}(React.Component);

ForgotPasswordForm.propTypes = {
  builders: PropTypes.object.isRequired,
  adapters: PropTypes.object,
  state: PropTypes.object,
  reactions: PropTypes.objectOf(PropTypes.objectOf(ChainReaction__default)),
  onSubmitClick: PropTypes.func,
  userIDLabel: PropTypes.oneOf(['Username', 'User', 'User Name', 'Name', 'Avatar']),
  submitLabel: PropTypes.oneOf(['Request Token', 'Request', 'Submit']),
  showErrorMesssagesAtTop: PropTypes.bool,
  showResetTokenHasBeenSentSuccess: PropTypes.bool,
  resetTokenHasBeenSentMessage: PropTypes.string,
  hideUserIDField: PropTypes.bool,
  hideEmailField: PropTypes.bool
};
ForgotPasswordForm.defaultProps = {
  adapters: {},
  state: {},
  reactions: {},
  onSubmitClick: undefined,
  userIDLabel: 'Username',
  submitLabel: 'Request Token',
  showErrorMesssagesAtTop: false,
  showResetTokenHasBeenSentSuccess: false,
  resetTokenHasBeenSentMessage: "A reset token has been sent to your email account",
  hideUserIDField: false,
  hideEmailField: false
};

var ResetPasswordForm = /*#__PURE__*/function (_React$Component) {
  _inherits(ResetPasswordForm, _React$Component);

  var _super = _createSuper(ResetPasswordForm);

  function ResetPasswordForm(props) {
    var _this;

    _classCallCheck(this, ResetPasswordForm);

    _this = _super.call(this, props);
    _this.state = {
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
      confirmPasswordFieldErrorMessage: undefined
    };
    _this.copyValueToState = _this.copyValueToState.bind(_assertThisInitialized(_this));
    _this.validateFieldsBeforeSending = _this.validateFieldsBeforeSending.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ResetPasswordForm, [{
    key: "copyValueToState",
    value: function copyValueToState(stateFieldID) {
      var _this2 = this;

      return function (event) {
        if (event && event.target) {
          _this2.setState(_defineProperty({}, stateFieldID, event.target.value));
        }
      };
    }
  }, {
    key: "validateFieldsBeforeSending",
    value: function validateFieldsBeforeSending() {
      var result = undefined;

      if (this.state.userIDFieldValue.trim() === "") {
        this.setState({
          userIDFieldHasError: true,
          userIDFieldErrorMessage: "'".concat(this.props.userIDLabel, "' field can't be empty")
        });
        result = ChainReaction.result(false);
      } else {
        this.setState({
          userIDFieldHasError: false,
          userIDFieldErrorMessage: undefined
        });
      }

      if (this.state.tokenFieldValue.trim() === "") {
        this.setState({
          tokenFieldHasError: true,
          tokenFieldErrorMessage: "'Token' field can't be empty"
        });
        result = ChainReaction.result(false);
      } else {
        this.setState({
          tokenFieldHasError: false,
          tokenFieldErrorMessage: undefined
        });
      }

      if (this.state.passwordFieldValue.trim() === "") {
        this.setState({
          passwordFieldHasError: true,
          passwordFieldErrorMessage: "'Password' field can't be empty"
        });
        result = ChainReaction.result(false);
      } else if (this.state.passwordFieldValue !== this.state.confirmPasswordFieldValue) {
        this.setState({
          passwordFieldHasError: true,
          passwordFieldErrorMessage: "'Password' and 'Confirm Password' field values are mismatching. They must be the same."
        });
        result = ChainReaction.result(false);
      } else {
        this.setState({
          passwordFieldHasError: false,
          passwordFieldErrorMessage: undefined
        });
      }

      if (this.state.confirmPasswordFieldValue.trim() === "") {
        this.setState({
          confirmPasswordFieldHasError: true,
          confirmPasswordFieldErrorMessage: "'Confirm Password' field can't be empty"
        });
        result = ChainReaction.result(false);
      } else if (this.state.passwordFieldValue !== this.state.confirmPasswordFieldValue) {
        this.setState({
          confirmPasswordFieldHasError: true,
          confirmPasswordFieldErrorMessage: undefined
        });
        result = ChainReaction.result(false);
      } else {
        this.setState({
          confirmPasswordFieldHasError: false,
          confirmPasswordFieldErrorMessage: undefined
        });
      }

      return result;
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(Form, {
        structure: [{
          type: "text",
          id: "userID"
        }, {
          type: "text",
          id: "token"
        }, {
          type: "text",
          id: "password"
        }, {
          type: "text",
          id: "confirmPassword"
        }, {
          type: "button",
          id: "submit"
        }],
        builders: this.props.builders,
        adapters: this.props.adapters,
        state: _objectSpread2({
          form: this.formState,
          userID: this.userIDFieldState,
          token: this.tokenFieldState,
          password: this.passwordFieldState,
          confirmPassword: this.confirmPasswordFieldState,
          submit: this.submitButtonState
        }, this.props.state),
        reactions: _objectSpread2({
          userID: this.userIDReactions,
          token: this.tokenReactions,
          password: this.passwordReactions,
          confirmPassword: this.confirmPasswordReactions,
          submit: this.submitReactions
        }, this.props.reactions)
      });
    }
  }, {
    key: "formState",
    get: function get() {
      var formState = {};

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
  }, {
    key: "userIDFieldState",
    get: function get() {
      var state = {
        hint: this.props.userIDLabel,
        value: this.state.userIDFieldValue,
        hasError: this.state.userIDFieldHasError
      };

      if (state.hasError && !this.props.showErrorMesssagesAtTop) {
        state.errorMessage = this.state.userIDFieldErrorMessage;
      }

      return state;
    }
  }, {
    key: "tokenFieldState",
    get: function get() {
      var state = {
        hint: "Token",
        value: this.state.tokenFieldValue,
        hasError: this.state.tokenFieldHasError
      };

      if (state.hasError && !this.props.showErrorMesssagesAtTop) {
        state.errorMessage = this.state.tokenFieldErrorMessage;
      }

      return state;
    }
  }, {
    key: "passwordFieldState",
    get: function get() {
      var state = {
        hint: "Password",
        value: this.state.passwordFieldValue,
        hasError: this.state.passwordFieldHasError,
        password: true
      };

      if (state.hasError && !this.props.showErrorMesssagesAtTop) {
        state.errorMessage = this.state.passwordFieldErrorMessage;
      }

      return state;
    }
  }, {
    key: "confirmPasswordFieldState",
    get: function get() {
      var state = {
        hint: "Confirm Password",
        value: this.state.confirmPasswordFieldValue,
        hasError: this.state.confirmPasswordFieldHasError,
        password: true
      };

      if (state.hasError && !this.props.showErrorMesssagesAtTop) {
        state.errorMessage = this.state.confirmPasswordFieldErrorMessage;
      }

      return state;
    }
  }, {
    key: "submitButtonState",
    get: function get() {
      return {
        label: this.props.submitLabel
      };
    }
  }, {
    key: "userIDReactions",
    get: function get() {
      var onChangeReaction = new ChainReaction__default();
      onChangeReaction.pushCallback(this.copyValueToState("userIDFieldValue"));
      var reactions = {
        onChange: onChangeReaction
      };
      return assignWithJoin(reactions, this.props.reactions.userID, ChainReaction.joinReactions);
    }
  }, {
    key: "tokenReactions",
    get: function get() {
      var onChangeReaction = new ChainReaction__default();
      onChangeReaction.pushCallback(this.copyValueToState("tokenFieldValue"));
      var reactions = {
        onChange: onChangeReaction
      };
      return assignWithJoin(reactions, this.props.reactions.token, ChainReaction.joinReactions);
    }
  }, {
    key: "passwordReactions",
    get: function get() {
      var onChangeReaction = new ChainReaction__default();
      onChangeReaction.pushCallback(this.copyValueToState("passwordFieldValue"));
      var reactions = {
        onChange: onChangeReaction
      };
      return assignWithJoin(reactions, this.props.reactions.password, ChainReaction.joinReactions);
    }
  }, {
    key: "confirmPasswordReactions",
    get: function get() {
      var onChangeReaction = new ChainReaction__default();
      onChangeReaction.pushCallback(this.copyValueToState("confirmPasswordFieldValue"));
      var reactions = {
        onChange: onChangeReaction
      };
      return assignWithJoin(reactions, this.props.reactions.confirmPassword, ChainReaction.joinReactions);
    }
  }, {
    key: "submitReactions",
    get: function get() {
      var _this3 = this;

      var submitOnClickReactionCallbacks = [];

      if (!this.props.dontValidateFieldsBeforeSending) {
        submitOnClickReactionCallbacks.push(this.validateFieldsBeforeSending);
      }

      if (this.props.onSubmitClick) {
        var onSubmitClick = function onSubmitClick() {
          _this3.props.onSubmitClick(_this3.state.userIDFieldValue, _this3.state.tokenFieldValue, _this3.state.passwordFieldValue);
        };

        submitOnClickReactionCallbacks.push(onSubmitClick);
      }

      var reactions = {
        onClick: ChainReaction__default.fromList(submitOnClickReactionCallbacks)
      };
      return assignWithJoin(reactions, this.props.reactions.submit, ChainReaction.joinReactions);
    }
  }]);

  return ResetPasswordForm;
}(React.Component);

ResetPasswordForm.propTypes = {
  builders: PropTypes.object.isRequired,
  adapters: PropTypes.object,
  state: PropTypes.object,
  reactions: PropTypes.objectOf(PropTypes.objectOf(ChainReaction__default)),
  onSubmitClick: PropTypes.func,
  userIDLabel: PropTypes.oneOf(['Username', 'Email', 'User', 'User Name']),
  submitLabel: PropTypes.oneOf(['Reset Password', 'Reset', 'Submit']),
  showErrorMesssagesAtTop: PropTypes.bool
};
ResetPasswordForm.defaultProps = {
  adapters: {},
  state: {},
  reactions: {},
  onSubmitClick: undefined,
  userIDLabel: 'Username',
  submitLabel: 'Reset Password',
  showErrorMesssagesAtTop: false,
  showPasswordHasBeenChangedSuccess: false,
  passwordHasBeenChangedMessage: "Your password has been successfully updated.",
  showInvalidUsernameOrTokenError: false,
  invalidUsernameOrTokenMessage: "The provided username and token are invalid. Password has not been reset."
};

module.exports = {
  LoginForm: LoginForm,
  SignupForm: SignupForm,
  ForgotPasswordForm: ForgotPasswordForm,
  ResetPasswordForm: ResetPasswordForm
};
