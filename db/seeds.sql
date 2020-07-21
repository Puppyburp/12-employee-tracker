-- department seeds
INSERT INTO department (name)
VALUE ("Chief");
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Training");
INSERT INTO department (name)
VALUE ("Operations");
INSERT INTO department (name)
VALUE ("Sales");

-- role seeds
INSERT INTO role (title, salary, department_id)
VALUE ("Chief Executive Officer", 180000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Nuclear Safety Inspector", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Intern", 10000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Intern level 2", 8000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Intern level 3", 6000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Janitor", 40000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Merchant", 85000, 5);

-- employee seeds
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Marge", "Johnson", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Homer", "Simpson", 1, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Lisa", "Peterson", 2, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Bart", "Wilson", 2, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Maggie", "Williamson", 2, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Mister", "Burns", 1, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Apu", "Nahasapeemapetilon", null, 7);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
