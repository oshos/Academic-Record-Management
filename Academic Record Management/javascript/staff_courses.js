// staff_courses.js

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

    try {
      // Fetch lecturer info
      const lecturer = await contract.methods.lecturers(userAccount).call();
      const userFullName = lecturer.name || 'Unknown User';
      const walletAddress = userAccount;

      const userDetailsElement = document.querySelector('.user-details');
      userDetailsElement.innerHTML = `${userFullName}<br />${walletAddress}`;

      // Sidebar navigation
      document.getElementById('home-menu').addEventListener('click', function() {
        window.location.href = 'staffdashboard.html';
      });

      document.getElementById('courses-menu').addEventListener('click', function() {
        window.location.href = 'staffcourses.html';
      });

      document.getElementById('results-menu').addEventListener('click', function() {
        window.location.href = 'staffupload.html';
      });

      document.getElementById('logout-menu').addEventListener('click', function() {
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = 'index.html';
      });

      // Register course
      document.querySelector('.primary-button').addEventListener('click', async function() {
        const courseCode = document.getElementById('course-code').value;
        const courseTitle = document.getElementById('course-title').value;

        if (courseCode && courseTitle) {
          try {
            await contract.methods.registerCourseLecturer(courseCode, courseTitle).send({ from: userAccount });
            alert(`Course ${courseCode} - ${courseTitle} has been registered.`);
            displayCourse(courseCode, courseTitle);
          } catch (error) {
            if (error.message.includes("Course already registered")) {
              alert("This course has already been registered.");
            } else {
              console.error(error);
              alert("An error occurred while registering the course.");
            }
          }
        } else {
          alert('Please fill in both course code and course title.');
        }
      });

      // Fetch and display registered courses
      await displayCourses();
    } catch (error) {
      console.error('Error fetching lecturer data:', error);
      alert('An error occurred while fetching data. Please try again.');
      window.location.href = 'index.html';
    }
  } else {
    alert('Please install MetaMask!');
    window.location.href = 'index.html';
  }

  async function displayCourses() {
    const coursesSection = document.querySelector('.courses-list');
    coursesSection.innerHTML = "";
    const courseRegisteredEvents = await contract.getPastEvents("LecturerCourseRegistered", {
      filter: { lecturerAddress: userAccount },
      fromBlock: 0,
      toBlock: 'latest'
    });

    if (courseRegisteredEvents.length === 0) {
      document.querySelector('.no-courses').style.display = "block";
    } else {
      document.querySelector('.no-courses').style.display = "none";
      courseRegisteredEvents.forEach(event => {
        const courseCode = event.returnValues.courseCode;
        const courseTitle = event.returnValues.courseTitle;
        displayCourse(courseCode, courseTitle);
      });
    }
  }

  function displayCourse(courseCode, courseTitle) {
    const coursesSection = document.querySelector('.courses-list');
    const courseRow = document.createElement('div');
    courseRow.classList.add('course-row');

    const courseCodeSpan = document.createElement('span');
    courseCodeSpan.classList.add('course-code');
    courseCodeSpan.textContent = courseCode;

    const courseTitleSpan = document.createElement('span');
    courseTitleSpan.classList.add('course-title');
    courseTitleSpan.textContent = courseTitle;

    const studentNoSpan = document.createElement('span');
    studentNoSpan.classList.add('student-no');
    studentNoSpan.textContent = "N/A"; // You can replace "N/A" with the actual number of students if you have that data

    courseRow.appendChild(courseCodeSpan);
    courseRow.appendChild(courseTitleSpan);
    courseRow.appendChild(studentNoSpan);
    coursesSection.appendChild(courseRow);
  }
});
