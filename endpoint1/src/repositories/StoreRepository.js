class StoreRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS STORE (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                manager INTEGER,
                addressRef INTEGER,
                FOREIGN KEY (addressRef) REFERENCES ADDRESS(id)
            )
        `;
        return this.dao.run(sql)
    }

    create(manager, addressRef) {
        const sql = `
            INSERT INTO STORE (manager,addressRef) VALUES (?,?)
        `;
        return this.dao.run(sql, [manager,addressRef])
    }

    delete(id) {
        const sql = `
            DELETE FROM STORE WHERE id = ?
        `;
        return this.dao.run(sql, [id])
    }

    getById(id) {
        const sql = `
            SELECT id, manager, addressRef FROM STORE WHERE id = ?
        `;
        return this.dao.get(sql, [id])
    }

    getPurchasesByStoreId(id) {
        const sql = `
            SELECT p.id, p.date, p.customer, p.store 
            FROM PURCHASE p
            INNER JOIN STORE s ON s.id = p.store
            WHERE s.id = ?
        `
        return this.dao.all(sql, [id])
    }

    getAll() {
        const sql = `
            SELECT id, manager, addressRef FROM STORE
        `;
        return this.dao.all(sql)
    }

   
}

module.exports = {
    StoreRepository
};
