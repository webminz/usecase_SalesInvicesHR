
function departments(_0, _1, context) {
    return context.departmentRepository.getAll().then((departments) => {
        return departments
    }).catch((err) => {
        console.log('Error occurred while fetching all employees!');
        console.log(JSON.stringify(err))
    })
}

function department(_, args, context) {
    return context.departmentRepository.getById(args.department).then((department) => {
        return department
    }).catch((err) => {
        console.log(`Error occurred while fetching the employee ${args.employee}!`);
        console.log(JSON.stringify(err))
    })
}


function employees(_0, _1, context) {
    return context.employeeRepository.getAll().then((employees) => {
        return employees
    }).catch((err) => {
        console.log('Error occurred while fetching all employees!');
        console.log(JSON.stringify(err))
    })
}

function employee(_, args, context) {
    return context.employeeRepository.getById(args.employee).then((employee) => {
        return employee
    }).catch((err) => {
        console.log(`Error occurred while fetching the employee ${args.employee}!`);
        console.log(JSON.stringify(err))
    })
}


module.exports = {
    employees,
    employee,
    departments,
    department
};

/*
 employee(employee: ID!): Employee
        employees: [Employee]!
        departments: [Department]!
        department(department: ID!): Department
*/