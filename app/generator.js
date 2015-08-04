"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Generator = (function () {
  function Generator() {
    _classCallCheck(this, Generator);
  }

  _createClass(Generator, [{
    key: "sayHello",
    value: function sayHello() {
      this.log(this.yosay("Welcome to the splendid " + this.chalk.green('AngularJS Module') + " generator!"));
    }
  }, {
    key: "copyFiles",
    value: function copyFiles() {

      var _variables = {
        app: this.appName,
        username: this.githubUsername,
        email: this.email,
        repository: this.githubRepository,
        compileStyles: this.compileStyles,
        main: this.compileStyles ? ["dist/" + this.appName.toLowerCase() + ".js", "dist/" + this.appName.toLowerCase() + ".css"] : "dist/" + this.appName.toLowerCase() + ".js"
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
    key: "installDependencies",
    value: function installDependencies() {
      this.installDependencies({ skipInstall: this.options['skip-install'] });
    }
  }, {
    key: "promptOptions",
    value: function promptOptions() {
      var done = this.async();

      var prompts = [{
        type: 'input',
        name: 'appName',
        message: 'What is the name of your app?',
        "default": this.lodash.camelCase(this.appname)
      }, {
        type: 'input',
        name: 'githubRepository',
        message: 'What is your repository name on Github?',
        "default": this.appname.toLowerCase()
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
        "default": false
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

  return Generator;
})();

exports["default"] = Generator;
module.exports = exports["default"];