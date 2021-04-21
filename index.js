// dependencies
// console app title package
const figlet = require('figlet');
// require the connection.js connection function
const connection = require('./db/connection.js');
// inquirer package for prompting the user
const inquirer = require('inquirer');

// NICE TO HAVE WORKING AT END:
// console title package options
// async function figletStart() {
//     figlet('The Employee Tracker', function(err, data) {
//         if (err) {
//             console.log('Something went wrong...');
//             console.dir(err);
//             return;
//         }
//         console.log(data)
//     });
// };

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
                    "View a Department",
                    "View an Employee",
                    "View a Role",
                    "Add a Department",
                    "Add an Employee",
                    "Add a Role",
                    "Nevermind, Exit Application!"
                ],
            }
        ]).then((answers) => {
            switch (answers.addChoice) {
                // need to add switch cases for Add Department, Employee, and a Role

                case "View a Department":
                    viewDepartment();
                    break;
                case "View an Employee":
                    viewEmployee();
                    break;
                case "View a Role":
                    viewRole();
                    break;
         
                case "Nevermind, Exit Application!":
                    quit();
                default:
                    break;
            }

            // if (answers.addChoice === "Add a Department") {
            //     addDepartment();
            // } else if(answers.addChoice === "Add an Employee"){
            //     addEmployee();
            // }else if(answers.addChoice === "Add a Role"){
            //     addRole()
            // }else if(answers.addChoice === "Nevermind, Exit Application!"){
            //     quit();
            // }
        })
};

// need to add 3 functions for adding Department, Employee, and a Role and placing them inside the switch cases above

// view a department to the database
function viewDepartment() {
    // question for office hours or tutoring: How do I query and display ALL departments in the console?

    const query = 'SELECT * FROM employee_trackerdb.department';
    connection.query(query, (err, res) => {
        if (err) throw err;
        // res.forEach;
        console.log("\n");
        console.table(res);
    })
    starterUp();
}

// view an employee to the database
function viewEmployee() {
    // SELECT * FROM employee_trackerdb.employee;
    const query = 'SELECT * FROM employee_trackerdb.employee';
    connection.query(query, (err, res) => {
        if (err) throw err;
        // res.forEach;
        console.log("\n");
        console.table(res);
    })
    starterUp();
}

// view a role to the database
function viewRole() {
    // SELECT * FROM employee_trackerdb.role;
    const query = 'SELECT * FROM employee_trackerdb.role';
    connection.query(query, (err, res) => {
        if (err) throw err;
        // res.forEach;
        console.log("\n");
        console.table(res);
    })
    starterUp();
}


// quit out of the application if needed
const quit = () => {
    connection.end();
    console.log('Good bye!');
    process.exit();
};

// starter up!
// figletStart();
starterUp();