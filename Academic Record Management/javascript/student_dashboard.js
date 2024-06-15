// student_dashboard.js

document.addEventListener('DOMContentLoaded', async function() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        const contract = await getContract();
  
        const student = await contract.methods.students(account).call();
        if (!student.isRegistered) {
          alert('User not registered.');
          window.location.href = 'index.html';
          return;
        }
  
        // Update user info
        document.querySelector('.user-details').innerHTML = `${student.name}<br />${account}`;
  
        // Update greeting message
        const greeting = getGreetingMessage(student.name);
        document.querySelector('.welcome').innerText = greeting;
  
        // Event listeners for menu items
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
  
      } catch (error) {
        console.error('Error fetching student data:', error);
        alert('An error occurred while fetching data. Please try again.');
        window.location.href = 'index.html';
      }
    } else {
      alert('Please install MetaMask!');
      window.location.href = 'index.html';
    }
  });
  
  function getGreetingMessage(name) {
    const hour = new Date().getHours();
    let greeting;
    if (hour < 12) {
      greeting = 'Good morning';
    } else if (hour < 18) {
      greeting = 'Good afternoon';
    } else {
      greeting = 'Good evening';
    }
    return `${greeting}, ${name}`;
  }
  