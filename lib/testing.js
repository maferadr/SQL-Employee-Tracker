//Import Libraries needed to run the application

const inquirer = require('inquirer');
const mysql = require('mysql2');
const { writeFile, readFile } = require('fs/promises');

//Declare const for each case
const sqlDeparment = `SELECT departments.id, departments.name
    AS departments 
    FROM deparments`;

const sqlRoles = `SELECT roles.role_id, roles.job_title AS roles, roles.salary,
    deparments.name AS departments
    FROM roles
    LEFT JOIN department
    ON roles.department_id = departments.id`;

const sqlEmployees = `SELECT employees.emp_id, employees.first_name, employees.last_name, employees.manager, roles.job_title AS roles
    FROM employees
    LEFT JOIN roles
    ON employees.role_id = roles.role_id`;

const viewAllDatabase = (sql)=>{
    switch (sql) {
        case userInput.departmentsDb:
            sqlDeparment
            break;

        case userInput.rolesDb:
            sqlRoles
            break;
        case userInput.employeesDb:
            sqlEmployees
            break;

        default:
            break;
    };
}


//Create a connection 
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Venezuela44!',
        database: 'employees_db'
    },

    console.log(`Connected to the employees_db database.`)
);

const lengthValidator = (input) =>{
    if(input.length > 0){
        //Show database
        db.query(input, (err, results)=>{
            if(err) throw err;
            console.table(results);
            userInput;
        });

        return viewAllDatabase();
    }
};

const userInput = [
    //Check for length of inquirer and apply a conditional for this.
    {
        type: 'text',
        name: 'departmentsDb',
        message: 'View all Departments => Press Any key to Accept. Enter to Reject.',
        validate: lengthValidator
    },
    {
        type: 'text',
        name: 'rolesDb',
        message: 'View all Roles => Press any key to Accept. Enter to Reject.',
        validate: lengthValidator
    }, {
        type: 'text',
        name: 'employeesDb',
        message: 'View all employees => Press any key to Accept. Enter to Reject.',
        validate: lengthValidator
    }, {
        type: 'text',
        name: 'department',
        message: 'Add a Department.'
    }, {
        type: 'text',
        name: 'role',
        message: 'Add a Role.'
    }, {
        type: 'text',
        name: 'employee',
        message: 'Add an Employee.'
    },
    {
        type: 'checkbox',
        name: 'updated',
        message: 'Which employee`s Role do you want to update?',
        choices: [
            //employee's name grabbed from the database
        ]
    }
];

inquirer.prompt(userInput)
.then((answers) =>{
    console.log(answers)
})
// .then(()=>{
//     //Create the database on the sql files.
//     return writeFile('./db/')
// })