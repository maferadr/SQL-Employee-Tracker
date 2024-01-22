INSERT INTO departments(name)
VALUES ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal"),
;

INSERT INTO roles(job_title, department_id, salary)
VALUES ("Sales Person", 1, 8),
        ("Lead Engineer", 2, 15),
        ("Software Engineer", 2, 12),
        ("Account Manager", 3, 16),
        ("Accountant", 3, 125),  
        ("Legal Team Lead", 4, 25),
        ("Lawyer", 4, 19)  
;

-- Would it be any way to select properties from the table? --
INSERT INTO employees(first_name, last_name, manager)
VALUES ("Mike", "Chan", "Jhon Doe"),
        ("Ashley", "Rodriguez"),
        ("Kevin", "Tupic", "Ashley Rodriguez"),
        ("Kunal", "Singh"),
        ("Malia", "Brown", "Kunal Singh"),
        ("Sarah", "Lourd"),
        ("Tom", "Allen", "Sarah Lourd")
;


-- INSERT INTO movies (movie_name)
-- VALUES ("Lion King"),
--        ("The Godfather"),
--        ("West Side Story"),
--        ("Parasite"),
--        ("The Wizard of Oz");

-- INSERT INTO reviews (movie_id, review)
-- VALUES (1, "Zazu is underrated. Give that hornbill a sequel!"),
--        (2, "I'm gonna make him an offer you can't refuse, watch this movie"),
--        (1, "Scar is the lion everyone loves to hate"),
--        (3, "Ten years of ballet and three years of tap to join a gang in this neighborhood"),
--        (5, "The tin man gave a metallic, hollow performance"),
--        (1, "Hakuna matata"),
--        (5, "Those flying monkeys are nightmare fuel!");
       
