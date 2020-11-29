const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var teamMembers = [];

function startCreatingTeam() {
  inquirer 
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is your manager's name?",
      },
      {
        name: "id",
        type: "input",
        message: "What is your manager's ID?",
      },
      {
        name: "email",
        type: "input",
        message: "What is your manager's email?",
      },
      {
        name: "officeNumber",
        type: "input",
        message: "What is your manager's office number?",
      },
    ])
    .then((answers) => {
      const managerDetails = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
      teamMembers.push(managerDetails);
      createThisManagersTeam();
    });
}
function createThisManagersTeam() {
  inquirer 
    .prompt([
      {
        type: "list",
        message: "What type of team member would you like to add?",
        choices: ["Engineer", "Intern", "I don't want to add any more team members"],
        name: "typeMember",
      },
    ])
    .then((employeeType) => {
      if (employeeType.typeMember === "Engineer") {
        inquirer 
          .prompt([
            {
              name: "name",
              type: "input",
              message: "What is your engineer's name?",
            },
            {
              name: "id",
              type: "input",
              message: "What is your engineer's id?",
            },
            {
              name: "email",
              type: "input",
              message: "What is your engineer's email?",
            },
            {
              name: "github",
              type: "input",
              message: "What is your engineer's github?",
            },
          ]).then(answers => {
              const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
              teamMembers.push(newEngineer); 
              createThisManagersTeam();
          });
      } else if (employeeType.typeMember === "Intern") {
        inquirer.prompt([
      
          {
            type: "input",
            name: "name",
            message: "What is your intern's name?",
          },
          {
            type: "input",
            name: "id",
            message: "What is your intern's id?",
          },
          {
            type: "input",
            name: "email",
            message: "What is your intern's email?",
          },
          {
            type: "input",
            name: "school",
            message: "What is your intern's school?",
          },
        ]).then(answers => {
            const newIntern = new Intern(answers.name, answers.id, answers.email, answers.school);
            teamMembers.push(newIntern); 
            createThisManagersTeam();
        });
      } else if (employeeType.typeMember === "I don't want to add any more team members") {
          console.log(teamMembers)
          createHTML();
      }
    });
}

function createHTML() {
    fs.writeFileSync(outputPath, render(teamMembers))
}


startCreatingTeam();
