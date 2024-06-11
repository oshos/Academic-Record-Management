document.addEventListener('DOMContentLoaded', (event) => {
  if (typeof window.ethereum !== 'undefined') {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable().then(async () => {
      const accounts = await web3.eth.getAccounts();
      window.account = accounts[0];

      // Load registered courses from the blockchain
      loadRegisteredCourses();

      document.getElementById('logout-menu').addEventListener('click', logout);

      // Sidebar navigation event listeners
      document.getElementById('home-menu').addEventListener('click', () => {
        window.location.href = 'staffdashboard.html';
      });
      document.getElementById('courses-menu').addEventListener('click', () => {
        window.location.href = 'staffcourses.html';
      });
      document.getElementById('results-menu').addEventListener('click', () => {
        window.location.href = 'staffupload.html';
      });
    });
  } else {
    console.error("MetaMask is not installed.");
  }
});

const contractAddress = '0x51c253390442E5e1710b57d920Be0009D4f98145';
const contractABI = [
  // Add your contract ABI here
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
        "internalType": "uint256",
        "name": "testScore",
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
        "name": "_matriculationNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_courseCode",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_testScore",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_examScore",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_totalScore",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_finalGrade",
        "type": "string"
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

const contract = new web3.eth.Contract(contractABI, contractAddress);

async function registerCourse() {
  const courseCode = document.getElementById('course-code').value;
  const courseTitle = document.getElementById('course-title').value;

  if (courseCode === '' || courseTitle === '') {
    alert('Please fill in both fields.');
    return;
  }

  try {
    await contract.methods.registerCourse(courseCode).send({ from: window.account });
    addCourseToList(courseCode, courseTitle, 'N/A');
  } catch (error) {
    console.error(error);
  }
}

async function loadRegisteredCourses() {
  // Fetch registered courses from the blockchain and add to the DOM
  // Assuming you have a way to fetch the courses, which can be implemented in the contract if needed
}

function addCourseToList(courseCode, courseTitle, lecturer) {
  const courseList = document.getElementById('course-list');

  const courseRow = document.createElement('div');
  courseRow.classList.add('course-row');

  courseRow.innerHTML = `
    <span class="course-code">${courseCode}</span>
    <span class="course-title">${courseTitle}</span>
    <span class="lecturer">${lecturer}</span>
  `;

  courseList.appendChild(courseRow);
}

function logout() {
  // Clear session storage or any other storage
  sessionStorage.clear();
  localStorage.clear();

  // Disconnect MetaMask
  if (web3.currentProvider && web3.currentProvider.isMetaMask) {
    web3.currentProvider.request({
      method: 'wallet_requestPermissions',
      params: [{
        eth_accounts: {}
      }]
    }).then(() => {
      console.log('Disconnected from MetaMask');
    }).catch((error) => {
      console.error('Error disconnecting MetaMask:', error);
    });
  }

  // Redirect to landing page
  window.location.href = 'landingpage.html';
}
