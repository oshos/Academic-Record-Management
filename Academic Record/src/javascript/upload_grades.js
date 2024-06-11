// Function to calculate total score and grade
function calculateTotalAndGrade() {
    var test1Score = parseFloat(document.getElementById('test1-score').value) || 0;
    var test2Score = parseFloat(document.getElementById('test2-score').value) || 0;
    var examScore = parseFloat(document.getElementById('exam-score').value) || 0;
    
    // Ensure test scores do not exceed 15
    if (test1Score > 15) {
      test1Score = 15;
      document.getElementById('test1-score').value = test1Score;
    }
    if (test2Score > 15) {
      test2Score = 15;
      document.getElementById('test2-score').value = test2Score;
    }
  
    // Ensure exam score does not exceed 70
    if (examScore > 70) {
      examScore = 70;
      document.getElementById('exam-score').value = examScore;
    }
    
    var total = test1Score + test2Score + examScore;
    document.getElementById('total').value = total;
    
    var grade;
    if (total >= 70) {
      grade = 'A';
    } else if (total >= 60) {
      grade = 'B';
    } else if (total >= 50) {
      grade = 'C';
    } else if (total >= 45) {
      grade = 'D';
    } else {
      grade = 'F';
    }
    document.getElementById('grade').value = grade;
  }
  
  
  // Add event listeners to tab buttons
  document.getElementById("individual").style.display = "block"; // Show the default tab
  document.getElementById("home-menu").addEventListener("click", function(){ redirectToPage('staffdashboard.html') });
document.getElementById("courses-menu").addEventListener("click", function(){ redirectToPage('staffcourses.html') });
document.getElementById("results-menu").addEventListener("click", function(){ redirectToPage('staffupload.html') });
document.getElementById("logout-menu").addEventListener("click", function(){ logout() });

function redirectToPage(pageUrl) {
  window.location.href = pageUrl;
}


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

