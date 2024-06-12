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
    // Clear active session (this is a placeholder, replace with actual session clearing logic)
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = 'landingpage.html';
  });

  // User info update
  var userFullName = 'Precious'; // Replace this with the actual user's full name
  var walletAddress = '0xc8...bxf8'; // Replace this with the actual wallet address

  // Update user name and wallet address
  var userDetailsElement = document.querySelector('.user-details');
  userDetailsElement.innerHTML = `${userFullName}<br />${walletAddress}`;

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

  // Redirect to the landing page
  window.location.href = 'landingpage.html';
}
