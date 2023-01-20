
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: 'Rosie8189',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

//-------------------------------------------------------------------------

function startPrompts() {
    inquirer
        .prompt({
            type: "list",
            name: "choice",
            message: "Would you like to do?",
            choices: [
                "View all Departments",
                "View all role",
                "View all Employees",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update an Employee Role",
                "Quit",
            ]
        })
        .then((response) => {
            if (response.choice === "View all Departments") {
                viewAllDepartments();
            } else if (response.choice === "View all role") {
                viewAllrole();
            } else if (response.choice === "View all Employees") {
                viewAllEmployees();
            } else if (response.choice === "Add a Department") {
                addDepartment();
            } else if (response.choice === "Add a Role") {
                addRole();
            } else if (response.choice === "Add an Employee") {
                addEmployee();
            } else if (response.choice === "Update an Employee Role") {
                updateEmployee();
            } else if (response.choice === "Quit") {
                console.log("bye!");
            }
        });
}

function viewAllDepartments() {
    const query = `SELECT * FROM departments`;
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        startPrompts();
    });
}

function viewAllrole() {
    const query = `SELECT * FROM departments`;
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        startPrompts();
    });
}

function viewAllEmployees() {
    const query = `SELECT * FROM employee`;
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        startPrompts();
    });
}

function addDepartment() {
    inquirer.prompt({
        name: 'newDepartment',
        type: 'input',
        message: 'Which department would you like to add?'
    })
        .then(function (answer) {
            db.query(
                `ALTER TABLE department AUTO_INCREMENT = 1; INSERT INTO department SET ?`,
                {
                    name: answer.newDepartment
                });
            const sql = 'SELECT * FROM department';
            db.query(sql, function (err, res) {
                if (err) throw err;
                console.log(answer.newDepartment + ' has been added!');
                console.table('All Departments:', res);
                startPrompts();
            })
        })
}

function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "role",
                message: "What is your role?",
            },
            {
                type: "input",
                name: "salary",
                message: "What is your salary?",
            },
            {
                type: "input",
                name: "department",
                message: "Which is your department ?",
            },
        ])
        .then((response) => {
            const query = `INSERT INTO role SET ?`;
            db.query(query, {
                title: response.roleName,
                salary: response.salary,
                department_id: response.roleDepartment,
            });
            console.log(`Added ${response.roleName} to the database`);
            menu();
        });
}

function addEmployee() {
    inquirer.prompt([
        {
            name: "firstname",
            type: "input",
            message: "What is the employee's first name?"
        },

        {
            name: "lastname",
            type: "input",
            message: "What is the employee's last name?"
        },

        {
            name: "role",
            type: "input",
            message: "What is the employee's role?"
        },

        {
            name: "manager",
            type: "input",
            message: "Who is the employee's manager?"
        }

    ]).then(function (answer) {
        var getRoleId = answer.role.split("-")
        var getManagerId = answer.manager.split("-")
        var query =
            `INSERT INTO employee (first_name, last_name, role_id, manager_id)
           VALUES ('${answer.firstname}','${answer.lastname}','${getRoleId[0]}','${getManagerId[0]}')`;
        connection.query(query, function (err, res) {
            console.log(`new employee ${answer.firstname} ${answer.lastname} added!`)
        });
        startPrompts();
    });
}

function updateEmployee() {
    connection.query('SELECT * FROM employee', function (err, result) {
        if (err) throw (err);
        inquirer
            .prompt([
                {
                    name: "employeeName",
                    type: "list",

                    message: "Which employee's role is changing?",
                    choices: function () {
                        var employeeArray = [];
                        result.forEach(result => {
                            employeeArray.push(
                                result.last_name
                            );
                        })
                        return employeeArray;
                    }
                }
            ])
            .then(function (answer) {
                console.log(answer);
                const name = answer.employeeName;

                connection.query("SELECT * FROM role", function (err, res) {
                    inquirer
                        .prompt([
                            {
                                name: "role",
                                type: "list",
                                message: "What is their new role?",
                                choices: function () {
                                    var roleArray = [];
                                    res.forEach(res => {
                                        roleArray.push(
                                            res.title)
                                    })
                                    return roleArray;
                                }
                            }
                        ]).then(function (roleAnswer) {
                            const role = roleAnswer.role;
                            console.log(role);
                            connection.query('SELECT * FROM role WHERE title = ?', [role], function (err, res) {
                                if (err) throw (err);
                                let roleId = res[0].id;

                                let query = "UPDATE employee SET role_id = ? WHERE last_name =  ?";
                                let values = [parseInt(roleId), name]

                                connection.query(query, values,
                                    function (err, res, fields) {
                                        console.log(`You have updated ${name}'s role to ${role}.`)
                                    })
                                viewAllEmployees();
                            })
                        })
                })
            })
    })
}


// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

//-------------------------------------------------------------------------

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

