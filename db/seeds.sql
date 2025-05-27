-- Departments
INSERT INTO department (name) VALUES
  ('Engineering'),
  ('Finance'),
  ('Legal'),
  ('Sales');

-- Roles
INSERT INTO role (title, salary, department_id) VALUES
  ('Software Engineer', 90000, 1),
  ('Accountant', 70000, 2),
  ('Lawyer', 120000, 3),
  ('Salesperson', 60000, 4),
  ('Lead Engineer', 120000, 1);

-- Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('Andrew', 'Reyes', 1, NULL),
  ('Koni', 'Kim', 2, NULL),
  ('Alice', 'Johnson', 3, NULL),
  ('Bob', 'Williams', 4, NULL),
  ('Carol', 'Brown', 5, 1);