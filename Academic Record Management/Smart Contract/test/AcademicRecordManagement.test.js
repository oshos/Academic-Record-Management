const AcademicRecordManagement = artifacts.require("AcademicRecordManagement");

contract("AcademicRecordManagement", (accounts) => {
    let instance;
    const student1 = accounts[1];
    const student2 = accounts[2];
    const lecturer1 = accounts[3];

    before(async () => {
        instance = await AcademicRecordManagement.deployed();
    });

    it("should register a student", async () => {
        await instance.registerStudent("MAT123", "Alice", "alice@example.com", { from: student1 });
        const student = await instance.students(student1);
        assert.equal(student.matriculationNumber, "MAT123", "Matriculation number mismatch");
        assert.equal(student.name, "Alice", "Name mismatch");
        assert.equal(student.email, "alice@example.com", "Email mismatch");
        assert.equal(student.isRegistered, true, "Student not registered");
    });

    it("should not allow the same student to register twice", async () => {
        try {
            await instance.registerStudent("MAT123", "Alice", "alice@example.com", { from: student1 });
            assert.fail("Expected an error but did not get one");
        } catch (error) {
            assert.include(error.message, "Student already registered", "Expected 'Student already registered' error");
        }
    });

    it("should register a lecturer", async () => {
        await instance.registerLecturer("STF456", "Bob", "bob@example.com", { from: lecturer1 });
        const lecturer = await instance.lecturers(lecturer1);
        assert.equal(lecturer.staffID, "STF456", "Staff ID mismatch");
        assert.equal(lecturer.name, "Bob", "Name mismatch");
        assert.equal(lecturer.email, "bob@example.com", "Email mismatch");
        assert.equal(lecturer.isRegistered, true, "Lecturer not registered");
    });

    it("should not allow the same lecturer to register twice", async () => {
        try {
            await instance.registerLecturer("STF456", "Bob", "bob@example.com", { from: lecturer1 });
            assert.fail("Expected an error but did not get one");
        } catch (error) {
            assert.include(error.message, "Lecturer already registered", "Expected 'Lecturer already registered' error");
        }
    });

    it("should allow a registered student to register for a course", async () => {
        await instance.registerCourse("CS101", { from: student1 });
    });

    it("should not allow an unregistered student to register for a course", async () => {
        try {
            await instance.registerCourse("CS101", { from: student2 });
            assert.fail("Expected an error but did not get one");
        } catch (error) {
            assert.include(error.message, "Not a registered student", "Expected 'Not a registered student' error");
        }
    });

    it("should allow a registered lecturer to register for a course", async () => {
        await instance.registerCourseLecturer("CS101", { from: lecturer1 });
    });

    it("should not allow an unregistered lecturer to register for a course", async () => {
        try {
            await instance.registerCourseLecturer("CS101", { from: student2 });
            assert.fail("Expected an error but did not get one");
        } catch (error) {
            assert.include(error.message, "Not a registered lecturer", "Expected 'Not a registered lecturer' error");
        }
    });

    it("should allow a registered lecturer to upload grades", async () => {
        await instance.uploadGrade("MAT123", "CS101", 30, 30, 40, { from: lecturer1 });
        const grade = await instance.studentGrades(student1, "CS101");
        assert.equal(grade.totalScore.toNumber(), 100, "Total score mismatch");
        assert.equal(grade.finalGrade, "A", "Final grade mismatch");
    });

    it("should not allow an unregistered lecturer to upload grades", async () => {
        try {
            await instance.uploadGrade("MAT123", "CS101", 30, 30, 40, { from: student2 });
            assert.fail("Expected an error but did not get one");
        } catch (error) {
            assert.include(error.message, "Not a registered lecturer", "Expected 'Not a registered lecturer' error");
        }
    });

    it("should allow a registered student to check their result", async () => {
        const result = await instance.checkResult("CS101", { from: student1 });
        assert.equal(result[0].toNumber(), 30, "Test1 score mismatch");
        assert.equal(result[1].toNumber(), 30, "Test2 score mismatch");
        assert.equal(result[2].toNumber(), 40, "Exam score mismatch");
        assert.equal(result[3].toNumber(), 100, "Total score mismatch");
        assert.equal(result[4], "A", "Final grade mismatch");
    });

    it("should not allow an unregistered student to check results", async () => {
        try {
            await instance.checkResult("CS101", { from: student2 });
            assert.fail("Expected an error but did not get one");
        } catch (error) {
            assert.include(error.message, "Not a registered student", "Expected 'Not a registered student' error");
        }
    });
});