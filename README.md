# 10 SQL: Employee Tracker

## Description

A command-line application to manage a company's employee database, built with Node.js, Inquirer, and PostgreSQL. This tool allows business owners to view and manage departments, roles, and employees, helping them organize and plan their business efficiently.

---

## User Story

```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

---

## Acceptance Criteria

```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

---


## Database Schema

The database contains three tables: `department`, `role`, and `employee`.

- **department**
  - `id`: `SERIAL PRIMARY KEY`
  - `name`: `VARCHAR(30) UNIQUE NOT NULL`

- **role**
  - `id`: `SERIAL PRIMARY KEY`
  - `title`: `VARCHAR(30) UNIQUE NOT NULL`
  - `salary`: `NUMERIC NOT NULL`
  - `department_id`: `INTEGER NOT NULL` (references department)

- **employee**
  - `id`: `SERIAL PRIMARY KEY`
  - `first_name`: `VARCHAR(30) NOT NULL`
  - `last_name`: `VARCHAR(30) NOT NULL`
  - `role_id`: `INTEGER NOT NULL` (references role)
  - `manager_id`: `INTEGER` (references employee, nullable)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   cd YOUR-REPO-NAME/10-SQL/02-Challenge/Main
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up your PostgreSQL database:**
   - Create the database:
     ```sh
     createdb company_db
     ```
   - Run the schema and seed files:
     ```sh
     psql -U your_username -d company_db -f db/schema.sql
     psql -U your_username -d company_db -f db/seeds.sql
     ```

4. **Configure environment variables:**
   - Create a `.env` file in the `Main` directory:
     ```
     DB_NAME=company_db
     DB_USER=your_postgres_username
     DB_PASSWORD=your_postgres_password
     ```

5. **Build the project:**
   ```sh
   npm run build
   ```

6. **Run the application:**
   ```sh
   npm start
   ```
   Or, for development:
   ```sh
   npx ts-node src/index.ts
   ```

---

## Usage

- Use the arrow keys and Enter to navigate the menu.
- Follow prompts to view, add, or update departments, roles, and employees.

---

## Technologies Used

- Node.js
- TypeScript
- Inquirer
- PostgreSQL (`pg` package)
- dotenv
- console.table

---

## Bonus Features

- Update employee managers
- View employees by manager
- View employees by department
- Delete departments, roles, and employees
- View the total utilized budget of a department

*See the code for extension points to add these features!*

---

## License

This project is licensed under the MIT License.

---

## Walkthrough Video

[*Walkthrough video link here.*](https://app.screencastify.com/watch/RUiJcxGvZ1JZWXMtekWm)

---

## Author

- [Andrew Reyes](https://github.com/AdrewReyes)

---
