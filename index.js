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
                    "Add a Department",
                    "Add an Employee",
                    "Add a Role",
                    "Nevermind, Exit Application!"
                ],
            }
        ]).then((answers) => {
            switch (answers.addChoice) {
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

// add a department to the database
function addDepartment() {
    // question for office hours or tutoring: How do I query and display ALL departments in the console?

    const query = 'SELECT * FROM employee_trackerdb.department';
    connection.query(query, (err, res) => {
        if (err) throw err;
        res.forEach;
        console.log("\n");
        console.table(res);
    })
    starterUp();
}

// add an employee to the database
function addEmployee() {
    // SELECT * FROM employee_trackerdb.employee;
    const query = 'SELECT * FROM employee_trackerdb.employee';
    connection.query(query, (err, res) => {
        if (err) throw err;
        res.forEach;
        console.log("\n");
        console.table(res);
    })
    starterUp();
}

// add a role to the database
function addRole() {
    // SELECT * FROM employee_trackerdb.role;
    const query = 'SELECT * FROM employee_trackerdb.role';
    connection.query(query, (err, res) => {
        if (err) throw err;
        res.forEach;
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