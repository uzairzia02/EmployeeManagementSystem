#! /usr/bin/env node 
import inquirer from "inquirer";
let fees = {
    Typescript: 1000,
    SQL: 1000,
    Python: 1200,
    React: 1500,
    AI: 2000,
    Metaverse: 3000,
};
console.log("-----------------------------------------------------------\n\tWELCOME TO LEARNING MANAGEMENT SYSTEM\n-----------------------------------------------------------");
let StudentData = [];
let name = await inquirer.prompt({
    name: "name",
    type: "input",
    message: "Please Enter Student Name: ",
});
let id = await inquirer.prompt({
    name: "id",
    type: "number",
    message: "Please Enter Student ID: ",
});
console.log(`\nWelcome to Learning management System ${name.name}\n`);
console.log(`Name: ${name.name}
ID: ${id.id}\n`);
async function NewStudent() {
    let day = await inquirer.prompt({
        name: "day",
        type: "list",
        message: "Please select your Day: ",
        choices: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    });
    let course = await inquirer.prompt({
        name: "course",
        type: "list",
        message: "Please select your Course: ",
        choices: ["Typescript", "SQL", "Python", "React", "AI", "Metaverse"],
    });
    let time = await inquirer.prompt({
        name: "time",
        type: "list",
        message: "Please select your Time: ",
        choices: ["9:00 AM - 12:00 PM", "1:00 PM - 4:00 PM", "4:00 PM - 7:00 PM"],
    });
    // let fee = await inquirer.prompt({
    //     name:"fee",
    //     type:"input",
    //     message:"Please Enter Course Fee: "
    // })
    let fee = fees[course.course];
    let AdditionOfStudent = {
        day: day.day,
        course: course.course,
        time: time.time,
        fee: fee,
    };
    StudentData.push(AdditionOfStudent);
    console.table(StudentData);
    let addMore = await inquirer.prompt({
        name: "addMore",
        type: "confirm",
        message: "Do you want to add more courses?",
    });
    if (addMore.addMore) {
        NewStudent();
    }
    else {
        let nextAction = await inquirer.prompt({
            name: "nextAction",
            type: "list",
            message: "What do you want to do next?",
            choices: ["Add Course", "Delete Course", "Exit"],
        });
        if (nextAction.nextAction == "Add Course") {
            NewStudent();
        }
        else if (nextAction.nextAction == "Delete Course") {
            console.table(StudentData);
            let deleteCourse = await inquirer.prompt({
                name: "deleteCourse",
                type: "list",
                message: "Choose a course to delete",
                choices: StudentData.map((a) => ({
                    name: a.course,
                    value: a.course,
                })),
            });
            StudentData = StudentData.filter((course) => course.course != deleteCourse.deleteCourse);
            console.table(StudentData);
            let finalAction = await inquirer.prompt({
                name: "finalAction",
                type: "list",
                message: "What do you want to do now?",
                choices: ["Add Course", "Exit"],
            });
            if (finalAction.finalAction == "Add Course") {
                NewStudent();
            }
            else if (finalAction.finalAction == "Exit") {
                console.table(StudentData);
                finalFees();
                //process.exit();
            }
        }
        else {
            console.table(StudentData);
            finalFees();
            // process.exit();
        }
    }
}
async function finalFees() {
    let totalFees = 0;
    for (let i = 0; i < StudentData.length; i++) {
        totalFees += StudentData[i].fee;
    }
    console.log(`Your Total Fees due is ${totalFees}`);
    //console.log(`Due date to pay fee is two days from today`);
    let payfees = await inquirer.prompt({
        name: "payfees",
        type: "confirm",
        message: "Do you want to pay fees?",
    });
    if (payfees.payfees) {
        let paidfees = await inquirer.prompt({
            name: "paidfees",
            type: "number",
            message: "Enter the amount you paid: ",
        });
        let balancefees = totalFees - paidfees.paidfees;
        console.log(`\nYour balance fees is ${balancefees}`);
        //console.log(`Thank you for using LMS`);
    }
    console.log(`You have been successfully registered in below courses`);
    console.log(`\nYour balance fees is ${totalFees}`);
    console.table(StudentData);
    console.log(`Thank you for using LMS`);
}
// async function feespayment(){
// }
// function displayGrandTotal() {
//   let grandTotal = StudentData.reduce((total, student) => total + student.fee, 0);
//   console.log(`Grand Total of all fees: $${grandTotal}`);
// }
NewStudent();
