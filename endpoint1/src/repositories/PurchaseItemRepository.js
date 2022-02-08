class PurchaseItemRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS PURCHASEITEM (
                productId INTEGER,
                purchaseId INTEGER, 
                quantity INTEGER,
                PRIMARY KEY (productId, purchaseId),
                FOREIGN KEY (purchaseId) REFERENCES PURCHASE(id)
            )
        `;
        return this.dao.run(sql)
    }

    create(productId, purchaseId, quantity) {
        const sql = `
            INSERT INTO PURCHASEITEM (productId, purchaseId, quantity) VALUES (?, ?, ?)
        `;
        return this.dao.run(sql, [productId,purchaseId,quantity])
    }

    update(productId, purchaseId, quantity) {
        const {id, name, email} = customer;
        const sql = `
            UPDATE PURCHASEITEM SET quantity = ? WHERE productId = ? AND purchaseId = ?
        `;
        return this.dao.run(sql, [quantity,productId,purchaseId])
    }

    delete(productId, purchaseId) {
        const sql = `
            DELETE FROM PURCHASEITEM WHERE id = ?
        `;
        return this.dao.run(sql, [id])
    }

    getById(productId, purchaseId) {
        const sql = `
            SELECT productId, purchaseId, quantity FROM PURCHASEITEM WHERE productId = ? AND purchaseId = ?
        `;
        return this.dao.get(sql, [productId,purchaseId])
    }

    getAll() {
        const sql = `
            SELECT productId, purchaseId, quantity FROM PURCHASEITEM
        `;
        return this.dao.all(sql)
    }


}

module.exports = {
    PurchaseItemRepository
};