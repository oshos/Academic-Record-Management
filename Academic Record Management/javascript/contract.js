// contract.js

// Replace this with your actual contract address
const contractAddress = "0x35253922e7D606659A4AF9d12830C5A9fB1BA60f";

// Replace this with your actual contract ABI
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

// Set up the contract
async function getContract() {
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  return contract;
}
