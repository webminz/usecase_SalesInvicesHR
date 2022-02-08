function createEmployee(_, args, context) {
    return context.employeeRepository.create(args.department, args.firstname, args.lastname, args.hiredAt, args.email, args.phone).then(({id}) => {
        return context.employeeRepository.getById(id).then((employee) => {
            return employee
        })
    }).catch((err) => {
        console.log(`Error occurred while creating the new employee!`);
        console.log(JSON.stringify(err))
    })
}

function setBankingDetails(_, args, context) {
    return context.bankDetailsRepository.create(args.iban, args.bic).then(({id}) => {
        return context.employeeRepository.getById(args.employee).then((employee) => {
            employee.bankDetails = id 
            return context.employeeRepository.update(employee).then(() => {
                return employee
            })
        })
    }).catch((err) => {
        console.log(`Error updating the banking details for employee${args.employee}!`);
        console.log(JSON.stringify(err))
    })
}

function deleteEmployee(_, args, context) {
    return context.employeeRepository.getById(args.employee).then((employee) => {
        return context.employeeRepository.delete(employee.id).then(() => {
            return employee
        })
    }).catch((err) => {
        console.log(`Error occurred while fetching the employee ${args.employee}!`);
        console.log(JSON.stringify(err))
    })
}

function updateEmployee(_, args, context) {
    return context.employeeRepository.getById(args.employee).then((employee) => {
        if (args.department) {
            employee.department = args.department
        }
        if (args.firstname) {
            employee.firstname = args.firstname
        }
        if (args.lastname) {
            employee.lastname = args.lastname
        }
        if (args.hiredAt) {
            employee.hiredAt = args.hiredAt
        }
        if (args.email) {
            employee.email = args.email
        }
        if (args.phone) {
            employee.phone = args.phone
        }
        return context.employeeRepository.update(employee).then(() => {
            return employee
        })
    }).catch((err) => {
        console.log(`Error occurred while updating the employee ${args.employee}!`);
        console.log(JSON.stringify(err))
    })
}

function createDepartment(_, args, context) {
    return context.departmentRepository.create(args.name,args.manager).then(({id}) => {
        return context.departmentRepository.getById(id).then((department) => {
            return department
        })
    }).catch((err) => {
        console.log(`Error occurred while creating the new department!`);
        console.log(JSON.stringify(err))
    })
}

function updateDepartment(_, args, context) {
    return context.departmentRepository.getById(args.department).then((department) => {
        if (args.name) {
            department.name = args.name
        }
        if (args.manager) {
            department.manager = args.manager
        }
        return context.departmentRepository.update(department).then(() => {
            return department
        })
    }).catch((err) => {
        console.log(`Error when updating department ${args.department}!`);
        console.log(JSON.stringify(err))
    })
}

function deleteDepartment(_, args, context) {
    return context.departmentRepository.getById(args.department).then((department) => {
        return context.departmentRepository.delete(args.department).then(() => {
            return department
        })
    }).catch((err) => {
        console.log(`Error occurred while deleting department ${args.department}!`);
        console.log(JSON.stringify(err))
    })
}




module.exports = {
    createEmployee,
    setBankingDetails,
    deleteEmployee,
    updateEmployee,
    createDepartment,
    updateDepartment,
    deleteDepartment
};

/*

        createEmployee(department: ID, firstname: String, lastname: String, hiredAt: String, email: String, phone: String): Employee
        setBankingDetails(employee: ID!, iban: String, bic: String): Employee
        updateEmployee(employee: ID!, department:ID, firstname: String, lastname: String, hiredAt: String, email: String, phone: String): Employee
        deleteEmployee(employee: ID!): Employee
        createDepartment(name: String, manager: ID): Department
        updateDepartment(department: ID!,name: String, manager: ID): Department
        deleteDepartment(department: ID!): Department
*/