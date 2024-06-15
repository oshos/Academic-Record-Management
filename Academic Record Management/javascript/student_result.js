document.addEventListener('DOMContentLoaded', async function() {
  const contractAddress = '0x35253922e7D606659A4AF9d12830C5A9fB1BA60f'; // Replace with your contract address
  const contractABI = [
    // Replace with your actual contract ABI
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "studentAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "courseCode",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "courseTitle",
          "type": "string"
        }
      ],
      "name": "CourseRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "lecturerAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "studentAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "courseCode",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "finalGrade",
          "type": "string"
        }
      ],
      "name": "GradeUploaded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "lecturerAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "courseCode",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "courseTitle",
          "type": "string"
        }
      ],
      "name": "LecturerCourseRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "lecturerAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "staffID",
          "type": "string"
        }
      ],
      "name": "LecturerRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "studentAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "matriculationNumber",
          "type": "string"
        }
      ],
      "name": "StudentRegistered",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "lecturers",
      "outputs": [
        {
          "internalType": "string",
          "name": "staffID",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "email",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "isRegistered",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "matricToStudentAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "studentGrades",
      "outputs": [
        {
          "internalType": "string",
          "name": "courseCode",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "courseTitle",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "test1Score",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "test2Score",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "examScore",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalScore",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "finalGrade",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "students",
      "outputs": [
        {
          "internalType": "string",
          "name": "matriculationNumber",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "email",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "isRegistered",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_matriculationNumber",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_email",
          "type": "string"
        }
      ],
      "name": "registerStudent",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_staffID",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_email",
          "type": "string"
        }
      ],
      "name": "registerLecturer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_courseCode",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_courseTitle",
          "type": "string"
        }
      ],
      "name": "registerCourse",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_courseCode",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_courseTitle",
          "type": "string"
        }
      ],
      "name": "registerCourseLecturer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_matriculationNumber",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_courseCode",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_courseTitle",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_test1Score",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_test2Score",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_examScore",
          "type": "uint256"
        }
      ],
      "name": "uploadGrade",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_courseCode",
          "type": "string"
        }
      ],
      "name": "checkResult",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ];

  if (typeof window.ethereum !== 'undefined') {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();

    const contract = new web3.eth.Contract(contractABI, contractAddress);

    const accounts = await web3.eth.getAccounts();
    const userAccount = accounts[0];

    const student = await contract.methods.students(userAccount).call();
    const userFullName = student.name || 'Unknown User';
    const walletAddress = userAccount;

    const userDetailsElement = document.querySelector('.user-details');
    userDetailsElement.innerHTML = `${userFullName}<br />${walletAddress}`;

    document.getElementById('home-menu').addEventListener('click', function() {
      window.location.href = 'studentdashboard.html';
    });

    document.getElementById('courses-menu').addEventListener('click', function() {
      window.location.href = 'studentcourses.html';
    });

    document.getElementById('results-menu').addEventListener('click', function() {
      window.location.href = 'studentresult.html';
    });

    document.getElementById('logout-menu').addEventListener('click', function() {
      window.ethereum.request({ method: 'eth_requestAccounts', params: [] });
      window.location.href = 'index.html';
    });

    async function displayResults() {
      const resultsSection = document.querySelector('.results-list');
      resultsSection.innerHTML = "";

      const courses = await contract.methods.getRegisteredCourses(userAccount).call();
      if (courses.length === 0) {
        resultsSection.innerHTML = "<div class='no-results'>No courses registered yet.</div>";
        return;
      }

      for (const courseCode of courses) {
        try {
          const grade = await contract.methods.checkResult(courseCode).call({ from: userAccount });
          displayResult(courseCode, grade.test1Score, grade.test2Score, grade.examScore, grade.finalGrade);
        } catch (error) {
          if (error.message.includes("Student not registered")) {
            displayResult(courseCode, "N/A", "N/A", "N/A", "Grades not uploaded yet");
          } else {
            console.error(error);
            alert("An error occurred while fetching the results.");
          }
        }
      }
    }

    function displayResult(courseCode, test1Score, test2Score, examScore, finalGrade) {
      const resultsSection = document.querySelector('.results-list');
      const resultRow = document.createElement('div');
      resultRow.classList.add('result-row');

      const courseCodeSpan = document.createElement('span');
      courseCodeSpan.classList.add('course-code');
      courseCodeSpan.textContent = courseCode;

      const test1Span = document.createElement('span');
      test1Span.classList.add('test1-score');
      test1Span.textContent = test1Score;

      const test2Span = document.createElement('span');
      test2Span.classList.add('test2-score');
      test2Span.textContent = test2Score;

      const examScoreSpan = document.createElement('span');
      examScoreSpan.classList.add('exam-score');
      examScoreSpan.textContent = examScore;

      const finalGradeSpan = document.createElement('span');
      finalGradeSpan.classList.add('final-grade');
      finalGradeSpan.textContent = finalGrade;

      resultRow.appendChild(courseCodeSpan);
      resultRow.appendChild(test1Span);
      resultRow.appendChild(test2Span);
      resultRow.appendChild(examScoreSpan);
      resultRow.appendChild(finalGradeSpan);

      resultsSection.appendChild(resultRow);
    }

    await displayResults();
  } else {
    alert('Please install MetaMask!');
  }
});
