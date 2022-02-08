
function customers(_0, _1, context) {
    return context.customerRepository.getAll().then((customers) => {
        return customers
    }).catch((err) => {
        console.log(`Error occurred while fetching all customers!`);
        console.log(JSON.stringify(err))
    })
}

function customer(_, args, context) {
    return context.customerRepository.getById(args.customer).then((customer) => {
        return customer
    }).catch((err) => {
        console.log(`Error occurred while fetching the customer ${args.customer}!`);
        console.log(JSON.stringify(err))
    })
}

function purchases(_0, _1, context) {
    return context.purchaseRepository.getAll().then((purchases) => {
        return purchases
    }).catch((err) => {
        console.log('Error occurred while fetching all purchases!');
        console.log(JSON.stringify(err))
    })
}

function purchase(_, args, context) {
    return context.purchaseRepository.getById(args.purchase).then((purchase) => {
        return purchase
    }).catch((err) => {
        console.log(`Error occurred while fetching the purchase ${args.purchase}!`);
        console.log(JSON.stringify(err))
    })
}

function stores(_0, _1, context) {
    return context.storeRepository.getAll().then((purchases) => {
        return purchases
    }).catch((err) => {
        console.log('Error occurred while fetching all purchases!');
        console.log(JSON.stringify(err))
    })
}

function store(_, args, context) {
    return context.storeRepository.getById(args.store).then((store) => {
        return store
    }).catch((err) => {
        console.log(`Error occurred while fetching the store ${args.store}!`);
        console.log(JSON.stringify(err))
    })
}

module.exports = {
    customers,
    customer,
    purchases,
    purchase,
    store,
    stores
};
/*
    customer(customer: ID!): Customer
    customers: [Customer]!
    purchase(purchase: ID!): Purchase
    purchases: [Purchase]!
    store(store: ID!): Store
    stores: [Store]!

*/