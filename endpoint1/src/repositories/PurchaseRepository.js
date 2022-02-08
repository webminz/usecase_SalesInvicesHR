class PurchaseRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS PURCHASE (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date TEXT, 
                customer INTEGER,
                store INTEGER,
                FOREIGN KEY (customer) REFERENCES customers(id),
                FOREIGN KEY (store) REFERENCES stores(id)
            )
        `;
        return this.dao.run(sql)
    }

    create(date, customer, store) {
        const sql = `
            INSERT INTO PURCHASE (date, customer, store) VALUES (?, ?, ?)
        `;
        return this.dao.run(sql, [date, customer, store])
    }

    delete(id) {
        const sql = `
            DELETE FROM PURCHASE WHERE id = ?
        `;
        return this.dao.run(sql, [id])
    }

    getById(id) {
        const sql = `
            SELECT id, date, customer, store FROM PURCHASE WHERE id = ?
        `;
        return this.dao.get(sql, [id])
    }

    getCustomerByPurchaseId(id) {
        const sql = `
            SELECT c.id, c.name, c.addressRef, c.email
            FROM PURCHASE p
            INNER JOIN CUSTOMER c ON p.customer = c.id
            WHERE p.id = ?
        `;
        return this.dao.get(sql, [id])
    }

    getStoreByPurchaseId(id) {
        const sql = `
            SELECT s.id, s.manager, s.addressRef
            FROM PURCHASE p
            INNER JOIN STORE s ON p.store = s.id
            WHERE p.id = ?
        `;
        return this.dao.get(sql, [id])
    }

    getPurchaseItemsByPurchaseId(id) {
        const sql = `
            SELECT i.productId, i.purchaseId, i.quantity
            FROM PURCHASEITEM i
            INNER JOIN PURCHASE p ON p.id = i.purchaseId
            WHERE p.id = ?
        `
        return this.dao.all(sql, [id])
    }

    getAll() {
        const sql = `
            SELECT id, date, customer, store FROM PURCHASE
        `;
        return this.dao.all(sql)
    }

}

module.exports = {
    PurchaseRepository
};
