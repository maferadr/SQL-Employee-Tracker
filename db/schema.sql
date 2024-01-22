DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments(
    name VARCHAR(100) NOT NULL,
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
    -- Roles are gonna have a department to belong to. => Same for employees --
);

CREATE TABLE roles(
    role_id INT NOT NULL AUTO_INCREMENT,
    job_title VARCHAR(100) NOT NULL PRIMARY KEY,
    department_id INT, 
    salary DECIMAL(5, 5),
    FOREIGN KEY(department_id)
    REFERENCES departments(id)
    ON DELETE SET NULL
);

CREATE TABLE employees(
    emp_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    emp_job VARCHAR(100) FOREIGN KEY REFERENCES roles(job_title),
    salary DECIMAL(5,5) FOREIGN KEY REFERENCES roles(salary),
    manager VARCHAR(100) NOT NULL
);

