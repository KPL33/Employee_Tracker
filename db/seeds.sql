USE employees_db

INSERT INTO department
    (name)
VALUES
    ("Marketing"),
    ("Sales"),
    ("Production");

INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Senior Marketing Advisor", 150000, 1),
    ("Marketing Advisor", 100000, 1),
    ("Junior Marketing Advisor", 70000, 1),
    ("Senior Sales Associate", 150000, 2),
    ("Sales Associate", 100000, 2),
    ("Junior Sales Associate", 70000, 2),
    ("Production Director", 150000, 3),
    ("Production Associate", 100000, 3),
    ("Junior Production Associate", 70000, 3);

    INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Kevin", "Lewis", 1, NULL),
    ("Ronald", "McDonald", 2, 1),
    ("Titus", "Andromedon", 3, 1),
    ("Andrew", "Ryan", 4, NULL),
    ("Sansa", "Stark", 5, 4),
    ("Amy", "Lau", 6, 4),
    ("Ben", "Kenobi", 7, NULL),
    ("Walter", "White", 8, 7),
    ("Tanya", "McQuoid", 9, 7);