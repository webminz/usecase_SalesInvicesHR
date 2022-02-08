function address(parent, _, context) {
    return context.addressRepository.getById(parent.addressRef).then((address) => {
        return address
    }).catch((err) => {
        console.log(`Error occurred while fetching the Address ${parent.id}!`);
        console.log(JSON.stringify(err))
    })
}

function purchases(parent, _, context) {
    return context.storeRepository.getPurchasesByStoreId(parent.id).then((purchases) => {
        return purchase
    }).catch((err) => {
        console.log(`Error occurred while fetching the purchases for store ${parent.id}!`);
        console.log(JSON.stringify(err))
    })
}

module.exports = {
    address,
    purchases,
};
