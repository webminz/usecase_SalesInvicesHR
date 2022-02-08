class AddressRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS ADDRESS (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                street TEXT,
                city TEXT,
                postalCode TEXT,
                state TEXT,
                country TEXT
            )
        `;
        return this.dao.run(sql)
    }

    create(street,city,postalCode,state,country) {
        const sql = `
            INSERT INTO ADDRESS (street,city,postalCode,state,country) VALUES (?,?,?,?,?)
        `;
        return this.dao.run(sql, [street,city,postalCode,state,country])
    }

    getById(id) {
        const sql = `
            SELECT id, street, city, postalCode, state, country FROM ADDRESS WHERE id = ?
        `;
        return this.dao.get(sql, [id])
    }

    getAll() {
        const sql = `
            SELECT id, street, city, postalCode, state, country FROM ADDRESS
        `;
        return this.dao.all(sql)
    }

    fill(sql) {
        return this.dao.run(sql)
    }
}

module.exports = {
    AddressRepository
};