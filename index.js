// dependencies
// console app title package
const figlet = require('figlet');
// console.table package
const cTable = require('console.table');
// require the connection.js connection function
const connection = require('./db/connection.js');
// inquirer package for prompting the user
const inquirer = require('inquirer');


// NICE TO HAVE WORKING AT END:
// console title package options
function figletStart() {
    figlet.text('The Employee Tracker', {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    }, function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data);
    });
};

// start the application
// app loads then the user is prompted to select to addPerson(), viewOrg(), or to update an existing employee role using roleUpdater()

const starterUp = () => {
    inquirer
        .prompt([
            {
                type: "list",
                name: "addChoice",
                message: "Please choose what you would like to do:",
                choices: [
                    "View Departments",
                    "View Employees",
                    "View Roles",
                    "Add a Department",
                    "Add an Employee",
                    "Add a Role",
                    "Nevermind, Exit Application!"
                ],
            }
        ])
        .then((answers) => {
            switch (answers.addChoice) {
                case "View Departments":
                    viewDepartment();
                    break;
                case "View Employees":
                    viewEmployee();
                    break;
                case "View Roles":
                    viewRole();
                    break;
                case "Add a Department":
                    addDepartment();
                    break;
                case "Add an Employee":
                    addEmployee();
                    break;
                case "Add a Role":
                    addRole();
                    break;
                case "Nevermind, Exit Application!":
                    quit();
                    break;
                default:
                    break;
            }
        }).catch((err) => {
            console.log(err);
            process.exit(1);
        });
};
// ********************** ADDS *******************************

// select a role when needed when adding employee
let roleArr = [];
function selectRole() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            roleArr.push(res[i].title);
        }
    })
    return roleArr;
}

// add a department
async function addDepartment() {
    // ask the user what department they want to add (inquirer prompt here)
    await inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the new Department?',
                name: 'newDepartment'
            }
        ]).then((data) => {
            const query = `INSERT INTO department(name) VALUES ("${data.newDepartment}")`;
            connection.query(query, (err, res) => {
                if (err) throw err;
            })
            // console.log(data);
        })
    console.log('\n');
    console.log("Department Added!");
    console.log('\n');
    starterUp();
}

// add Role
async function addRole() {
    await inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the new Role?',
                name: 'newRole',
            },
            {
                type: 'input',
                message: 'What is the salary for the new Role?',
                name: 'newSalary',
            },
            {
                type: 'input',
                message: 'Which department should this Role be added to? (Number Only)',
                name: 'newDepartmentId',
            }
        ]).then((data) => {
            const query = `INSERT INTO role(title,salary,department_id) VALUES ("${data.newRole}","${data.newSalary}",${data.newDepartmentId})`;
            connection.query(query, (err, res) => {
                if (err) throw err;
            })
            // console.log(data);
        })
    console.log('\n');
    console.log("New Role Added!");
    console.log('\n');
    starterUp();
}

// add Employee
async function addEmployee() {
    const query = 'SELECT title,id FROM role';
    const role = connection.query(query, (err, res) => {
        if (err) throw err;
    });
    console.log(role);
    await inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the first name of the new Employee?',
                name: 'firstName',
            },
            {
                type: 'input',
                message: 'What is the last name of the new Employee?',
                name: 'lastName',
            },
            {
                // need to get the list of existing roles
                // needs to display as a list
                type: 'list',
                message: 'Please select the Role for the new Employee',
                name: 'newEmployee',
                choices: selectRole(),
            }
        ]).then((answers) => {
            console.log("\n");
            connection.query("INSERT INTO employee SET ?", answers, (err, res) => {
                if (err) throw err;
                console.log(`${res.affectedRows} Employee has been created!`);
            });
        })
    console.log('\n');
    console.log("Employee Added!");
    console.log('\n');
    starterUp();
}

// ******************* VIEWS *********************************
// view a department - query database
function viewDepartment() {
    const query = 'SELECT * FROM employee_trackerdb.department';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("\n");
        console.table(res);
        starterUp();
        return;
    })
    // console.log();
    // starterUp();
}

// view an employee to the database
function viewEmployee() {
    const query = 'SELECT * FROM employee_trackerdb.employee';
    connection.query(query, (err, res) => {
        if (err) throw err;
        // res.forEach;
        console.log("\n");
        console.table(res);
        starterUp();
        return;
    })
}

// view a role to the database
function viewRole() {
    const query = 'SELECT * FROM employee_trackerdb.role';
    connection.query(query, (err, res) => {
        if (err) throw err;
        // res.forEach;
        console.log("\n");
        console.table(res);
        starterUp();
        return
    })
}


// quit out of the application if needed
const quit = () => {
    connection.end();
    console.log('\n');
    console.log('Good bye!');
    console.log('\n');
    process.exit();
};

// starter up!
// figletStart();
starterUp();