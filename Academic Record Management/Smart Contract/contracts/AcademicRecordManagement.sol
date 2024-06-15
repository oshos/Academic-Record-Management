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
        string courseTitle;
        uint test1Score;
        uint test2Score;
        uint examScore;
        uint totalScore;
        string finalGrade;
    }

    // Mapping of addresses to Students and Lecturers
    mapping(address => Student) public students;
    mapping(address => Lecturer) public lecturers;
    mapping(string => address) public matricToStudentAddress; // Mapping from matriculation number to student address

    // Nested mapping to store grades
    mapping(address => mapping(string => Grade)) public studentGrades;

    // Events
    event StudentRegistered(address studentAddress, string matriculationNumber);
    event LecturerRegistered(address lecturerAddress, string staffID);
    event CourseRegistered(address studentAddress, string courseCode, string courseTitle);
    event LecturerCourseRegistered(address lecturerAddress, string courseCode, string courseTitle);
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

    // User Registration (Lecturer)
    function registerLecturer(string memory _staffID, string memory _name, string memory _email) public {
        require(!lecturers[msg.sender].isRegistered, "Lecturer already registered");
        lecturers[msg.sender] = Lecturer(_staffID, _name, _email, true);
        emit LecturerRegistered(msg.sender, _staffID);
    }

    // Course Registration (Student)
    function registerCourse(string memory _courseCode, string memory _courseTitle) public onlyRegisteredStudent {
        emit CourseRegistered(msg.sender, _courseCode, _courseTitle);
    }

    // Course Registration (Lecturer)
    function registerCourseLecturer(string memory _courseCode, string memory _courseTitle) public onlyRegisteredLecturer {
        emit LecturerCourseRegistered(msg.sender, _courseCode, _courseTitle);
    }

    // Grade Upload (Lecturer)
    function uploadGrade(
        string memory _matriculationNumber,
        string memory _courseCode,
        string memory _courseTitle,
        uint _test1Score,
        uint _test2Score,
        uint _examScore
    ) public onlyRegisteredLecturer {
        address studentAddress = matricToStudentAddress[_matriculationNumber]; // Get the student address from matriculation number
        require(students[studentAddress].isRegistered, "Student not registered");

        uint totalScore = _test1Score + _test2Score + _examScore;
        string memory finalGrade = calculateFinalGrade(totalScore);

        studentGrades[studentAddress][_courseCode] = Grade(
            _courseCode,
            _courseTitle,
            _test1Score,
            _test2Score,
            _examScore,
            totalScore,
            finalGrade
        );
        emit GradeUploaded(msg.sender, studentAddress, _courseCode, finalGrade);
    }

    // Result Checking (Student)
    function checkResult(string memory _courseCode) public view onlyRegisteredStudent returns (uint, uint, uint, uint, string memory) {
        Grade memory grade = studentGrades[msg.sender][_courseCode];
        return (grade.test1Score, grade.test2Score, grade.examScore, grade.totalScore, grade.finalGrade);
    }

    // Internal function to calculate the final grade based on total score
    function calculateFinalGrade(uint totalScore) internal pure returns (string memory) {
        if (totalScore >= 90) {
            return "A";
        } else if (totalScore >= 80) {
            return "B";
        } else if (totalScore >= 70) {
            return "C";
        } else if (totalScore >= 60) {
            return "D";
        } else {
            return "F";
        }
    }
}
