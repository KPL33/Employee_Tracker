const mysql = require ('mysql2');
const inquirer = require ('inquirer');
const connections = require("");


//Here, we declare an array of 'questions' that will prompt the user for — and store — their 'input'..

//Need to add text "(Use arrow keys)" in grayish, after ToDo question and then "(Move up and down to reveal more choices)" in grayish after choices, to match example. Also, after "Quit", the list rolls over. See if you can do that.

//View all employees should show first and last names of the 9.

//View all depts should list depts.

// Within "Add Department", need to add another question "What is the name of the department?" that allows user to type dept. name.
//Within "Update employee role", need to add another question "What is the name of the new role?" that allows user to type dept. name.

//Within "Add role", need to add other questions: "What is the name of the role?",  "What is the salary of the role", "Which department does the role belong to?". This last one should give a list of your available departments, with "(Use arrow keys)" text.

//Add employee should have sub-questions "What is the employee's first name?", "What is the employee's last name?", "What is the employee's role?"(list of roles, with "user arrows" message), "Who is the employee's manager?" (list of dept. leads, arrow message).

//Update employee should let you select the employee (full names in a list, arrow message), then ask "Which role do you want to assign the selected employee?" (list roles, arrow message), that allows user to type dept. name.

const questions = [
    {
        type: 'list',
        name: 'ToDo',
        message: 'What would you like to do?',
        choices: ["View All Employees", "Update Employee Role", "View All Roles", "Add Roles", "View All Departments", "Add Department", "Quit"]
    },
    {
        type: 'input',
        name: 'logoColor',
        message: 'Please enter a hexadecimal value for your logo-color, beginning with the # sign. If you are unfamilir with choosing colors based on hexidecimal value, please visit https://htmlcolorcodes.com/color-picker/ for help: . Or, you may choose colors with basic names (red, green, blue, etc.).'
    },
    {
        type: 'input',
        name: 'logoText',
        message: 'What text would you like to appear on your logo (please limit to 1 to 3 characters)?'
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Please enter a color for your text-color.'
    }
];