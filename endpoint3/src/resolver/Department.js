function workingAt(parent, _, context) {
    return context.departmentRepository.getEmployeesByDepartmentId(parent.id).then((employees) => {
        return employees
    }).catch((err) => {
        console.log(`Error occurred while the employees working at department ${parent.id}!`);
        console.log(JSON.stringify(err))
    })
}

function manager(parent, _, context) {
    return context.employeeRepository.getById(parent.manager).then((employee) => {
        return employee
    }).catch((err) => {
        console.log(`Error occurred while fetching the manager of department ${parent.id}!`);
        console.log(JSON.stringify(err))
    })
}

module.exports = {
    workingAt,
    manager
};