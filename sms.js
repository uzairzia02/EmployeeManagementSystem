#! /usr/bin/env node 
import inquirer from "inquirer";
console.log("------------------------------------------------------------------\n            WELCOME TO EMPLOYEE MANAGEMENT SYSTEM\n------------------------------------------------------------------");
//All employees  data will be pushed in it
let AllEmployeesData = [];
async function NewEmployee() {
    let empID = await inquirer.prompt({
        name: "empID",
        type: "number",
        message: "Please Enter the Employee ID: ",
    });
    let empName = await inquirer.prompt({
        name: "empName",
        type: "input",
        message: "Please Enter Employee Name: ",
    });
    let empSalary = await inquirer.prompt({
        name: "empSalary",
        type: "number",
        message: "Please Enter Employee Salary: ",
    });
    let empAge = await inquirer.prompt({
        name: "empAge",
        type: "number",
        message: "Please Enter Employee Age: ",
    });
    let empDepartment = await inquirer.prompt({
        name: "empDepartment",
        type: "input",
        message: "Please Enter Employee Department: ",
    });
    let joiningDate = await inquirer.prompt({
        name: "joiningDate",
        type: "input",
        message: "Please Enter Employee Joining Date: ",
    });
    //new employees data will be pushed in this
    let additionOfEmployee = {
        empID: empID.empID,
        empName: empName.empName,
        empSalary: empSalary.empSalary,
        empAge: empAge.empAge,
        empDepartment: empDepartment.empDepartment,
        joiningDate: joiningDate.joiningDate,
    };
    AllEmployeesData.push(additionOfEmployee); // this data will be pushed in the employees data array above
    console.table(AllEmployeesData);
    let addMore = await inquirer.prompt({
        name: "addMore",
        type: "confirm",
        message: "Do you want to add more employee?",
    });
    if (addMore.addMore) {
        NewEmployee();
    }
    else {
        let nextAction = await inquirer.prompt({
            name: "nextAction",
            type: "list",
            message: "What do you want to do next?",
            choices: ["Delete Employee", "Exit"],
        });
        if (nextAction.nextAction == "Exit") {
            console.table(AllEmployeesData);
            process.exit();
        }
        else if (nextAction.nextAction == "Delete Employee") {
            let deleteEmployee = await inquirer.prompt({
                name: "deleteEmployee",
                type: "list",
                message: "Choose an employee to delete",
                choices: AllEmployeesData.map((a) => ({
                    name: a.empName,
                    value: a.empID,
                })),
            });
            AllEmployeesData = AllEmployeesData.filter((employee) => employee.empID != deleteEmployee.deleteEmployee);
            console.table(AllEmployeesData);
            let finalInput = await inquirer.prompt({
                name: "finalInput",
                type: "list",
                message: "What do you want to do now?",
                choices: ["Add new employee", "exit"],
            });
            if (finalInput.finalInput === "Add new employee") {
                NewEmployee();
            }
            else {
                console.table(AllEmployeesData);
                process.exit(0);
            }
        }
    }
}
NewEmployee();
