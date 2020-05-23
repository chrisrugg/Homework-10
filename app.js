const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

//my code

const managerArray = [];
const teamMember = [];

function mainApp() {
    // create a manager
function createManager() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is the managers name?"
            },
            {
                type: "input",
                name: "managerId",
                message: "What is the managers id?"
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is the managers email?"
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is the managers office number?"
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            
            //Adds the manager to the team array
            teamMember.push(manager);
            managerArray.push(answers.managerName);
            console.log(teamMember);
            
            //Initiates the prompt to ask for more team members
            createTeam();
        });
        }




// a function that create an engineer - Added new to Engineer
function getEngineer() {

    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the engineers name?"
            },
            {
                type: "input",
                name: "id",
                message: "What is the engineers id?"
            },
            {
                type: "input",
                name: "email",
                message: "What is the engineers email?"
            },
            {
                type: "input",
                name: "github",
                message: "What is the engineers github username?"
            }

        ])
        .then(answers => {
            var {name, id, email, github} = answers;
            var engineer = new Engineer(name, id, email, github);
            teamMember.push(engineer);
            console.log(teamMember)
            createTeam()
        })

}
// a function that create an intern - Added new to intern
function getIntern() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the Interns name?"
            },
            {
                type: "input",
                name: "id",
                message: "What is the Interns id?"
            },
            {
                type: "input",
                name: "email",
                message: "What is the Interns email?"
            },
            {
                type: "input",
                name: "school",
                message: "What is the school name?"
            }

        ])
        .then(answers => {
            var {name, id, email, school} = answers;
            var intern = new Intern(name, id, email, school);
            teamMember.push(intern);
            console.log(teamMember)
            createTeam()
        })
}

// this function create a list to add team members
function createTeam() {
    inquirer
        .prompt([
        {
            type: "list",
            name: "command",
            message:"Would you like to add more team members?",
            choices:["Add an Engineer", "Add an Intern", "Make team"]
        }
        ])
        .then(answers => {
// create a switch statement to choose between engineer, intern, or build team
            statement = answers.command;

            switch(statement){
                case "Add an Engineer":
                    getEngineer();
                    break;

                case "Add an Intern":
                    getIntern();
                    break;

                case "Make team":
                    buildTeam();
                    break;
            }
        })
}


function buildTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMember), "utf-8");
}
createManager()
}
mainApp();
