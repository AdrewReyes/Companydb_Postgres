import inquirer from 'inquirer';
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pkg;

const db = new Client({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432 // default PostgreSQL port
});

await db.connect();

async function mainMenu() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role',
        'Exit'
      ]
    }
  ]);

  switch (action) {
    case 'View All Departments':
      await viewDepartments();
      break;
    case 'View All Roles':
      await viewRoles();
      break;
    case 'View All Employees':
      await viewEmployees();
      break;
    case 'Add a Department':
      await addDepartment();
      break;
    case 'Add a Role':
      await addRole();
      break;
    case 'Add an Employee':
      await addEmployee();
      break;
    case 'Update an Employee Role':
      await updateEmployeeRole();
      break;
    case 'Exit':
      await db.end();
      process.exit();
  }
  mainMenu();
}

async function viewDepartments() {
  const result = await db.query('SELECT id, name AS department FROM department');
  console.table(result.rows);
}

async function viewRoles() {
  const result = await db.query(`
    SELECT role.id, role.title, department.name AS department, role.salary
    FROM role
    JOIN department ON role.department_id = department.id
  `);
  console.table(result.rows);
}

async function viewEmployees() {
  const result = await db.query(`
    SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary,
      CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    LEFT JOIN role ON e.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee m ON e.manager_id = m.id
  `);
  console.table(result.rows);
}

// Add department
async function addDepartment() {
  const { name } = await inquirer.prompt([
    { type: 'input', name: 'name', message: 'Department name:' }
  ]);
  if (!name || !name.trim()) {
    console.log('Department name cannot be empty.');
    return;
  }
  await db.query('INSERT INTO department (name) VALUES ($1)', [name.trim()]);
  console.log(`Added department: ${name.trim()}`);
}

// Add role
async function addRole() {
  const departmentsResult = await db.query('SELECT id, name FROM department');
  const departments = departmentsResult.rows;
  const { title, salary, department_id } = await inquirer.prompt([
    { type: 'input', name: 'title', message: 'Role title:' },
    { type: 'input', name: 'salary', message: 'Salary:' },
    {
      type: 'list',
      name: 'department_id',
      message: 'Department:',
      choices: departments.map((d: any) => ({ name: d.name, value: d.id }))
    }
  ]);
  await db.query(
    'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
    [title, salary, department_id]
  );
  console.log(`Added role: ${title} with salary ${salary}`);
}

// Add employee
async function addEmployee() {
  const rolesResult = await db.query('SELECT id, title FROM role');
  const roles = rolesResult.rows;
  const employeesResult = await db.query('SELECT id, first_name, last_name FROM employee');
  const employees = employeesResult.rows;
  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    { type: 'input', name: 'first_name', message: "Employee's first name:" },
    { type: 'input', name: 'last_name', message: "Employee's last name:" },
    {
      type: 'list',
      name: 'role_id',
      message: "Employee's role:",
      choices: roles.map((r: any) => ({ name: r.title, value: r.id }))
    },
    {
      type: 'list',
      name: 'manager_id',
      message: "Employee's manager:",
      choices: [{ name: 'None', value: null }].concat(
        employees.map((e: any) => ({
          name: `${e.first_name} ${e.last_name}`,
          value: e.id
        }))
      )
    }
  ]);
  await db.query(
    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
    [first_name, last_name, role_id, manager_id]
  );
  console.log(`Added employee: ${first_name} ${last_name}`);
}

// Update employee role
async function updateEmployeeRole() {
  const employeesResult = await db.query('SELECT id, first_name, last_name FROM employee');
  const employees = employeesResult.rows;
  const rolesResult = await db.query('SELECT id, title FROM role');
  const roles = rolesResult.rows;
  const { employee_id, role_id } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employee_id',
      message: 'Select employee to update:',
      choices: employees.map((e: any) => ({
        name: `${e.first_name} ${e.last_name}`,
        value: e.id
      }))
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Select new role:',
      choices: roles.map((r: any) => ({ name: r.title, value: r.id }))
    }
  ]);
  await db.query(
    'UPDATE employee SET role_id = $1 WHERE id = $2',
    [role_id, employee_id]
  );
  console.log('Employee role updated.');
}

// Start the application
mainMenu();