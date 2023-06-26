const connection = require("./connection");

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

    viewAllRoles() {
        return this.connection.query(
            `
            SELECT
                role.id,
                role.title,
                role.salary,
                department.name
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
                employee.manager_id
            FROM
                employee
            LEFT JOIN
                role ON employee.role_id = role.id

            `
        )
    }











}

module.exports = new DB(connection);


