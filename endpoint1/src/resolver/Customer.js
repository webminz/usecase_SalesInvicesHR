function address(parent, _, context) {
    return context.addressRepository.getById(parent.addressRef).then((address) => {
        return address
    }).catch((err) => {
        console.log(`Error occurred while fetching the Address ${parent.id}!`);
        console.log(JSON.stringify(err))
    })
}

function purchases(parent, _, context) {
    return context.customerRepository.getPurchasesByCustomerId(parent.id).then((purchases) => {
        return purchases
    }).catch((err) => {
        console.log(`Error occurred while fetching the purchases for customer ${parent.id}!`);
        console.log(JSON.stringify(err))
    })
}

module.exports = {
    address,
    purchases
};
