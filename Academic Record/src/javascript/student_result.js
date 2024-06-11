// student_result.js

// Navigation functionality
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
  alert('Logging out.');
  logout();
  // Implement logout functionality here
});

// Function to update user details
function updateUserDetails(name, walletAddress) {
  const userDetailsElement = document.querySelector('.user-details');
  userDetailsElement.innerHTML = `${name}<br>${walletAddress}`;
}

// Example usage: update user details
updateUserDetails('Alabi Oshomoshiofu', '0xc8...bxf8');

// Function to dynamically update results (example of updating results dynamically)
function updateResults(results) {
  const resultsSection = document.querySelector('.results-section');
  resultsSection.innerHTML = `
    <div class="results-title">Your Results</div>
    <div class="results-header">
      <span class="course-code-header">Course Code</span>
      <span class="test-header">Test 1<br>(15)</span>
      <span class="test-header">Test 2<br>(15)</span>
      <span class="exam-header">Exam<br>(70)</span>
      <span class="total-header">Total<br>(100)</span>
      <span class="grade-header">Grade</span>
    </div>
  `;

  results.forEach(result => {
    const resultRow = document.createElement('div');
    resultRow.className = 'results-row';
    resultRow.innerHTML = `
      <span class="course-code">${result.courseCode}</span>
      <span class="test">${result.test1}</span>
      <span class="test">${result.test2}</span>
      <span class="exam">${result.exam}</span>
      <span class="total">${result.total}</span>
      <span class="grade">${result.grade}</span>
    `;
    resultsSection.appendChild(resultRow);
  });
}

// Example results data
const exampleResults = [
  { courseCode: 'CEN 511', test1: 10, test2: 10, exam: 50, total: 70, grade: 'A' },
  { courseCode: 'CEN 512', test1: 10, test2: 10, exam: 50, total: 70, grade: 'A' },
  { courseCode: 'CEN 524', test1: 10, test2: 10, exam: 50, total: 70, grade: 'A' },
  { courseCode: 'EIE 529', test1: 10, test2: 10, exam: 50, total: 70, grade: 'A' }
];

// Update results on page load
updateResults(exampleResults);

// Function to handle logout
function logout() {
  // Clear session storage
  sessionStorage.clear();

  // Reset Ethereum provider (MetaMask)
  if (window.ethereum && window.ethereum.isMetaMask) {
    window.ethereum.request({
      method: 'eth_requestAccounts',
      params: [{ eth_accounts: {} }],
    }).catch((error) => {
      console.error('Error disconnecting from MetaMask:', error);
    });
  }

  // Redirect to the landing page
  window.location.href = '/src/landingpage.html';
}
