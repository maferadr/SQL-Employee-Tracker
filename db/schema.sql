DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments(
    name VARCHAR(100) NOT NULL,
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
    -- Roles are gonna have a department to belong to. => Same for employees --
);

CREATE TABLE roles(
    role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(100) NOT NULL,
    department_id INT, 
    salary DECIMAL(5, 5) NOT NULL,
);

CREATE TABLE employees(
    emp_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role_id INT NOT NULL,
    manager INT
);

