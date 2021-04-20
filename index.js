// inquirer package for prompting the user
const inquirer = require('inquirer');
// mysql package to connect to the database
const mysql = require('mysql');
// console app title package
const figlet = require('figlet');

// database connection info
const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Be sure to update with your own MySQL password!
    password: 'password',
    database: 'employee_trackerdb',
});

// console title package options
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

// start the application
// app loads then the user is prompted to select to addPerson(), viewOrg(), or to update an existing employee role using roleUpdater()

const starterUp = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'test',
                message: 'Choose an option:',
                choices: [
                    {
                        value: 'First Choice',
                        name: 'firstChoice'
                    },
                    {
                        value: 'Second Choice',
                        name: 'secondChoice'
                    }
                ],
            }
        ])
}

// prompt the user to add department, roles, or an employee
const addPerson = () => {

}

// view departments, roles, employees
const viewOrg = () => {

}

// update the employee roles
const roleUpdater = () => {

}

// quit out of the application if needed
const quit = () => {
    connection.end();
    console.log('Good bye!');
    process.exit();
};



// connect to the database
connection.connect((err) => {
    if (err) throw err;
});

// starter up!
starterUp();