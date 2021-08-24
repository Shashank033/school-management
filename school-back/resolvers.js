const bcrypt = require('bcryptjs')
import AdminRegister from './models/admin_register'
import School from './models/school'
import Student from './models/student'
const jwt = require('jsonwebtoken')

const resolvers = {
    
    // create admin
    createAdminRegister: args => {
        return AdminRegister.findOne({ username: args.AdminInput.username })
            .then(username => {
                if (username) {
                    throw new Error('Username Already Exist.');
                }
                else {
                    return bcrypt.hash(args.AdminInput.password, 12)
                        .then(hashedpassword => {
                            const admin = new AdminRegister({
                                username: args.AdminInput.username,
                                password: hashedpassword,
                            })
                            return admin.save()
                        })
                }
            })
            .catch(err => {
                throw err;
            });
    },

    // create school

    createSchool: args => {
        const school = new School({
            schoolName: args.SchoolInput.schoolName,
            schoolCode: args.SchoolInput.schoolCode,
            schoolEmail: args.SchoolInput.schoolEmail,
            schoolContact: args.SchoolInput.schoolContact,
            schoolAddress: args.SchoolInput.schoolAddress,
            schoolLng: args.SchoolInput.schoolLng,
            schoolLat: args.SchoolInput.schoolLat,
            headName: args.SchoolInput.headName,
            headEmail: args.SchoolInput.headEmail,
            headContact: args.SchoolInput.headContact,
        })
        return school.save()
    },

    // create student

    createStudent: args => {
        const student = new Student({
            schoolId:  args.schoolId,
            firstName: args.StudentInput.firstName,
            lastName: args.StudentInput.lastName,
            fatherName: args.StudentInput.fatherName,
            motherName: args.StudentInput.motherName,
            dob: args.StudentInput.dob,
            gender: args.StudentInput.gender,
            catagory: args.StudentInput.catagory,
            email: args.StudentInput.email,
            contact: args.StudentInput.contact,
            class: args.StudentInput.class,
            address: args.StudentInput.address,
            studentLng: args.StudentInput.studentLng,
            studentLat: args.StudentInput.studentLat,    
        })
        return student.save()
    },

    //login jwt

    adminLogin: async ({ username, password }) => {
        const admin = await AdminRegister.findOne({ username: username });
        if (!admin) {
            throw new Error('Admin Not Exists');
        }
        const isEqual = await bcrypt.compare(password, admin.password);
        if (!isEqual) {
            throw new Error('Password Incorrect');
        }
        const token = jwt.sign({ adminId: admin.id, username: admin.username }, 'adminLoginSecretKey', {
            expiresIn: '1h'
        })
        return {
            adminId: admin.id,
            token: token,
            tokenExpiration: '1h'
        }

    },

    // get all school

    getSchool: () => {
        return School.find();
    },

    // get single school

    getSingleSchool: args => {
        return School.findById({ _id: args.schoolId });
    },

    // get all student

    getStudent: () => {
        return Student.find();
    },

    // get single student

    getSingleStudent: args => {
        return Student.findById({ _id: args.studentId });
    },

    // delete school

    deleteSchool: args => {
        return School.findByIdAndRemove(args.schoolId)
    },

    // delete student

    deleteStudent: args => {
        return Student.findByIdAndRemove(args.studentId)
    },

       // get students by school id

       getStudentsBySchoolId: args => {
        return Student.find({ schoolId: args.schoolId });
    },
}

export default resolvers;

