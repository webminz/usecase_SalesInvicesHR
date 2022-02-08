class EmployeeRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS EMPLOYEE (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                department INTEGER, 
                bankDetails INTEGER,
                firstname TEXT,
                lastname TEXT,
                hiredAt TEXT,
                email TEXT,
                phone TEXT,
                FOREIGN KEY (department) REFERENCES DEPARTMENT(id),
                FOREIGN KEY (bankDetails) REFERENCES BANK(id)

            )
        `;
        return this.dao.run(sql)
    }

    create(department, firstname, lastname, hiredAt, email, phone) {
        const sql = `
            INSERT INTO EMPLOYEE (department, firstname, lastname, hiredAt, email, phone) VALUES (?, ?, ?, ?, ?, ?)
        `;
        return this.dao.run(sql, [department, firstname, lastname, hiredAt, email, phone])
    }

    update(employee) {
        const {id, department, firstname, lastname, hiredAt, email, phone} = employee;
        const sql = `
            UPDATE EMPLOYEE SET department = ?, firstname = ?, lastname = ?, hiredAt = ?, email = ?, phone = ? WHERE id = ?
        `;
        return this.dao.run(sql, [department, firstname, lastname, hiredAt, email, phone, id])
    }

    delete(id) {
        const sql = `
            DELETE FROM EMPLOYEE WHERE id = ?
        `;
        return this.dao.run(sql, [id])
    }

    getById(id) {
        const sql = `
            SELECT id, department, firstname, lastname, hiredAt, email, phone FROM EMPLOYEE WHERE id = ?
        `;
        return this.dao.get(sql, [id])
    }

    getAll() {
        const sql = `
            SELECT id, department, firstname, lastname, hiredAt, email, phone FROM EMPLOYEE
        `;
        return this.dao.all(sql)
    }

   
}

module.exports = {
    EmployeeRepository
};
