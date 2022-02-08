function createClient(_, args, context) {
    return context.clientRepository.create(args.name).then(({id}) => {
        return context.clientRepository.getById(id).then((client) => {
            return client
        })
    }).catch((err) => {
        console.log(`Error creating the client!`);
        console.log(JSON.stringify(err))
    })
}

function setAddress(_, args, context) {
    return context.addressRepository.create(args.street,args.city,args.postalCode,args.state,args.country).then(({id}) => {
        return context.clientRepository.getById(args.client).then((client) => {
            client.addressRef = id
            return context.clientRepository.update(client).then(() => {
                client
            })
        })
    }).catch((err) => {
        console.log(`Error setting the address for cleint ${args.client}!`);
        console.log(JSON.stringify(err))
    })
}

function setPaymentDetails(_, args, context) {
    return context.paymentDetailsRepository.create(args.iban, args.bic, args.cardNumber, args.validUntil).then(({id}) => {
        return context.clientRepository.getById(args.client).then((client) => {
            client.paymentRef = id
            return context.clientRepository.update(client).then(() => {
                return client
            })
        })
    }).catch((err) => {
        console.log(`Error setting the payment details for cleint ${args.client}!`);
        console.log(JSON.stringify(err))
    })
}

function updateClient(_, args, context) {
    return context.clientRepository.getById(args.client).then((client) => {
        client.name = args.name
        return context.clientRepository.update(client).then(() => {
            return client
        })
    }).catch((err) => {
        console.log(`Error updating client ${args.client}!`);
        console.log(JSON.stringify(err))
    })
}

function deleteClient(_, args, context) {
    return context.clientRepository.getById(args.client).then((client) => {
        return context.clientRepository.delete(args.client).then(() => {
            return client
        })
    }).catch((err) => {
        console.log(`Error deleting client ${args.client}!`);
        console.log(JSON.stringify(err))
    })
}

function createInvoice(_, args, context) {
    return context.invoiceRepository.create(args.client, args.reatedAt, args.dueAt, args.payedAt, args.total).then(({id}) => {
        return context.invoiceRepository.getById(id).then((invoice) => {
            return invoice
        })
    }).catch((err) => {
        console.log(`Error occurred while creating the new invoice!`);
        console.log(JSON.stringify(err))
    })
}

function deleteInvoice(_, args, context) {
    return context.invoiceRepository.getById(args.invoice).then((invoice) => {
        return context.invoiceRepository.delete(invoice.id).then(() => {
            return invoice
        })
    }).catch((err) => {
        console.log(`Error occurred while fetching the invoice ${args.invoice}!`);
        console.log(JSON.stringify(err))
    })
}

function updateInvoice(_, args, context) {
    return context.invoiceRepository.getById(args.invoice).then((invoice) => {
        if (args.client) {
            invoice.client = args.client
        }
        if (args.createdAt) {
            invoice.createdAt = args.createdAt
        }
        if (args.createdAt) {
            invoice.createdAt = args.createdAt
        }
        if (args.dueAt) {
            invoice.dueAt = args.dueAt
        }
        if (args.payedAt) {
            invoice.payedAt = args.payedAt
        }
        if (args.total) {
            invoice.total = args.total
        }
        return context.invoiceRepository.update(invoice).then(() => {
            return invoice
        })
    }).catch((err) => {
        console.log(`Error occurred while updating the invoice ${args.invoice}!`);
        console.log(JSON.stringify(err))
    })
}

module.exports = {
    createClient,
    setAddress,
    setPaymentDetails,
    updateClient,
    deleteClient,
    createInvoice,
    deleteInvoice,
    updateInvoice,
};

/*

      createClient(name: String): Client
        setAddress(client: ID!, street: String, city: String, postalCode: String, state: String, Country: String): Client
        setPaymentDetails(client: ID!, iban: String, bic: String, cardNumber: String, validUntil: String): Client
        updateClient(client: ID!, name: String): Client
        deleteClient(client: ID!): Client
        createInvoice(client: ID!, createdAt: String, dueAt: String, payedAt: String, total: Int): Invoice
        updateInvoice(invoice: ID!, client: ID!, createdAt: String, dueAt: String, payedAt: String, total: Int): Invoice
        deleteInvoice(invoice: ID!): Invoice
*/