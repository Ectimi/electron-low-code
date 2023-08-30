import chalk from 'chalk';

class Logger {
  Info(text: string) {
    console.log(chalk.bgBlue('Info:'), chalk.blue(text));
  }
  Success(text: string) {
    console.log(chalk.bgGreen('Success', chalk.green(text)));
  }
  Error(text: string) {
    console.log(chalk.bgRed('Error', chalk.red(text)));
  }
}

export default new Logger();
