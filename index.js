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
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Roles", "View All Departments", "Add Department", "Quit"]
        }
    ]);

    //For some of our user's 'choices', we simply want to produce a table containing the info the user is seeking. To 'return' that info., we use a 'switch' statement to call the function by its name, depending on the 'case' that was selected by the user (Examples of these 'async function's appear below).
    switch (choice) {
        case "View All Employees":
            return viewAllEmp();
        case "Add Employee":
            return promptAddEmployee();
        case "Update Employee Role":
            return updateEmp();
        case "View All Roles":
            return viewAllRoles();
        case "Add Roles":
            return promptAddRole();
        case "View All Departments":
            return viewAllDept();
        case "Add Department":
            return promptAddDept();
    }
};

//Here, we set up the 'async'hronous 'function's that can be called by our 'switch' statement. They are similar to each other, in that they all 'await' the resolution of a data "promise" before executing their individual blocks of code. Once appropriate data is retrieved from our 'db', the correct information stored in our 'db' appears as a 'table' for the user to view in the 'console'. Each then loads the 'mainMenu' for the user again, by calling that function. 
async function viewAllEmp() {
    const employees = await db.viewAllEmp();
    console.table(employees);
    mainMenu();
};

async function promptAddEmployee() {
    const roles = await db.viewAllRoles();
    const managers = await db.viewAllEmp();
    const departments = await db.viewAllDept();
  
    const roleChoices = roles.map((role) => ({
      name: role.title,
      value: role.id,
    }));
  
    const managerChoices = managers.map((manager) => ({
      name: `${manager.first_name} ${manager.last_name}`,
      value: manager.id,
    }));
  
    const departmentChoices = departments.map((department) => ({
      name: department.name,
      value: department.id,
    }));
  
    const { firstName, lastName, roleId, managerId, departmentId, salary, title } = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "What is the employee's first name?",
      },
      {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name?",
      },
      {
        type: 'list',
        name: 'roleId',
        message: "What is the employee's role?",
        choices: roleChoices,
      },
      {
        type: 'list',
        name: 'managerId',
        message: "Who is the employee's manager?",
        choices: managerChoices,
      },
      {
        type: 'list',
        name: 'departmentId',
        message: "To which department should the employee be added?",
        choices: departmentChoices,
      },
      {
        type: 'input',
        name: 'salary',
        message: "What is the employee's salary?",
      },
      {
        type: 'input',
        name: 'title',
        message: "What is the employee's title?",
      },
    ]);
  
    await db.addEmployee(firstName, lastName, roleId, managerId, departmentId, salary, title);
    console.log("Employee added successfully!");
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

async function promptAddDept() {
    const { departmentName } = await inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: "What is the name of the department?"
        }
    ]);
    await db.addDept(departmentName);
    console.log("Department added successfully!");
    mainMenu();
}

async function promptAddRole() {
    const departments = await db.viewAllDept();

    const departmentChoices = departments.map((department) => ({
        name: department.name,
        value: department.id,
    }));

    const { roleName, salary, departmentId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: "What is the name of the role?",
        },
        {
            type: 'input',
            name: 'salary',
            message: "What is the salary of the role?",
        },
        {
            type: 'list',
            name: 'departmentId',
            message: "Which department does the role belong to?",
            choices: departmentChoices,
        },
    ]);

    await db.addRole(roleName, salary, departmentId);
    console.log("Role added successfully!");
    mainMenu();
}

mainMenu();