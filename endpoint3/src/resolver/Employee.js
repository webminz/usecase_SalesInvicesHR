function bankAccount(parent, _, context) {
    return context.bankDetailsRepository.getById(parent.bankDetails).then((bank) => {
        return bank
    }).catch((err) => {
        console.log(`Error occurred while fetching the bank details from employee ${parent.id}!`);
        console.log(JSON.stringify(err))
    })
}

function worksAt(parent, _, context) {
    return context.departmentRepository.getById(parent.department).then((department) => {
        return department
    }).catch((err) => {
        console.log(`Error occurred while fetching the department from employee ${parent.id}!`);
        console.log(JSON.stringify(err))
    })
}

module.exports = {
    bankAccount,
    worksAt
};
