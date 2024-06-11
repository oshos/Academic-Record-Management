// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract AcademicRecordManagement {
    // Structs for Students and Lecturers
    struct Student {
        string matriculationNumber;
        string name;
        string email;
        bool isRegistered;
    }

    struct Lecturer {
        string staffID;
        string name;
        string email;
        bool isRegistered;
    }

    // Struct for Grades
    struct Grade {
        string courseCode;
        uint testScore;
        uint examScore;
        uint totalScore;
        string finalGrade;
    }

    // Mapping of addresses to Students and Lecturers
    mapping(address => Student) public students;
    mapping(address => Lecturer) public lecturers;
    mapping(string => address) public matricToStudentAddress; // New mapping from matriculation number to student address

    // Nested mapping to store grades
    mapping(address => mapping(string => Grade)) public studentGrades;

    // Events
    event StudentRegistered(address studentAddress, string matriculationNumber);
    event LecturerRegistered(address lecturerAddress, string staffID);
    event CourseRegistered(address studentAddress, string courseCode);
    event GradeUploaded(address lecturerAddress, address studentAddress, string courseCode, string finalGrade);

    // Modifier to check if the caller is a registered student
    modifier onlyRegisteredStudent() {
        require(students[msg.sender].isRegistered, "Not a registered student");
        _;
    }

    // Modifier to check if the caller is a registered lecturer
    modifier onlyRegisteredLecturer() {
        require(lecturers[msg.sender].isRegistered, "Not a registered lecturer");
        _;
    }

    // User Registration (Student and Lecturer)
    function registerStudent(string memory _matriculationNumber, string memory _name, string memory _email) public {
        require(!students[msg.sender].isRegistered, "Student already registered");
        students[msg.sender] = Student(_matriculationNumber, _name, _email, true);
        matricToStudentAddress[_matriculationNumber] = msg.sender; // Map matriculation number to student address
        emit StudentRegistered(msg.sender, _matriculationNumber);
    }

    function registerLecturer(string memory _staffID, string memory _name, string memory _email) public {
        require(!lecturers[msg.sender].isRegistered, "Lecturer already registered");
        lecturers[msg.sender] = Lecturer(_staffID, _name, _email, true);
        emit LecturerRegistered(msg.sender, _staffID);
    }

    // Course Registration (Student)
    function registerCourse(string memory _courseCode) public onlyRegisteredStudent {
        emit CourseRegistered(msg.sender, _courseCode);
    }

    // Grade Upload (Lecturer)
    function uploadGrade(string memory _matriculationNumber, string memory _courseCode, uint _testScore, uint _examScore, uint _totalScore, string memory _finalGrade) public onlyRegisteredLecturer {
        address studentAddress = matricToStudentAddress[_matriculationNumber]; // Get the student address from matriculation number
        require(students[studentAddress].isRegistered, "Student not registered");
        studentGrades[studentAddress][_courseCode] = Grade(_courseCode, _testScore, _examScore, _totalScore, _finalGrade);
        emit GradeUploaded(msg.sender, studentAddress, _courseCode, _finalGrade);
    }

    // Result Checking (Student)
    function checkResult(string memory _courseCode) public view onlyRegisteredStudent returns (uint, uint, uint, string memory) {
        Grade memory grade = studentGrades[msg.sender][_courseCode];
        return (grade.testScore, grade.examScore, grade.totalScore, grade.finalGrade);
    }
}
