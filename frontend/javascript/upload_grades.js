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

  // Tabs switching
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

  window.openTab = openTab; // Make function available globally

  // Calculate total and grade for individual upload
  function calculateTotalAndGrade() {
    var test1 = parseFloat(document.getElementById('test1-score').value) || 0;
    var test2 = parseFloat(document.getElementById('test2-score').value) || 0;
    var exam = parseFloat(document.getElementById('exam-score').value) || 0;

    // Validate scores
    if (test1 > 15 || test2 > 15 || exam > 70) {
      alert("Test scores cannot exceed 15 and exam scores cannot exceed 70.");
      return;
    }

    var total = test1 + test2 + exam;
    var grade = '';

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

    document.getElementById('total').value = total;
    document.getElementById('grade').value = grade;
  }

  window.calculateTotalAndGrade = calculateTotalAndGrade; // Make function available globally

  // Submit individual upload
  document.querySelector('.primary-button').addEventListener('click', function() {
    var courseCode = document.getElementById('course-code').value;
    var matriculationNumber = document.getElementById('matriculation-number').value;
    var test1 = parseFloat(document.getElementById('test1-score').value) || 0;
    var test2 = parseFloat(document.getElementById('test2-score').value) || 0;
    var exam = parseFloat(document.getElementById('exam-score').value) || 0;
    var total = test1 + test2 + exam;
    var grade = document.getElementById('grade').value;

    if (!courseCode || !matriculationNumber) {
      alert("Please fill in all required fields.");
      return;
    }

    // Perform actual submission (replace this with actual submission logic)
    alert(`Results submitted for Matriculation Number: ${matriculationNumber}, Course Code: ${courseCode}, Total: ${total}, Grade: ${grade}`);
  });

  // Excel upload processing
  document.getElementById('.primary-button0').addEventListener('click', function(event) {
    var file = event.target.files[0];

    if (!file) {
      return;
    }

    var reader = new FileReader();

    reader.onload = function(e) {
      var data = new Uint8Array(e.target.result);
      var workbook = XLSX.read(data, {type: 'array'});
      var firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      var jsonData = XLSX.utils.sheet_to_json(firstSheet, {header: 1});

      jsonData.forEach(function(row, index) {
        if (index > 0) { // Skip header row
          var courseCode = row[0];
          var matricNumber = row[1];
          var test1 = parseFloat(row[2]) || 0;
          var test2 = parseFloat(row[3]) || 0;
          var exam = parseFloat(row[4]) || 0;
          var total = test1 + test2 + exam;
          var grade = '';

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

          // Validate scores
          if (test1 > 15 || test2 > 15 || exam > 70) {
            alert(`Scores validation failed for Matriculation Number: ${matricNumber}, Course Code: ${courseCode}`);
            return;
          }

          // Perform actual submission (replace this with actual submission logic)
          console.log(`Results processed for Matriculation Number: ${matricNumber}, Course Code: ${courseCode}, Total: ${total}, Grade: ${grade}`);
        }
      });

      alert("Excel file processed successfully.");
    };

    reader.readAsArrayBuffer(file);
  });
});
