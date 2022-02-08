
function clients(_0, _1, context) {
    return context.clientRepository.getAll().then((clients) => {
        return clients
    }).catch((err) => {
        console.log('Error occurred while fetching all clients!');
        console.log(JSON.stringify(err))
    })
}

function client(_, args, context) {
    return context.clientRepository.getById(args.invoice).then((client) => {
        return client
    }).catch((err) => {
        console.log(`Error occurred while fetching the client ${args.invoice}!`);
        console.log(JSON.stringify(err))
    })
}

function invoices(_0, _1, context) {
    return context.invoiceRepository.getAll().then((invoices) => {
        return invoices
    }).catch((err) => {
        console.log('Error occurred while fetching all invoices!');
        console.log(JSON.stringify(err))
    })
}

function invoice(_, args, context) {
    return context.invoiceRepository.getById(args.invoice).then((invoice) => {
        return invoice
    }).catch((err) => {
        console.log(`Error occurred while fetching the invoice ${args.invoice}!`);
        console.log(JSON.stringify(err))
    })
}



module.exports = {
    clients,
    client,
    invoices,
    invoice
};


/*
     clients: [Client]!
        client(client: ID!): Client
        invoice(invoice: ID!): Invoice
        invoices: [Invoice]!
*/