function client(parent, _, context) {
    return context.invoiceRepository.getPartnerByInvoiceId(parent.id).then((partner) => {
        return partner
    }).catch((err) => {
        console.log(`Error occurred while fetching the partner for invoice ${parent.id}!`);
        console.log(JSON.stringify(err))
    })
}

module.exports = {
    client
}
