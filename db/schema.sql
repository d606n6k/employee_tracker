CREATE DATABASE employee_trackerdb;

USE employee_trackerdb;

CREATE TABLE department(
  id INTEGER auto_increment NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role(
  id INTEGER auto_increment NOT NULL,
  title varchar(30),
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY (id),
  constraint fk_department FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
id INTEGER auto_increment NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT,
PRIMARY KEY (id),
constraint fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id),
constraint fk_role FOREIGN KEY (role_id) references role(id)
);