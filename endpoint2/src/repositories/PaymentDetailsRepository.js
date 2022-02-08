class PaymentDetailsRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS PAYMENT (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                iban TEXT,
                bic TEXT,
                cardNumber TEXT,
                validUntil TEXT
            )
        `;
        return this.dao.run(sql)
    }

    create(iban,bic,cardNumber,validUntil) {
        const sql = `
            INSERT INTO PAYMENT (iban,bic,cardNumber,validUntil) VALUES (?,?,?,?)
        `;
        return this.dao.run(sql, [iban,bic,cardNumber,validUntil])
    }

    getById(id) {
        const sql = `
            SELECT id,iban,bic,cardNumber,validUntil FROM PAYMENT WHERE id = ?
        `;
        return this.dao.get(sql, [id])
    }

    getAll() {
        const sql = `
            SELECT id,iban,bic,cardNumber,validUntil FROM PAYMENT
        `;
        return this.dao.all(sql)
    }

    fill(sql) {
        return this.dao.run(sql)
    }
}

module.exports = {
    PaymentDetailsRepository
};