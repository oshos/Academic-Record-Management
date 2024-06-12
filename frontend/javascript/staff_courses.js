// staff_courses.js

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
    window.location.href = 'landingpage.html';
  });

  // User info update
  var userFullName = 'Alabi Oshomoshiofu'; // Replace this with the actual user's full name
  var walletAddress = '0xc8...bxf8'; // Replace this with the actual wallet address

  // Update user name and wallet address
  var userDetailsElement = document.querySelector('.user-details');
  userDetailsElement.innerHTML = `${userFullName}<br />${walletAddress}`;

  // Course registration
  document.querySelector('.primary-button').addEventListener('click', function() {
    var courseCode = document.getElementById('course-code').value;
    var courseTitle = document.getElementById('course-title').value;

    if (courseCode && courseTitle) {
      // Check if the course already exists
      var courseExists = false;
      var courseRows = document.querySelectorAll('.course-row');
      courseRows.forEach(function(row) {
        var existingCourseCode = row.querySelector('.course-code').textContent;
        var existingCourseTitle = row.querySelector('.course-title').textContent;
        if (existingCourseCode === courseCode && existingCourseTitle === courseTitle) {
          courseExists = true;
        }
      });

      if (courseExists) {
        alert('The course is already registered.');
        window.location.reload();
      } else {
        alert(`Course ${courseCode} - ${courseTitle} has been registered.`);

        // Create a new course row
        var courseRow = document.createElement('div');
        courseRow.classList.add('course-row');

        var courseCodeSpan = document.createElement('span');
        courseCodeSpan.classList.add('course-code');
        courseCodeSpan.textContent = courseCode;

        var courseTitleSpan = document.createElement('span');
        courseTitleSpan.classList.add('course-title');
        courseTitleSpan.textContent = courseTitle;

        var studentNoSpan = document.createElement('span');
        studentNoSpan.classList.add('studentno');
        studentNoSpan.textContent = '0'; // Default number of students

        // Append the new elements to the course row
        courseRow.appendChild(courseCodeSpan);
        courseRow.appendChild(courseTitleSpan);
        courseRow.appendChild(studentNoSpan);

        // Append the course row to the courses section
        var coursesSection = document.querySelector('.courses-section');
        if (coursesSection.querySelector('.no-courses')) {
          coursesSection.querySelector('.no-courses').remove(); // Remove the "no courses" message
        }
        coursesSection.appendChild(courseRow);

        // Clear the input fields
        document.getElementById('course-code').value = '';
        document.getElementById('course-title').value = '';
      }
    } else {
      alert('Please fill in both course code and course title.');
    }
  });
});
