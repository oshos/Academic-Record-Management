// create.js

// Load the contract
async function getContract() {
    const web3 = new Web3(window.ethereum);
    const contractAddress = "0x35253922e7D606659A4AF9d12830C5A9fB1BA60f";
    const contractABI = [
      // Your contract ABI here
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
    return new web3.eth.Contract(contractABI, contractAddress);
  }
  
  // Function to toggle input fields based on selected role
  function toggleRoleInput() {
    const role = document.getElementById('select-role').value;
    if (role === 'student') {
      document.getElementById('matriculation-number-field').style.display = 'block';
      document.getElementById('staff-id-field').style.display = 'none';
    } else if (role === 'lecturer') {
      document.getElementById('matriculation-number-field').style.display = 'none';
      document.getElementById('staff-id-field').style.display = 'block';
    } else {
      document.getElementById('matriculation-number-field').style.display = 'none';
      document.getElementById('staff-id-field').style.display = 'none';
    }
  }
  
  document.getElementById('createForm').addEventListener('submit', async function (event) {
    event.preventDefault();
  
    const fullName = document.getElementById('full-name').value;
    const emailAddress = document.getElementById('email-address').value;
    const selectRole = document.getElementById('select-role').value;
    const matriculationNumber = document.getElementById('matriculation-number').value;
    const staffID = document.getElementById('staff-id').value;
  
    if (!fullName || !emailAddress || !selectRole || (selectRole === 'student' && !matriculationNumber) || (selectRole === 'lecturer' && !staffID)) {
      alert('Please fill in all required fields.');
      return;
    }
  
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        const contract = await getContract();
  
        if (selectRole === 'student') {
          const existingStudent = await contract.methods.students(account).call();
          if (existingStudent.isRegistered) {
            alert('Student already registered.');
            return;
          }
  
          await contract.methods.registerStudent(matriculationNumber, fullName, emailAddress).send({ from: account });
          alert('Student account created successfully!');
          window.location.href = 'studentdashboard.html';
        } else if (selectRole === 'lecturer') {
          const existingLecturer = await contract.methods.lecturers(account).call();
          if (existingLecturer.isRegistered) {
            alert('Lecturer already registered.');
            return;
          }
  
          await contract.methods.registerLecturer(staffID, fullName, emailAddress).send({ from: account });
          alert('Lecturer account created successfully!');
          window.location.href = 'staffdashboard.html';
        }
      } catch (error) {
        console.error('Error creating account:', error);
        alert('An error occurred while creating the account. Please try again.');
      }
    } else {
      alert('Please install MetaMask!');
    }
  });
  