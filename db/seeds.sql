USE employee_trackerdb;

INSERT INTO department(name) 
VALUES ("Information Technology"),("Accounting"),("Engineering");

INSERT INTO role(title, salary, department_id)
VALUES ("Network Engineer", 90000, 1),("Accountant", 60000, 2),("Engineer", 120000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("William", "Lucht", 1, null),("Gina", "Elname", 2, 1), ("Jack","Black",3,1);



