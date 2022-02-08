function address(parent, _, context) {
    return context.addressRepository.getById(parent.addressRef).then((address) => {
        return address
    }).catch((err) => {
        console.log(`Error retrieving the address of client ${parent.id}!`);
        console.log(JSON.stringify(err))
    });
}

function paymentDetails(parent, _, context) {
    return context.paymentDetailsRepository.getById(parent.paymentRef).then((payment) => {
        return payment
    }).catch((err) => {
        console.log(`Error retrieving the payment details of client ${parent.id}!`);
        console.log(JSON.stringify(err))
    })
}

function invoices(parent, _, context) {
    return context.clientRepository.getInvoicesByClientId(parent.id).then((invoices) => {
        return invoices
    }).catch((err) => {
        console.log(`Error retrieving the invoices of client ${parent.id}!`);
        console.log(JSON.stringify(err))
    })
}

module.exports = {
    address,
    paymentDetails,
    invoices
}
