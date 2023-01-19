
const express = require('express');
// Import and require mysql2
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
            "View all Roles",
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
        } else if (response.choice === "View all Roles") {
          viewAllRoles();
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

}

function viewAllRoles() {

}
 
function viewAllEmployees() {

}

function addDepartment() {

}

function addRole() {

}

function addEmployee() {

}

function updateEmployee() {

}
