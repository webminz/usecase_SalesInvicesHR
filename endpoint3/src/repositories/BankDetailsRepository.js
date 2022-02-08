class BankDetailsRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS BANK (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                iban TEXT,
                bic TEXT
            )
        `;
        return this.dao.run(sql)
    }

    create(iban,bic) {
        const sql = `
            INSERT INTO BANK (iban,bic) VALUES (?,?)
        `;
        return this.dao.run(sql, [iban,bic])
    }

    getById(id) {
        const sql = `
            SELECT id,iban,bic FROM BANK WHERE id = ?
        `;
        return this.dao.get(sql, [id])
    }

    delete(id) {
        const sql = `
        DELETE FROM BANK WHERE id = ?
    `;
    return this.dao.get(sql, [id])
    }

    getAll() {
        const sql = `
            SELECT id,iban,bic FROM PAYMENT
        `;
        return this.dao.all(sql)
    }

    fill(sql) {
        return this.dao.run(sql)
    }
}

module.exports = {
    BankDetailsRepository
};