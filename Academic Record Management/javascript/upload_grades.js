document.addEventListener('DOMContentLoaded', async function() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      const contract = await getContract();

      // Update user info
      const lecturer = await contract.methods.lecturers(account).call();
      document.querySelector('.user-details').innerHTML = `${lecturer.name}<br />${account}`;

      // Event listeners for menu items
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
        window.ethereum.request({ method: 'eth_requestAccounts', params: [] });
        window.location.href = 'index.html';
      });

    } catch (error) {
      console.error('Error fetching lecturer data:', error);
      alert('An error occurred while fetching data. Please try again.');
      window.location.href = 'index.html';
    }
  } else {
    alert('Please install MetaMask!');
    window.location.href = 'index.html';
  }
});

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tab-button");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function calculateTotalAndGrade() {
  let test1 = parseInt(document.getElementById('test1-score').value) || 0;
  let test2 = parseInt(document.getElementById('test2-score').value) || 0;
  let exam = parseInt(document.getElementById('exam-score').value) || 0;

  if (test1 > 15 || test2 > 15 || exam > 70) {
    alert('Test scores cannot exceed 15 and Exam score cannot exceed 70.');
    return;
  }

  let total = test1 + test2 + exam;
  document.getElementById('total').value = total;

  let grade;
  if (total >= 90) grade = 'A';
  else if (total >= 80) grade = 'B';
  else if (total >= 70) grade = 'C';
  else if (total >= 60) grade = 'D';
  else grade = 'F';

  document.getElementById('grade').value = grade;
}

async function submitIndividual() {
  let courseCode = document.getElementById('course-code').value;
  let courseTitle = document.getElementById('course-title').value;
  let matricNumber = document.getElementById('matriculation-number').value;
  let test1Score = parseInt(document.getElementById('test1-score').value) || 0;
  let test2Score = parseInt(document.getElementById('test2-score').value) || 0;
  let examScore = parseInt(document.getElementById('exam-score').value) || 0;
  let total = test1Score + test2Score + examScore;
  let grade = document.getElementById('grade').value;

  if (!courseCode || !courseTitle || !matricNumber) {
    alert('Please fill in all fields.');
    return;
  }

  const existingRow = document.querySelector(`#scores-table-body tr[data-matric="${matricNumber}"][data-course="${courseCode}"]`);
  if (existingRow) {
    alert('The student grade has already been uploaded.');
    return;
  }

  let row = `<tr data-matric="${matricNumber}" data-course="${courseCode}">
               <td>${courseCode}</td>
               <td>${courseTitle}</td>
               <td>${matricNumber}</td>
               <td>${test1Score}</td>
               <td>${test2Score}</td>
               <td>${examScore}</td>
               <td>${total}</td>
               <td>${grade}</td>
             </tr>`;

  document.getElementById('scores-table-body').insertAdjacentHTML('beforeend', row);
}

async function submitExcel() {
  const fileInput = document.getElementById('excel-upload');
  const file = fileInput.files[0];
  if (!file) {
    alert('Please upload an Excel file.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonSheet = XLSX.utils.sheet_to_json(worksheet);

    const tableBody = document.getElementById('scores-table-body');
    tableBody.innerHTML = '';

    jsonSheet.forEach(row => {
      let courseCode = row.CourseCode;
      let courseTitle = row.CourseTitle;
      let matricNumber = row.MatricNumber;
      let test1Score = row.Test1Score;
      let test2Score = row.Test2Score;
      let examScore = row.ExamScore;
      let total = test1Score + test2Score + examScore;

      let grade;
      if (total >= 90) grade = 'A';
      else if (total >= 80) grade = 'B';
      else if (total >= 70) grade = 'C';
      else if (total >= 60) grade = 'D';
      else grade = 'F';

      let rowHtml = `<tr data-matric="${matricNumber}" data-course="${courseCode}">
                      <td>${courseCode}</td>
                      <td>${courseTitle}</td>
                      <td>${matricNumber}</td>
                      <td>${test1Score}</td>
                      <td>${test2Score}</td>
                      <td>${examScore}</td>
                      <td>${total}</td>
                      <td>${grade}</td>
                    </tr>`;

      tableBody.insertAdjacentHTML('beforeend', rowHtml);
    });
  };
  reader.readAsArrayBuffer(file);
}

async function uploadToBlockchain() {
  const tableRows = document.querySelectorAll('#scores-table-body tr');
  const web3 = new Web3(window.ethereum);
  const contract = await getContract();
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  for (let row of tableRows) {
    let courseCode = row.cells[0].textContent;
    let courseTitle = row.cells[1].textContent;
    let matricNumber = row.cells[2].textContent;
    let test1Score = parseInt(row.cells[3].textContent);
    let test2Score = parseInt(row.cells[4].textContent);
    let examScore = parseInt(row.cells[5].textContent);
    let total = parseInt(row.cells[6].textContent);
    let grade = row.cells[7].textContent;

    try {
      // Estimate gas for the transaction
      const gas = await contract.methods.uploadGrade(matricNumber, courseCode, courseTitle, test1Score, test2Score, examScore).estimateGas({ from: account });

      // Send the transaction
      await contract.methods.uploadGrade(matricNumber, courseCode, courseTitle, test1Score, test2Score, examScore).send({ from: account, gas });

    } catch (error) {
      console.error('Error uploading to blockchain:', error);
      alert(`Failed to upload ${matricNumber} for ${courseCode}: ${error.message}`);
      return;
    }
  }
  alert('All grades have been successfully uploaded to the blockchain.');
}

async function getContract() {
  const contractABI = [
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
  const contractAddress = '0x35253922e7D606659A4AF9d12830C5A9fB1BA60f'; // Ensure this is the correct contract address
  const web3 = new Web3(window.ethereum);
  return new web3.eth.Contract(contractABI, contractAddress);
}
