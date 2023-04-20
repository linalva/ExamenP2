#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';


let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    'How well you know general culture? \n'
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue('HOW TO PLAY')} 
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right...

  `);
}

async function askName() {
    const answers = await inquirer.prompt({
      name: 'player_name',
      type: 'input',
      message: 'What is your name?',
      default() {
        return 'Player';
      },
    });
  
    playerName = answers.player_name;
  }

  async function question1() {
    const answers = await inquirer.prompt({
      name: 'question_1',
      type: 'list',
      message: 'When did World War II end?\n',
      choices: [
        '1945',
        '1965',
        '1888',
        '1769',
      ],
    });
  
    return handleAnswer(answers.question_1 === '1945');
  }

  async function question2() {
    const answers = await inquirer.prompt({
      name: 'question_2',
      type: 'list',
      message: 'Who invented the light bulb?\n',
      choices: [
        'John F. Kennedy',
        'Thomas Edison',
        'Me',
        'Lenin',
      ],
    });
  
    return handleAnswer(answers.question_2 === 'Thomas Edison');
  }  

  async function question3() {
    const answers = await inquirer.prompt({
      name: 'question_3',
      type: 'list',
      message: 'In what year did the Titanic sink?\n',
      choices: [
        '1668',
        '1739',
        '1912',
        '1425',
      ],
    });
  
    return handleAnswer(answers.question_3 === '1912');
  }

  async function question4() {
    const answers = await inquirer.prompt({
      name: 'question_4',
      type: 'list',
      message: 'How long did The Hundred Years War last?\n',
      choices: [
        '116',
        '100',
        '125',
        '119',
      ],
    });
  
    return handleAnswer(answers.question_4 === '116');
  } 

  async function question5() {
    const answers = await inquirer.prompt({
      name: 'question_5',
      type: 'list',
      message: 'How old was Queen Elizabeth II when she died?\n',
      choices: [
        '111',
        '52',
        '96',
        '98',
      ],
    });
  
    return handleAnswer(answers.question_5 === '96');
  } 
  
  
  async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();
  
    if (isCorrect) {
      spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
    } else {
      spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
      process.exit(1);
    }
  }

  function winner() {
    console.clear();
    figlet(`Congrats , ${playerName} !`, (err, data) => {
      console.log(gradient.pastel.multiline(data) + '\n');

      console.log(
        chalk.green(
          `I owe you your favorite thing in the world`
        )
      );
  
      process.exit(0);
    });
  }

console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();


winner();
