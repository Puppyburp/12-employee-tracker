// dependencies
const inquirer = require("inquirer")
const mysql = require("mysql")
const cTable = require('console.table');

// mysql connection
const connection = mysql.createConnection({
    host: "localhost",
    port: "",
    user: "root",
    password: "",
    database: "employee_DB"
  });

connection.connect(function(err) {
    if (err) throw err
    console.log("Connected as Id" + connection.threadId)
    startPrompt();
});

// initial prompt dialogue
function startPrompt() {
  inquirer
    .prompt([
  {
      type: "list",
      message: "Welcome to the employee directory. Make a selection:",
      name: "choice",
      choices: [
                "View All Employees?", 
                "View All Employee's By Roles?",
                "View all Emplyees By Deparments", 
                "Update Employee",
                "Add Employee?",
                "Add Role?",
                "Add Department?"
              ]
  }
    ]).then(function(val) {
        switch (val.choice) {
        case "View All Employees?":
          viewAllEmployees();
          break;

        case "View All Employee's By Roles?":
          viewAllRoles();
          break;

        case "View all Emplyees By Deparments":
          viewAllDepartments();
          break;
      
        case "Add Employee?":
          addEmployee();
          break;

        case "Update Employee":
          updateEmployee();
          break;

        case "Add Role?":
          addRole();
          break;

        case "Add Department?":
          addDepartment();
          break;
        }
      })
    }
// function to return entire list of employees (from SEEDS)
function viewAllEmployees() {
  connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
  function(err, res) {
    if (err) throw err
    console.table(res)
    startPrompt()
  })
}
// function to return entire list of roles (from SEEDS)
function viewAllRoles() {
  connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
  function(err, res) {
    if (err) throw err
    console.table(res)
    startPrompt()
  })
}
// function to return entire list of departments (from SEEDS)
function viewAllDepartments() {
  connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
  function(err, res) {
    if (err) throw err
    console.table(res)
    startPrompt()
  })
}
// function to display list of titles/roles
var roleArr = [];
function selectRole() {
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }
  })
  return roleArr;
}
// function to display manager names
var managersArr = [];
function selectManager() {
  connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managersArr.push(res[i].first_name);
    }
  })
  return managersArr;
}
// function to add a new employee
function addEmployee() { 
    inquirer.prompt([
        {
          name: "firstname",
          type: "input",
          message: "Enter employee's first name:"
        },
        {
          name: "lastname",
          type: "input",
          message: "Enter employee's last name:"
        },
        {
          name: "role",
          type: "list",
          message: "What is their role?",
          choices: selectRole()
        },
        {
          name: "choice",
          type: "rawlist",
          message: "What is their manager's name?",
          choices: selectManager()
        }
    ]).then(function (val) {
      var roleId = selectRole().indexOf(val.role)
      var managerId = selectManager().indexOf(val.choice)
      connection.query("INSERT INTO employee SET ?", 
      {
          first_name: val.firstName,
          last_name: val.lastName,
          manager_id: managerId,
          role_id: roleId
          
      }, function(err){
          if (err) throw err
          console.table(val)
          // startPrompt()
          viewAllEmployees()
      })
  })
}
// function to update employee information
function updateEmployee() {
  connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
    if (err) throw err
    console.log(res)
      inquirer.prompt([
        {
          name: "lastName",
          type: "rawlist",
          choices: function() {
            var lastName = [];
            for (var i = 0; i < res.length; i++) {
              lastName.push(res[i].last_name);
            }
            return lastName;
          },
          message: "What is the employee's last name?",
        },
        {
          name: "role",
          type: "rawlist",
          message: "What is the employees new title?",
          choices: selectRole()
        },
    ])
    .then(function(val) {
      var roleId = selectRole().indexOf(val.role)
      connection.query("UPDATE employee SET ? WHERE ?", 
      [
        {
          last_name: val.lastName
        }, 
        {
          role_id: roleId
        } 
      ],
      function(err){
          if (err) throw err
          console.table(val)
          startPrompt()
      })
    });
  });
}
// function to add new title
function addRole() { 
  connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   
  function(err, res) {
    inquirer.prompt([
      {
        name: "Title",
        type: "input",
        message: "What is the new title?"
      },
      {
        name: "Salary",
        type: "input",
        message: "What is the salary?"

      } 
    ])
    .then(function(res) {
      connection.query(
          "INSERT INTO role SET ?", 
          {
            title: res.title,
            salary: res.salary,
          },
          function(err) {
            if (err) throw err
            console.table(res);
            startPrompt();
          }
        )
    });
  });
  }
// function to add new department
function addDepartment() { 
inquirer
.prompt([
    {
      name: "name",
      type: "input",
      message: "What Department would you like to add?"
    },
])
  .then(function(res) {
      connection.query(
        "INSERT INTO department SET ? ",
        {
          name: res.name
        },
        function(err) {
            if (err) throw err
            console.table(res);
            startPrompt();
        }
      )
  });
}
