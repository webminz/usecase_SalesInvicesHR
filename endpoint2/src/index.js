const {ApolloServer, gql} = require('apollo-server');
const {makeExecutableSchema} = require('graphql-tools');
const Query = require('./resolver/Query');
const Mutation = require('./resolver/Mutation');
const Invoice = require('./resolver/Invoice');
const Client = require('./resolver/Client');

const DAO = require('./dao/AppDAO');
const AddressRepository = require('./repositories/AddressRepository');
const PaymentDetailsRepository = require('./repositories/PaymentDetailsRepository');
const ClientRepository = require('./repositories/ClientRepository');
const InvoiceRepository = require('./repositories/InvoiceRepository');

const dbFilePath = './invoices.db';
const appDao = new DAO.AppDAO(dbFilePath);
const addressRepository = new AddressRepository.AddressRepository(appDao);
const paymentDetailsRepository = new PaymentDetailsRepository.PaymentDetailsRepository(appDao);
const clientRepository = new ClientRepository.ClientRepository(appDao);
const invoiceRepository = new InvoiceRepository.InvoiceRepository(appDao);


const typeDefs = gql`
    type Query {
        clients: [Client]
        client(client: ID!): Client
        invoice(invoice: ID!): Invoice
        invoices: [Invoice]
    }

    type Mutation {
        createClient(name: String): Client
        setAddress(client: ID!, street: String, city: String, postalCode: String, state: String, Country: String): Client
        setPaymentDetails(client: ID!, iban: String, bic: String, cardNumber: String, validUntil: String): Client
        updateClient(client: ID!, name: String): Client
        deleteClient(client: ID!): Client
        createInvoice(client: ID!, createdAt: String, dueAt: String, payedAt: String, total: Int): Invoice
        updateInvoice(invoice: ID!, client: ID!, createdAt: String, dueAt: String, payedAt: String, total: Int): Invoice
        deleteInvoice(invoice: ID!): Invoice
    }
    
    type Client {
        id: ID!
        name: String
        paymentDetails: PaymentDetails
        address: Address
        invoices: [Invoice]
    }

    type Invoice {
        id: ID!
        client: Client!
        createdAt: String
        dueAt: String
        payedAt: String
        total: Int
    }

    type Address {
        street: String
        city: String
        postalCode: String
        state: String
        country: String
    }

    type PaymentDetails {
        iban: String
        bic: String
        cardNumber: String
        validUntil: String
    }
`;
const resolvers = {
    Query,
    Mutation,
    Invoice,
    Client
};

const schema = makeExecutableSchema({typeDefs, resolvers});

const server = new ApolloServer({
    schema: schema,
    context: {
        addressRepository: addressRepository,
        paymentDetailsRepository: paymentDetailsRepository,
        clientRepository: clientRepository,
        invoiceRepository: invoiceRepository,
    }
});

addressRepository.createTable().then(()=> {
    paymentDetailsRepository.createTable().then(() => {
        clientRepository.createTable().then(() => {
            invoiceRepository.createTable().then(() => {
                server.listen({port: 4012}).then(({url}) => {
                    console.log(`Server is running at ${url}`)
                })
            })
        })
    })
});


