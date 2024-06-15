// login.js

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
  
  document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();
  
    const fullName = document.getElementById('full-name').value;
    const selectRole = document.getElementById('select-role').value;
    const matriculationNumber = document.getElementById('matriculation-number').value;
    const staffID = document.getElementById('staff-id').value;
  
    if (!fullName || !selectRole || (selectRole === 'student' && !matriculationNumber) || (selectRole === 'lecturer' && !staffID)) {
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
          const student = await contract.methods.students(account).call();
          if (student.isRegistered && student.name === fullName && student.matriculationNumber === matriculationNumber) {
            alert('Login successful!');
            window.location.href = 'studentdashboard.html';
          } else {
            alert('Incorrect details. Please try again.');
          }
        } else if (selectRole === 'lecturer') {
          const lecturer = await contract.methods.lecturers(account).call();
          if (lecturer.isRegistered && lecturer.name === fullName && lecturer.staffID === staffID) {
            alert('Login successful!');
            window.location.href = 'staffdashboard.html';
          } else {
            alert('Incorrect details. Please try again.');
          }
        }
      } catch (error) {
        console.error('Error logging in:', error);
        alert('An error occurred while logging in. Please try again.');
      }
    } else {
      alert('Please install MetaMask!');
    }
  });
  