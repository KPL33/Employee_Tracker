//Here, for our 'connection' to work, we'll 'require' the 'connection'.js file, which holds our methods and other useful code used for connecting to our "database".
const connection = require("./connection");

//We create the 'class DB', which contains all of our queries (the 'view...' functions) within it. 'SELECT', 'FROM' and 'LEFT JOIN' are all instructions for handling our user's queries to our "schema.sql" file/"database". 'SELECT' shows the names of the columns that will appear in our user's output "table". Content filling those columns is gathered 'FROM' the table named. 'LEFT JOIN' means that the first table named will be 'JOIN'ED at the specified column where the first table's content overlaps with content in the second table. Using 'viewAllRoles' as an example, we are asking that the 'department' table loads to the 'LEFT' of our 'role' table, which we're also loading. Since our 'role' table also stores a 'departmet_id' for us in our "seeds.sql" file, we ask that the 2 tables be 'JOIN'ed "where" the 'department_id' value is = to the 'id' value in the table called 'department'. And rather than display an integer representing the different 'department's, we instead 'SELECT'ed the 'name's of the 'department's. Similar methods are used to join the other tables that may be selected by our user, so that our user can view ALL of the appropriate info, based on their queries.
class DB {
    constructor(connection) {
        this.connection = connection
    }
    viewAllDept() {
        return this.connection.query(
            `
            SELECT
                department.id,
                department.name
            FROM
                department
            `
        )

    }

    async addEmployee(firstName, lastName, roleId, managerId, departmentId, title) {
        try {
            // Fetch the salary based on the roleId
            const [role] = await this.connection.query(
                `
            SELECT salary
            FROM role
            WHERE id = ?
            `,
                [roleId]
            );

            // Check if a role is found
            if (role.length === 0) {
                throw new Error(`Role with ID ${roleId} does not exist.`);
            }

            // Extract the salary from the fetched role
            const { salary } = role[0];

            // Insert the employee with the retrieved salary
            return this.connection.query(
                `
            INSERT INTO employee (first_name, last_name, role_id, manager_id, department_id, salary, title)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `,
                [firstName, lastName, roleId, managerId, departmentId, salary, title]
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    viewAllRoles() {
        return this.connection.query(
            `
            SELECT
                role.id,
                role.title,
                department.name AS department,
                role.salary
            FROM
                role
            LEFT JOIN
                department ON role.department_id = department.id
            `
        )
    }

    viewAllEmp() {
        return this.connection.query(
            `
            SELECT
                employee.id,
                employee.first_name,
                employee.last_name,
                role.title,
                department.name AS department,
                role.salary,
                IFNULL(CONCAT(manager.first_name, ' ', manager.last_name), 'N/A; Is Dept. Lead')  AS "manager"
            FROM
                employee
            LEFT JOIN
                role ON employee.role_id = role.id
            LEFT JOIN
                department ON role.department_id = department.id
            LEFT JOIN
                employee AS manager ON employee.manager_id = manager.id

            `
        )
    }

    async addDept(departmentName) {
        return this.connection.query(
            `
            INSERT INTO department (name)
            VALUES (?)
            `,
            [departmentName]
        );
    }

    async addRole(roleName, salary, departmentId) {
        return this.connection.query(
            `
            INSERT INTO role (title, salary, department_id)
            VALUES (?, ?, ?)
            `,
            [roleName, salary, departmentId]
        );
    }

    async updateEmployeeRole(employeeId, roleId) {
        return this.connection.query(
            `
          UPDATE employee
          SET role_id = ?
          WHERE id = ?
          `,
            [roleId, employeeId]
        );
    }

    async updateEmployeeManager(employeeId, managerId) {
        return this.connection.query(
            `
          UPDATE employee
          SET manager_id = ?
          WHERE id = ?
          `,
            [managerId, employeeId]
        );
    }
}

module.exports = new DB(connection);


