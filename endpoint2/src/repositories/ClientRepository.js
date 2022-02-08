class ClientRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS CLIENT (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT, 
                paymentRef INTEGER,
                addressRef INTEGER,
                FOREIGN KEY (paymentRef) REFERENCES PAYMENT(id),
                FOREIGN KEY (addressRef) REFERENCES ADDRESS(id)
            )
        `;
        return this.dao.run(sql)
    }

    create(name) {
        const sql = `
            INSERT INTO CLIENT (name) VALUES (?)
        `;
        return this.dao.run(sql, [name])
    }

    update(client) {
        const {id, name, paymentRef, addressRef} = client
        const sql = `
            UPDATE CLIENT SET name = ?, paymentRef= ?, addressRef = ? WHERE id = ?
        `;
        return this.dao.run(sql, [name, id, paymentRef, addressRef])
    }

    delete(id) {
        const sql = `
            DELETE FROM CLIENT WHERE id = ?
        `;
        return this.dao.run(sql, [id])
    }

    getById(id) {
        const sql = `
            SELECT id, name, paymentRef, addressRef FROM Client WHERE id = ?
        `;
        return this.dao.get(sql, [id])
    }

    getAll() {
        const sql = `
            SELECT id, name, paymentRef, addressRef FROM Client
        `;
        return this.dao.all(sql)
    }

    getInvoicesByClientId(id) {
        const sql = `
            SELECT i.id, i.client, i.createdAt, i.dueAt, i.payedAt, i.total
            FROM INVOICE i
            INNER JOIN CLIENT c ON c.id = i.client
            WHERE c.id = ?
        `
        return this.dao.all(sql, [id])
    }

}

module.exports = {
    ClientRepository,
};
