//Import Libraries needed to run the application

const inquirer = require('inquirer');
const mysql = require('mysql2');
const { writeFile, readFile } = require('fs/promises');
const { seeds } = require('./db');

const lengthValidator = (input) =>{
    if(input.length > 0){
        //Show database
        const sql = `INSERT INTO departments (name) 
        VALUES (?) `;
        return readFile('./db/seeds.sql', JSON.parse(sql))
    }
    return
};

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Venezuela44!',
        database: 'employees_db'
    },

    console.log(`Connected to the employees_db database.`)
)

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
.then(()=>{
    //Create the database on the sql files.
    return writeFile('./db/')
})