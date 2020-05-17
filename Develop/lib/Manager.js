// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

// function Manager(managerName, managerId, managerEmail, managerOfficeNumber) {
//     this.name = managerName;
//     this.id = managerId;
//     this.email = managerEmail;
//     this.officeNumber = managerOfficeNumber;
//   }
//   module.exports = Manager;

const Employee = require("./employee");

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);

    this.officeNumber = officeNumber;
  }

  getOfficeNumber() {
    return this.officeNumber;
  }

  getRole() {
    return "Manager";
  }
}
module.exports = Manager;