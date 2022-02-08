const {ApolloServer, gql} = require('apollo-server');
const {makeExecutableSchema} = require('graphql-tools');
const Query = require('./resolver/Query');
const Mutation = require('./resolver/Mutation');
const Employee = require('./resolver/Employee');
const Department = require('./resolver/Department');

const DAO = require('./dao/AppDAO');
const BankDetailsRepository = require('./repositories/BankDetailsRepository');
const DepartmentRepository = require('./repositories/DepartmentRepository');
const EmployeeRepository = require('./repositories/EmployeeRepository');

const dbFilePath = './employees.db';
const appDao = new DAO.AppDAO(dbFilePath);
const bankDetailsRepository = new BankDetailsRepository.BankDetailsRepository(appDao);
const departmentRepository = new DepartmentRepository.DepartmentRepository(appDao);
const employeeRepository = new EmployeeRepository.EmployeeRepository(appDao);

const typeDefs = gql`
    type Query {
        employee(employee: ID!): Employee
        employees: [Employee]
        departments: [Department]
        department(department: ID!): Department
    }

    type Mutation {
        createEmployee(department: ID, firstname: String, lastname: String, hiredAt: String, email: String, phone: String): Employee
        setBankingDetails(employee: ID!, iban: String, bic: String): Employee
        updateEmployee(employee: ID!, department:ID, firstname: String, lastname: String, hiredAt: String, email: String, phone: String): Employee
        deleteEmployee(employee: ID!): Employee
        createDepartment(name: String, manager: ID): Department
        updateDepartment(department: ID!,name: String, manager: ID): Department
        deleteDepartment(department: ID!): Department
    }

    type Employee {
        id: ID!
        worksAt: Department
        bankAccount: BankingDetails
        firstname: String
        lastname: String
        hiredAt: String
        email: String
        phone: String
    }

    type Department {
        id: ID!
        name: String
        manager: Employee
        workingAt: [Employee]
    }

    type BankingDetails {
        iban: String
        bic: String
    }
`;
const resolvers = {
    Query,
    Mutation,
    Employee,
    Department
};

const schema = makeExecutableSchema({typeDefs, resolvers});

const server = new ApolloServer({
    schema: schema,
    context: {
        bankDetailsRepository: bankDetailsRepository,
        departmentRepository: departmentRepository,
        employeeRepository: employeeRepository,
    }
});

bankDetailsRepository.createTable().then(() => {
    departmentRepository.createTable().then(() => {
        employeeRepository.createTable().then(() => {
            server.listen({port: 4013}).then(({url}) => {
                console.log(`Server is running at ${url}`)
            })   
         });
    })
})


