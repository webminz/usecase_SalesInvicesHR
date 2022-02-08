class InvoiceRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS INVOICE (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                client INTEGER, 
                createdAt TEXT,
                dueAt TEXT,
                payedAt TEXT,
                total INTEGER,
                FOREIGN KEY (client) REFERENCES CLIENT(id)
            )
        `;
        return this.dao.run(sql)
    }

    create(client, createdAt, dueAt, payedAt, total) {
        const sql = `
            INSERT INTO INVOICE (client, createdAt, dueAt, payedAt, total) VALUES (?, ?, ?, ?, ?)
        `;
        return this.dao.run(sql, [client, createdAt, dueAt, payedAt, total])
    }

    update(invoice) {
        const {id, client, createdAt, dueAt, payedAt, total} = invoice
        const sql = `
            UPDATE INVOICE SET client = ?, createdAt = ?, dueAt = ?, payedAt = ?, total = ? WHERE id = ?
        `;
        return this.dao.run(sql, [client,createdAt, dueAt, payedAt,total, id])
    }

    delete(id) {
        const sql = `
            DELETE FROM INVOICE WHERE id = ?
        `;
        return this.dao.run(sql, [id])
    }

    getById(id) {
        const sql = `
            SELECT id, client, createdAt, dueAt, payedAt, total FROM INVOICE WHERE id = ?
        `;
        return this.dao.get(sql, [id])
    }

    getAll() {
        const sql = `
            SELECT id, client, createdAt, dueAt, payedAt, total FROM INVOICE
        `;
        return this.dao.all(sql)
    }

    getPartnerByInvoiceId(id) {
        const sql = `
            SELECT c.id, c.name, c.paymentRef, c.addressRef 
            FROM INVOICE i
            INNER JOIN CLIENT c ON i.client = p.id
            WHERE i.id = ? 
        `;
        return this.dao.get(sql, [id])
    }

    
}

module.exports = {
    InvoiceRepository,
};
