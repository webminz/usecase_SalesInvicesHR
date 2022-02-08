const {ApolloServer, gql} = require('apollo-server');
const {makeExecutableSchema} = require('graphql-tools');
const Query = require('./resolver/Query');
const Mutation = require('./resolver/Mutation');
const Customer = require('./resolver/Customer');
const Store = require('./resolver/Store');
const Purchase = require('./resolver/Purchase');

const DAO = require('./dao/AppDAO');
const AddressRepository = require('./repositories/AddressRepository');
const CustomerRepository = require('./repositories/CustomerRepository');
const PurchaseRepository = require('./repositories/PurchaseRepository');
const StoreRepository = require('./repositories/StoreRepository');
const PurchaseItemRepository = require('./repositories/PurchaseItemRepository');


const dbFilePath = './sales.db';
const appDao = new DAO.AppDAO(dbFilePath);
const customerRepository = new CustomerRepository.CustomerRepository(appDao);
const purchaseRepository = new PurchaseRepository.PurchaseRepository(appDao);
const storeRepository = new StoreRepository.StoreRepository(appDao);
const addressRepository = new AddressRepository.AddressRepository(appDao);
const purchaseItemRepository = new PurchaseItemRepository.PurchaseItemRepository(appDao);

const typeDefs = gql`
    type Query {
        customer(customer: ID!): Customer
        customers: [Customer]
        purchase(purchase: ID!): Purchase
        purchases: [Purchase]
        store(store: ID!): Store
        stores: [Store]
    }

    type Mutation {
        createCustomer(name: String!, email: String): Customer!
        updateCustomer(customer: ID!, name: String, email: String): Customer
        setAddress(customer:ID!, street: String, city:String, postalCode:String, state:String, country:String): Customer
        deleteCustomer(customer: ID!): Customer
        createPurchase(customer: ID!, date: String!, store: ID!): Purchase
        addPurchaseItem(purchase:ID!, product: ID!, quantity: Int): PurchaseItem
        deletePurchase(purchase: ID!): Purchase
        createStore(manager: ID, street: String, city:String, postalCode:String, state:String, country:String): Store
        deleteStore(store: ID!): Store
    }

    type Customer {
        id: ID!
        name: String
        email: String
        address: Address
        purchases: [Purchase]
    }

    type Purchase {
        id: ID!
        date: String
        customer: Customer!
        store: Store!
        items: [PurchaseItem]
    }

    type Store {
        id: ID!
        manager: ID!
        address: Address
        purchases: [Purchase]
    }

    type Address {
        street: String
        city: String
        postalCode: String
        state: String
        country: String
    }

    type PurchaseItem {
        productId: ID!
        purchaseId: ID!
        quantity: Int
    }
`;
const resolvers = {
    Query,
    Mutation,
    Customer,
    Store,
    Purchase
};

const schema = makeExecutableSchema({typeDefs, resolvers});

const server = new ApolloServer({
    schema: schema,
    context: {
        customerRepository: customerRepository,
        purchaseRepository: purchaseRepository,
        storeRepository: storeRepository,
        addressRepository : addressRepository,
        purchaseItemRepository : purchaseItemRepository
    }
});

addressRepository.createTable().then(() => {
    customerRepository.createTable().then(() => {
        storeRepository.createTable().then(() => {
                purchaseRepository.createTable().then(() => {
                    purchaseItemRepository.createTable().then(() => {
                        server.listen({port: 4011}).then(({url}) => {
                            console.log(`Server is running at ${url}`)
                        })
                    })
            })
        })
    })
});


