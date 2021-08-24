import { buildSchema } from 'graphql'

const schema = buildSchema(`
    
    type adminRegister {
        id: ID!
        username: String!
        password: String!
    }

    type schools {
        id: ID!
        schoolName: String!
        schoolCode: String!
        schoolEmail: String!
        schoolContact: String!
        schoolAddress: String!
        schoolLng: String!
        schoolLat: String!
        headName: String!
        headEmail: String!
        headContact: String!
    }

    type student {
        id: ID!
        schoolId:ID!
        firstName: String!
        lastName: String!
        fatherName: String!
        motherName: String!
        dob: String!
        gender: String!
        catagory: String!
        email: String!
        contact: String!
        class: String!
        address: String!
        studentLng: String!
        studentLat: String!
    }

    type adminAuth {
        adminId: ID!
        token: String!
        tokenExpiration: String!
    }

    input adminInput {
        username: String!
        password: String!
    }

    input schoolInput {
        schoolName: String!
        schoolCode: String!
        schoolEmail: String!
        schoolContact: String!
        schoolAddress: String!
        schoolLng: String!
        schoolLat: String!
        headName: String!
        headEmail: String!
        headContact: String!
    }

    input studentInput {
        firstName: String!
        lastName: String!
        fatherName: String!
        motherName: String!
        dob: String!
        gender: String!
        catagory: String!
        email: String!
        contact: String!
        class: String!
        address: String!
        studentLng: String!
        studentLat: String!
    }

    type Query {
        getAdminRegister: [adminRegister]
        adminLogin(username: String! password: String!): adminAuth
        getSchool: [schools]
        getSingleSchool(schoolId:ID!): schools
        getStudent: [student]
        getSingleStudent(studentId:ID!): student
        getStudentsBySchoolId(schoolId:ID!): [student]
    }

    type Mutation {
        createAdminRegister(AdminInput: adminInput): adminRegister
        createSchool(SchoolInput: schoolInput): schools
        createStudent(schoolId:ID!, StudentInput: studentInput): student
        deleteSchool(schoolId:ID!): schools
        deleteStudent(studentId:ID!): student
    }
`)


export default schema;