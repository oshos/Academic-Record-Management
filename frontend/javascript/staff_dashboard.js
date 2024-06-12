// student_dashboard.js

document.addEventListener('DOMContentLoaded', function() {
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
    // Clear active session (this is a placeholder, replace with actual session clearing logic)
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = 'index.html';
  });

  // User info and greeting update
  var userFullName = 'Precious'; // Replace this with the actual user's full name
  var walletAddress = '0xc8...bxf8'; // Replace this with the actual wallet address

  // Update user name and wallet address
  var userDetailsElement = document.querySelector('.user-details');
  userDetailsElement.innerHTML = `${userFullName}<br />${walletAddress}`;

  // Update greeting
  var welcomeElement = document.querySelector('.welcome');
  var currentHour = new Date().getHours();
  var greeting;

  if (currentHour < 12) {
    greeting = 'Good morning';
  } else if (currentHour < 18) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }

  welcomeElement.textContent = `${greeting} ${userFullName}`;
});
