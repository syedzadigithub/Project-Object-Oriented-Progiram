#! /usr/bin/env node 
import inquirer from "inquirer";
import chalk from "chalk";

class Student {
  name: string;
  constructor(n: string) {
    this.name = n;
  }
}

class person {
  students: Student[] = [];
  addStudent(obj: Student) {
    this.students.push(obj);
  }
}

const persons = new person();

const programStart = async (persons: person) => {
  do {
    console.log(chalk.red(`         ******************************************************  WELCOME!      ****************************************************************`));
    const answer = await inquirer.prompt({
      name: "select",
      type: "list",
      message: "Whom would you like to interact? ",
      choices: ["Staff", "student", "Exit"],
    });
    if (answer.select === "Staff") {
      console.log(
      chalk.yellow ( "You approach to staff room. Please feel free to ask any question.\n")
      );
    } else if (answer.select === "student") {
      let answer = await inquirer.prompt({
        name: "student",
        type: "input",
        message: "Enter the student's name you want to interact with: ",
      });

      const student = persons.students.find(
        (value) => value.name === answer.student
      );
      if (!student) {
        const name = new Student(answer.student);
        persons.addStudent(name);
        console.log(chalk.bgRed(`\nHello I am ${name.name}. Nice meet you!`));
        console.log(chalk.bgMagentaBright("\nNew student added:"));
        console.log(chalk.bgBlue(`\nCurrent Students list:\n`));
        console.log(persons.students);
      } else {
        console.log(chalk.bgCyan(`\nHello I am ${student.name}. Nice to see you again.`));
        console.log(chalk.bgGreen(`\nExisting Students list:\n`));
        console.log(persons.students);
      }
    } else if (answer.select === "Exit") {
      console.log(chalk.redBright("\n Exiting the program...\t \t \t \t"));
      process.exit();
    }
  } while (true);
};
programStart(persons);