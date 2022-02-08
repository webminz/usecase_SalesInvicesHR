function createCustomer(_, args, context) {
    return context.customerRepository.create(args.name, args.email).then(({id}) => {
        return context.customerRepository.getById(id).then((customer) => {
            return customer
        })
    }).catch((err) => {
        console.log(`Error occurred while creating the new customer!`);
        console.log(JSON.stringify(err))
    })
}

function updateCustomer(_, args, context) {
    return context.customerRepository.getById(args.customer).then((customer) => {
        if (args.name) {
            customer.name = args.name
        }
        if (args.email) {
            customer.email = args.email
        }
        return context.customerRepository.update(customer).then(() => {
            return context.customerRepository.getById(customer.id).then((result) => {
                return result
            })
        })
    }).catch((err) => {
        console.log(`Error occurred while updating the customer ${args.customer}!`);
        console.log(JSON.stringify(err))
    })
}

function setAddress(_, args, context) {
        return context.addressRepository.create(args.street,args.city, args.postalCode, args.state, args.country).then(({id}) => {
            return context.customerRepository.setAddressRef(args.customer, id).then(() => {
                context.customerRepository.getById(args.customer).then((customer) => {
                    return customer
                })
            })
        }).catch((err) => {
            console.log(`Error setting the address for customer ${args.customer}!`);
            console.log(JSON.stringify(err))
        })
       
}

function deleteCustomer(_, args, context) {
    return context.customerRepository.getById(args.customer).then((customer) => {
        return context.customerRepository.delete(customer.id).then(() => {
            return customer
        })
    }).catch((err) => {
        console.log(`Error occurred while fetching the customer ${args.customer}!`);
        console.log(JSON.stringify(err))
    })
}



function createPurchase(_, args, context) {
    return context.purchaseRepository.create(args.date, args.customer, args.store).then(({id}) => {
        return context.purchaseRepository.getById(id).then((purchase) => {
            return purchase
        })
    }).catch((err) => {
        console.log(`Error occurred while creating the new purchase!`);
        console.log(JSON.stringify(err))
    })
}

function addPurchaseItem(_, args, context) {
    return context.purchaseItemRepository.create(args.product, args.purchase, args.quantity).then(() => {
        return {
            productId : args.product,
            purchaseId : args.purchase,
            quantity : args.quantity
        }
    }).catch((err) => {
        console.log(`Error occurred while creating purchase item`);
        console.log(JSON.stringify(err))
    })
}

function deletePurchase(_, args, context) {
    return context.purchaseRepository.getById(args.purchase).then((purchase) => {
        return context.purchaseRepository.delete(purchase.id).then(() => {
            return purchase
        })
    }).catch((err) => {
        console.log(`Error occurred while fetching the purchase ${args.purchase}!`);
        console.log(JSON.stringify(err))
    })
}



function createStore(_, args, context) {
    return context.addressRepository.create(args.street,args.city, args.postalCode, args.state, args.country).then(({id}) => {
        return context.storeRepository.create(args.manager, id).then((result) => {
            return context.storeRepository.getById(result.id).then((store) => {
                return store
            })
        })
    }).catch((err) => {
        console.log(`Error occurred while creating the new store!`);
        console.log(JSON.stringify(err))
    })
}


function deleteStore(_, args, context) {
    return context.storeRepository.getById(args.store).then((store) => {
        return context.storeRepository.delete(store.id).then(() => {
            return store
        })
    }).catch((err) => {
        console.log(`Error occurred while deleting the store ${args.store}!`);
        console.log(JSON.stringify(err))
    })
}


module.exports = {
    createCustomer,
    setAddress,
    deleteCustomer,
    updateCustomer,
    createPurchase,
    addPurchaseItem,
    deletePurchase,
    createStore,
    deleteStore,
};


/*
        createCustomer(name: String!, email: String): Customer!
        updateCustomer(customer: ID!, name: String, email: String): Customer
        setAddress(customer:ID!, street: String, city:String, postalCode:String, state:String, country:String): Customer
        deleteCustomer(customer: ID!): Customer
        createPurchase(customer: ID!, date: String!, store: ID!): Purchase
        addPurchaseItem(purchase:ID!, product: ID!, quantity: Int): PurchaseItem
        deletePurchase(purchase: ID!): Purchase
        createStore(manager: ID, street: String, city:String, postalCode:String, state:String, country:String): Store
        deleteStore(store: ID!): Store
*/