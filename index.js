//We have initialized "npm inquirer" for this challenge. Here, we 'require' the 'inquirer' package, which we'll utilize to 'prompt' the user on the contents of the tables that will generate in the CLI. This 'init' also generated our 'package.json' file in our root folder.
const inquirer = require('inquirer');

//We also declare a 'const'ant 'db' ("database"), which 'requires' the "index.js" file in our "db" folder. "index.js" is where we're storing all of the parameters for the tables that will return once the user selects the information they'd like to see in their tables.
const db = require('./db');

//Here, we set up our 'mainMenu' by making it an "object", which contains a 'list' of 'choices' for the user to make.
async function mainMenu() {
    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: ["View All Employees", "Update Employee Role", "View All Roles", "Add Roles", "View All Departments", "Add Department", "Quit"]
        }, //Remove this comma?
    ]);

    //For some of our user's 'choices', we simply want to produce a table containing the info the user is seeking. To 'return' that info., we use a 'switch' statement to call the function by its name, depending on the 'case' that was selected by the user (Examples of these 'async function's appear below).
    switch (choice) {
        case "View All Departments":
            return viewAllDept();
        case "View All Roles":
            return viewAllRoles();
        case "View All Employees":
            return viewAllEmp();
    }
};

//Here, we set up the 'async'hronous 'function's that can be called by our 'switch' statement. They are similar to each other, in that they all 'await' the resolution of a data "promise" before executing their individual blocks of code. Once appropriate data is retrieved from our 'db', the correct information stored in our 'db' appears as a 'table' for the user to view in the 'console'. Each then loads the 'mainMenu' for the user again, by calling that function. 
async function viewAllEmp() {
    const employees = await db.viewAllEmp();
    console.table(employees);
    mainMenu();
};

async function viewAllDept() {
    const departments = await db.viewAllDept();
    console.table(departments);
    mainMenu();
};

async function viewAllRoles() {
    const roles = await db.viewAllRoles();
    console.table(roles);
    mainMenu();
};

mainMenu();

// Within "Add Department", need to add another question "What is the name of the department?" that allows user to type dept. name.
//Within "Update employee role", need to add another question "What is the name of the new role?" that allows user to type dept. name.

//Within "Add role", need to add other questions: "What is the name of the role?",  "What is the salary of the role", "Which department does the role belong to?". This last one should give a list of your available departments, with "(Use arrow keys)" text.

//Add employee should have sub-questions "What is the employee's first name?", "What is the employee's last name?", "What is the employee's role?"(list of roles, with "user arrows" message), "Who is the employee's manager?" (list of dept. leads, arrow message).

//Update employee should let you select the employee (full names in a list, arrow message), then ask "Which role do you want to assign the selected employee?" (list roles, arrow message), that allows user to type dept. name.