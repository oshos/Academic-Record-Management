// Function to initialize the page and add event listeners
function initializePage() {
  document.getElementById('courses-menu').addEventListener('click', () => {
    window.location.href = '/src/studentcourses.html';
  });

  document.getElementById('home-menu').addEventListener('click', () => {
    window.location.href = '/src/studentdashboard.html';
  });

  document.getElementById('results-menu').addEventListener('click', () => {
    window.location.href = '/src/studentresult.html';
  });

  document.getElementById('logout-menu').addEventListener('click', () => {
    logout();
  });

  document.querySelector('.primary-button').addEventListener('click', registerCourse);
}

// Function to register a course
function registerCourse(event) {
  event.preventDefault();
  const courseCode = document.getElementById('course-code').value;
  const courseTitle = document.getElementById('course-title').value;

  if (courseCode && courseTitle) {
    const coursesSection = document.querySelector('.courses-section');
    const courseRow = document.createElement('div');
    courseRow.classList.add('course-row');

    const courseCodeSpan = document.createElement('span');
    courseCodeSpan.classList.add('course-code');
    courseCodeSpan.textContent = courseCode;

    const courseTitleSpan = document.createElement('span');
    courseTitleSpan.classList.add('course-title');
    courseTitleSpan.textContent = courseTitle;

    const lecturerSpan = document.createElement('span');
    lecturerSpan.classList.add('lecturer');
    lecturerSpan.textContent = 'N/A';

    courseRow.appendChild(courseCodeSpan);
    courseRow.appendChild(courseTitleSpan);
    courseRow.appendChild(lecturerSpan);

    coursesSection.appendChild(courseRow);

    document.getElementById('course-code').value = '';
    document.getElementById('course-title').value = '';
  } else {
    alert('Please fill in both the course code and course title.');
  }
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

// Initialize the page when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializePage);
