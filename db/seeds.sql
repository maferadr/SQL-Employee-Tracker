USE employees_db;

INSERT INTO departments(name)
VALUES ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal"),
;

INSERT INTO roles(title, department_id, salary)
VALUES ("Sales Person", 1, 80000),
        ("Lead Engineer", 2, 150000),
        ("Software Engineer", 2, 120000),0000
        ("Account Manager", 3, 160000),
        ("Accountant", 3, 1250000),  
        ("Legal Team Lead", 4, 250000),
        ("Lawyer", 4, 190000)  
;

INSERT INTO employees(first_name, last_name, role_id)
VALUES ("Mike", "Chan", 1),
        ("Ashley", "Rodriguez", 2),
        ("Kevin", "Tupic", 3),
        ("Kunal", "Singh", 4),
        ("Malia", "Brown", 5),
        ("Sarah", "Lourd", 6),
        ("Tom", "Allen", 7)
;

