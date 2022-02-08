class CustomerRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS CUSTOMER (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT, 
                email TEXT,
                addressRef INTEGER,
                FOREIGN KEY (addressRef) REFERENCES ADDRESS(id)
            )
        `;
        return this.dao.run(sql)
    }

    create(name, email) {
        const sql = `
            INSERT INTO CUSTOMER (name, email) VALUES (?, ?)
        `;
        return this.dao.run(sql, [name, email])
    }

    setAddressRef(customerId, addressRef) {
        const sql = `
            UPDATE CUSTOMER SET addressRef = ? WHERE id = ?
        `;
        return this.dao.run(sql, [customerId, addressRef])
    }

    update(customer) {
        const {id, name, email} = customer;
        const sql = `
            UPDATE CUSTOMER SET name = ?, email = ? WHERE id = ?
        `;
        return this.dao.run(sql, [name, email, id])
    }

    delete(id) {
        const sql = `
            DELETE FROM CUSTOMER WHERE id = ?
        `;
        return this.dao.run(sql, [id])
    }

    getPurchasesByCustomerId(id) {
        const sql = `
            SELECT p.id, p.date, p.customer, p.store 
            FROM PURCHASE p
            INNER JOIN CUSTOMER c ON c.id = p.customer
            WHERE c.id = ?
        `
        return this.dao.all(sql, [id])
    }

    getById(id) {
        const sql = `
            SELECT id, name, email, addressRef FROM CUSTOMER WHERE id = ?
        `;
        return this.dao.get(sql, [id])
    }

    getAll() {
        const sql = `
            SELECT id, name, email, addressRef FROM CUSTOMER
        `;
        return this.dao.all(sql)
    }


}

module.exports = {
    CustomerRepository
};
