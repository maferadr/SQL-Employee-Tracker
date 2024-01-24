//Import all the libraries and packages needed to run the Application
const db = require('../db/connection');
const cTable = require('console.table');
const inquirer = require('inquirer');

//inquirer prompts
const startInquirer = () =>{
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to Do?',
            choices: [
                'View all departments.',
                'View all Roles.',
                'View all Employees.',
                'Add a Department.',
                'Add a Role.',
                'Add an Employee.',
                'Update an Employee Role.',
                'Remove a department.',
                'Remove a Role.',
                'Remove an employee.',
                'Exit.'
            ]
        }
    ])
    //conditionals that are going to meet the criteria => functions met for each condition.
    .then((answers)=>{
        const nextPrompt = answers.options;
        
        if(nextPrompt === 'View All Departments.') viewAllDepartments();
        if(nextPrompt === 'View all Roles.') viewAllRoles();
        if(nextPrompt === 'View all Employees.') viewAllEmp();
        if(nextPrompt === 'Add a Department.') addDepartment();
        if(nextPrompt === 'Add a Role.') addRole();
        if(nextPrompt === 'Add an Employee.') addEmployee();
        if(nextPrompt === 'Update an Employee Role.') updateRole();
        if(nextPrompt === 'Remove a department.') removeDept();
        if(nextPrompt === 'Remove a Role.') removeRole();
        if(nextPrompt === 'Remove an employee.') removeEmployee();
        if(nextPrompt === 'Exit.') process.exit(); 
    });
};

//Query function to retrieve data from the database
const sqlQuery = (err, rows) =>{
    if(err){
        throw err;
    }
    console.log('\n');
    console.table(rows);
    return startInquirer();
};

//View all departments database
const viewAllDepartments = ()=>{
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) =>{
        sqlQuery(err, rows);
    })
};

//View all roles printed in the database
const viewAllRoles = () =>{
    const sql = `SELECT roles.id,
                        roles.title,    
                        roles.salary,
                        departments.name AS department
                    FROM roles
                    LEFT JOIN departments ON roles.department_id = departments.id   `;
    db.query(sql, (err, rows)=>{
        sqlQuery(err, rows);
    })                
};

//View all employees in the database
const viewAllEmp = () =>{
    const sql = `SELECT employees.id,
                        employees.first_name,
                        employees.last_name,
                        roles.title AS title,
                        roles.salary AS salary,
                        departments.name AS department,
                        CONCAT (manager.first_name, ' ', manager.last_name) AS manager
                    FROM employees
                    LEFT JOIN roles ON employees.roles_id = roles.id
                    LEFT JOIN departments ON roles.department_id = departments.id   
                    LEFT JOIN employees manager ON employees.manager_id = manager.id  
                        `;
    db.query(sql, (err, rows) =>{
        sqlQuery(err, rows)
    });               
};

//Add department function
const addDepartment = () =>{
    //Questions are prompted if the user selects add a new Department.
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of this Department?',
            validate: nameInput =>{
                if(nameInput){
                    return true
                }else{
                    console.log(`Please enter a department name`);
                    return false;
                };
            }
        }
    ])
    //Those values are being added in the database
    .then(answer =>{
        const sql = `INSERT INTO departments (name)
        VALUES (?)`;
    const params = answer.name;
    db.query(sql, params, (err)=>{
        if(err) throw err;
        console.log(`Department Added!`);
        //Call for the function to print the data needed.
        return viewAllDepartments();
    });
    });
};

//Add role function
const addRole = () =>{
    //Questions will be prompted if the user select this option
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the name of this Role?',
            validate: nameInput =>{
                if(nameInput){
                    return true
                }else{
                    console.log(`Please enter a Role name.`);
                    return false;
                };
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'How much will be the salary of this Role?',
            validate: salaryInput =>{
                if(isNaN(salaryInput)){
                    console.log(`Please enter a valid value.`)
                    return false;
                }else{
                    return true;
                }
            }
        }
    ])
    //Those values will be added on the data
    .then(answer =>{
        const params = [answer.title, answer.salary];
        const sql = `SELECT * FROM departments`;
        db.query(sql, (err, rows) =>{
            if(err){
                throw err;
            }
            //Map method for going through those parameters.
            const deparments = rows.map(({name, id}) => ({name: name, value: id}));
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'department',
                    message: 'What department does this role belong to?',
                    choices: deparments
                }
            ])
            .then(departmentAnswer =>{
                const deparment = departmentAnswer.deparment;
                params.push(deparment);
                const sql = `INSERT INTO roles (title, salary, department_id)
                    VALUES (?, ?, ?)`;
                db.query(sql, params, (err) =>{
                    if(err){
                        throw err
                    }
                    console.log(`Role added!`);
                    //Call for the functions that prints out all the roles.
                    return viewAllRoles();
                });
            });
        });
    });
};

//Add employee function to the database
const addEmployee = () =>{
    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Please enter the employee`s first name.',
            validate: nameInput =>{
                if(nameInput){
                    return true;
                }else{
                    console.log(`Please enter a Name.`);
                    return false;
                };
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Please enter the employee`s last name.',
            validate: nameInput =>{
                if(nameInput){
                    return true;
                }else{
                    console.log(`Please enter a Last Name.`);
                    return false;
                };
            }   
        }
    ])
    //Parameters will be set up to the database
    .then(answer => {
        const params = [answer.firstName, answer.lastName];
        const sql = `SELECT * FROM roles`;
        db.query(sql, (err, rows)=>{
            if(err){
               throw err; 
            }
            const roles = rows.map(({title, id}) => ({name: title, value: id}));
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role',
                    message: 'What is the role fo this employee?',
                    choices: roles
                }
            ])
            .then(roleAnswer =>{
                const role = roleAnswer.role;
                params.push(role);
                const sql = `SELECT * FROM employees`;
                db.query(sql, (err, rows)=>{
                    if(err){
                        throw err;
                    }
                    const managers = rows.map(({first_name, last_name, id}) => ({name: `${first_name}${last_name}`, value: id}));
                    managers.push({name: 'No Manager', value: null});
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'manager',
                            message: 'Who`s the employee manager?',
                            choices: managers
                        }
                    ])
                    .then(managerAnswer => {
                        const manager = managerAnswer.manager;
                        params.push(manager);
                        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                          VALUES (?, ?, ?, ?)`;
                        db.query(sql, params, (err) => {
                          if (err) {
                            throw err;
                          }
                          console.log("Employee added!");
                          return viewEmployees();
                        });
                      });
                });
            });
        });
    });
};

//Update role function
const updateRole = () =>{
    const sql = `SELECT first_name, last_name, id FROM employees`
    db.query(sql, (err, rows)=>{
        if(err){
            throw err;
        }
        const employees = rows.map(({first_name, last_name, id}) => ({name: `${first_name}${last_name}`, value: id}));
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Which employee`s role would you like to update?',
                choices: employees
            }
        ])
        .then(employeeAnswer =>{
            const employee = employeeAnswer.employee;
            const params = [employee];
            const sql = `SELECT title, id FROM roles`;
            db.query(sql, (err, rows)=>{
                if(err){
                    throw err;
                }
                const roles = rows.map(({title, id}) => ({name: title, value: id}));
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: 'What`s the new role of the employee?',
                        choices: roles
                    }
                ])
                .then(rolesAnswer =>{
                    const role = rolesAnswer.role;
                    //Adding a new method at the beginning of the array.
                    params.unshift(role);
                    const sql = `UPDATE employees
                            SET role_id = ?
                            WHERE id =?`
                    db.query(sql, params, (err)=>{
                        if(err){
                            throw err;
                        }
                        console.log('Employee updated!');
                        return viewAllEmp();
                    });      
                });
            });
        });
    });
};

//Remove department function
const removeDept = ()=>{
    const sql = `SELECT * FROM departments`
    db.query(sql, (err, rows)=>{
        if(err){
            throw err;
        }
        const departments = rows.map(({name, id}) => ({name: name, value, id}));
        inquirer.prompt([
            {
                type: 'list',
                name: 'department',
                message: 'Choose the Department you want to Remove.',
                choices: departments
            }
        ])
        .then(depAnswer =>{
            const department = depAnswer.department;
            const params = department;
            const sql = `DELETE FROM departments
                WHERE id = ?`
            db.query(sql, params, (err)=>{
                if(err){
                    throw err;
                }
                console.log(`Department deleted!`);
                return viewAllDepartments();
            }); 
        });
    });
};

const removeRole = () =>{
    const sql = `SELECT id, title FROM roles`
    db.query(sql, (err, rows)=>{
        if(err){
            if(err){
                throw err;
            }
            const roles = rows.map(({title, id}) => ({name: title, value: id}));
            inquirer.prompt({
                type: 'list',
                name: 'role',
                message: 'Enter the role you would like to remove.',
                choices: roles
            });
        }
    })
    .then(roleAnswer =>{
        const role = roleAnswer.role
        const params = role;
        const sql = `DELETE FROM roles
            WHERE id = ?`
            db.query(sql, params, (err)=>{
                if(err){
                    throw err;
                }
                console.log(`Role deleted!`);
                return viewAllRoles();
            });
    });
};

const removeEmployee = ()=>{
    const sql = `SELECT first_name, last_name, id FROM employees`
    db.query(sql, (err, rows)=>{
        if(err){
            throw err;
        }
        const employees = rows.map(({first_name, last_name, id}) => ({name: `${first_name}${last_name}`, value: id}));
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Enter the name of the Employee you would like to remove',
                choices: employees
            }
        ])
        .then(employeeAnswer =>{
            const employee = employeeAnswer.employee
            const params = employee;
            const sql = `DELETE FROM employees
                WHERE id = ?`
                db.query(sql, params, (err)=>{
                    if(err){
                        throw err;
                    }
                    console.log(`Employee has been deleted.`);
                    return viewAllEmp();
                })
        });
    });
};

module.exports = startInquirer;



