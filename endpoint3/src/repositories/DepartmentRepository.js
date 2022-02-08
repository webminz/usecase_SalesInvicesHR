class DepartmentRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS DEPARTMENT (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                manager INTEGER
            )
        `;
        return this.dao.run(sql)
    }

    update(department) {
        const {id,name,manager} = department
        const sql = `
            UPDATE DEPARTMENT SET name = ?, manager = ? WHERE id = ?
        `
        return this.dao.run(sql, [name,manager,id])
    }

    create(name,manager) {
        const sql = `
            INSERT INTO DEPARTMENT (name,manager) VALUES (?,?)
        `;
        return this.dao.run(sql, [name,manager])
    }

    getById(id) {
        const sql = `
            SELECT id,name,manager FROM DEPARTMENT WHERE id = ?
        `;
        return this.dao.get(sql, [id])
    }

    delete(id) {
        const sql = `
        DELETE FROM DEPARTMENT WHERE id = ?
    `;
    return this.dao.get(sql, [id])
    }

    getAll() {
        const sql = `
        SELECT id,name,manager FROM DEPARTMENT
        `;
        return this.dao.all(sql)
    }

    getEmployeesByDepartmentId(id) {
        const sql = `
            SELECT e.id, e.department, e.bankDetails, e.firstname, e.lastname, e.hiredAt, e.email, e.phone 
            FROM EMPLOYEE e
            INNER JOINT DEPARTMENT d ON d.id = e.department
            WHERE d.id = id 
        `
        return this.dao.all(sql, [id])
    }
   
}

module.exports = {
    DepartmentRepository
};