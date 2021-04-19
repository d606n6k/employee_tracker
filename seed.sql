CREATE DATABASE employee_trackerdb;

USE employee_trackerdb;

CREATE TABLE department(
  id INTEGER auto_increment NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE emprole(
  id INTEGER auto_increment NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  emp_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (emp_id) REFERENCES department(id)
);

CREATE TABLE employee(
id INTEGER auto_increment NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT,
PRIMARY KEY (id),
FOREIGN KEY (manager_id) REFERENCES employee(id)
);