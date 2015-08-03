"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _yeomanGenerator = require('yeoman-generator');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _yosay = require('yosay');

var _yosay2 = _interopRequireDefault(_yosay);

var _generator = require('./generator');

var _generator2 = _interopRequireDefault(_generator);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var AngularJSModule = (function (_Base) {
  _inherits(AngularJSModule, _Base);

  function AngularJSModule(args, options, config) {
    _classCallCheck(this, AngularJSModule);

    _get(Object.getPrototypeOf(AngularJSModule.prototype), 'constructor', this).call(this, args, options, config);
    this.yosay = _yosay2['default'];
    this.chalk = _chalk2['default'];

    this.gen = new _generator2['default']();
  }

  _createClass(AngularJSModule, [{
    key: 'initializing',
    value: function initializing() {
      this.pkg = require('../package.json');
    }
  }, {
    key: 'prompting',
    value: function prompting() {
      this.gen.sayHello.call(this);
    }
  }, {
    key: 'writing',
    value: function writing() {
      var _variables = {
        app: this.appName,
        username: this.githubUsername,
        email: this.email,
        repository: this.githubRepository,
        compileStyles: this.compileStyles,
        main: this.compileStyles ? ["dist/" + this.appName.toLowerCase() + ".min.js", "dist/" + this.appName.toLowerCase() + ".min.css"] : "dist/" + this.appName.toLowerCase() + ".min.js"
      };
      _variables.main = JSON.stringify(_variables.main);

      this.template('src/_app.js', 'src/' + this.appName.toLowerCase() + '.js', _variables);
      this.template('tests/_app_test.js', 'tests/' + this.appName.toLowerCase() + '_test.js', _variables);
      if (this.compileStyles) {
        this.template('src/_app.css', 'src/' + this.appName.toLowerCase() + '.css', _variables);
      }

      this.template('_package.json', 'package.json', _variables);

      this.template('_bower.json', 'bower.json', _variables);
      this.template('README.md', 'README.md', _variables);

      this.template('gulpfile.js', 'gulpfile.js', _variables);
      this.template('karma.conf.js', 'karma.conf.js', _variables);

      this.fs.copy(this.templatePath('_.travis.yml'), this.destinationPath('.travis.yml'));
      this.fs.copy(this.templatePath('_.gitignore'), this.destinationPath('.gitignore'));
      this.fs.copy(this.templatePath('_editorconfig'), this.destinationPath('.editorconfig'));
      this.fs.copy(this.templatePath('_jshintrc'), this.destinationPath('.jshintrc'));
    }
  }, {
    key: 'install',
    value: function install() {
      this.installDependencies({ skipInstall: this.options['skip-install'] });
    }
  }, {
    key: 'prompUser',
    value: function prompUser() {
      var done = this.async();

      var prompts = [{
        type: 'input',
        name: 'appName',
        message: 'What is the name of your app?',
        'default': _lodash2['default'].camelCase(this.appname)
      }, {
        type: 'input',
        name: 'githubRepository',
        message: 'What is your repository name on Github?',
        'default': this.appname.toLowerCase()
      }, {
        type: 'input',
        name: 'githubUsername',
        message: 'What is your username on Github?'
      }, {
        type: 'input',
        name: 'email',
        message: 'What is your email?'
      }, {
        type: 'confirm',
        name: 'compileStyles',
        message: 'Are you using css with your module?',
        'default': false
      }];

      this.prompt(prompts, (function (props) {
        this.appName = props.appName;
        this.githubRepository = props.githubRepository;
        this.githubUsername = props.githubUsername;
        this.email = props.email;
        this.compileStyles = props.compileStyles;

        done();
      }).bind(this));
    }
  }]);

  return AngularJSModule;
})(_yeomanGenerator.Base);

exports['default'] = AngularJSModule;
module.exports = exports['default'];