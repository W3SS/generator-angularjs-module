export default class Generator {
  sayHello(generator) {
    generator.log(generator.yosay(`Welcome to the splendid ${generator.chalk.green('AngularJS Module')} generator!`));
  }

  getVariables(generator) {
    let _variables = {
      app: generator.appName,
      username: generator.githubUsername,
      email: generator.email,
      ngVersion: generator.ngVersion,
      repository: generator.githubRepository,
      compileStyles: generator.compileStyles,
      main: generator.compileStyles
        ? [ "dist/" + generator.appName.toLowerCase() + ".min.js", "dist/" + generator.appName.toLowerCase() + ".min.css" ]
        : "dist/" + generator.appName.toLowerCase() + ".min.js"
    };

    _variables.main = JSON.stringify(_variables.main);

    return _variables;
  }

  _copyFilesNg1(generator, variables) {
    generator.template('ng1/src/_app.js', 'src/' + generator.appName.toLowerCase() + '.js', variables);
    generator.template('ng1/tests/_app_test.js', 'tests/' + generator.appName.toLowerCase() + '_test.js', variables)

    if (generator.compileStyles) {
      generator.template('ng1/src/_app.css', 'src/' + generator.appName.toLowerCase() + '.css', variables);
    }

    generator.template('ng1/_package.json', 'package.json', variables);

    generator.template('ng1/_bower.json', 'bower.json', variables);
    generator.template('ng1/README.md', 'README.md', variables);

    generator.template('ng1/gulpfile.js', 'gulpfile.js', variables);
    generator.template('ng1/karma.conf.js', 'karma.conf.js', variables);

    generator.fs.copy(generator.templatePath('ng1/_.travis.yml'), generator.destinationPath('.travis.yml'));
    generator.fs.copy(generator.templatePath('ng1/_.gitignore'), generator.destinationPath('.gitignore'));
    generator.fs.copy(generator.templatePath('ng1/_editorconfig'), generator.destinationPath('.editorconfig'));
    generator.fs.copy(generator.templatePath('ng1/_jshintrc'), generator.destinationPath('.jshintrc'));
  }

  _copyFilesNg2(generator, variables) {
    generator.template('ng2/src/_app.ts', 'src/' + generator.appName.toLowerCase() + '.ts', variables);
    generator.template('ng2/src/_app.html', 'src/' + generator.appName.toLowerCase() + '.html', variables);
    generator.template('ng2/src/_app.css', 'src/' + generator.appName.toLowerCase() + '.css', variables);
    generator.template('ng2/tests/_app_test.ts', 'tests/' + generator.appName.toLowerCase() + '_test.ts', variables)

    generator.template('ng2/_package.json', 'package.json', variables);

    generator.template('ng2/README.md', 'README.md', variables);

    generator.template('ng2/gulpfile.babel.js', 'gulpfile.babel.js', variables);
    generator.template('ng2/karma.conf.js', 'karma.conf.js', variables);

    generator.fs.copy(generator.templatePath('ng2/tsconfig.json'), generator.destinationPath('tsconfig.json'));
    generator.fs.copy(generator.templatePath('ng2/tsd.json'), generator.destinationPath('tsd.json'));

    generator.fs.copy(generator.templatePath('ng2/_.travis.yml'), generator.destinationPath('.travis.yml'));
    generator.fs.copy(generator.templatePath('ng2/_.gitignore'), generator.destinationPath('.gitignore'));
    generator.fs.copy(generator.templatePath('ng2/_editorconfig'), generator.destinationPath('.editorconfig'));
    generator.fs.copy(generator.templatePath('ng2/_jshintrc'), generator.destinationPath('.jshintrc'));
  }

  copyFiles(generator) {
    let _variables = this.getVariables(generator);

    switch (_variables.ngVersion) {
      case "ng1": return this._copyFilesNg1(generator, _variables);
      case "ng2": return this._copyFilesNg2(generator, _variables);
    }
  }

  installDependencies(generator) {
    generator.installDependencies({skipInstall: generator.options['skip-install']});
  }

  promptOptions(generator) {
    let done = generator.async();

    let prompts =
      [
        {
          type: 'input',
          name: 'appName',
          message: 'What is the name of your app?',
          default: generator.lodash.camelCase(generator.appname)
        },
        {
          type: 'input',
          name: 'githubRepository',
          message: 'What is your repository name on Github?',
          default: generator.appname.toLowerCase()
        },
        {
          type: 'input',
          name: 'githubUsername',
          message: 'What is your username on Github?'
        },
        {
          type: 'input',
          name: 'email',
          message: 'What is your email?'
        },
        {
          type: 'list',
          name: 'ngVersion',
          message: 'What version of Angular do you want to use?',
          choices: ["ng1", "ng2"],
          default: 0
        },
        {
          type: 'confirm',
          name: 'compileStyles',
          message: 'Are you using css with your module?',
          default: false
        }
      ];

    generator.prompt(prompts, (props) => {
      generator.appName = props.appName;
      generator.githubRepository = props.githubRepository;
      generator.githubUsername = props.githubUsername;
      generator.email = props.email;
      generator.ngVersion = props.ngVersion;
      generator.compileStyles = props.compileStyles;

      done();
    });
  }
}
