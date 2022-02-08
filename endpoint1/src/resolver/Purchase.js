function customer(parent, _, context) {
    return context.purchaseRepository.getCustomerByPurchaseId(parent.id).then((customer) => {
        return customer
    }).catch((err) => {
        console.log(`Error occurred while fetching the customer ${parent.id}!`);
        console.log(JSON.stringify(err))
    })
}

function store(parent, _, context) {
    return context.purchaseRepository.getStoreByPurchaseId(parent.id).then((store) => {
        return store
    }).catch((err) => {
        console.log(`Error occurred while fetching the store from ${parent.id}!`);
        console.log(JSON.stringify(err))
    })
}

function items(parent, _, context) {
    return context.purchaseRepository.getPurchaseItemsByPurchaseId(parent.id).then((items) => {
        return items
    }).catch((err) => {
        console.log(`Error occured while fetching the purchase items from purchase ${parent.id}!`);
        console.log(JSON.stringify(err))
    })
}

module.exports = {
    customer,
    store,
    items
};
