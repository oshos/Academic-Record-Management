function toggleRoleInput() {
    var role = document.getElementById("select-role").value;
    var matricField = document.getElementById("matriculation-number-field");
    var staffField = document.getElementById("staff-id-field");
    
    if (role === "student") {
      matricField.style.display = "block";
      staffField.style.display = "none";
    } else if (role === "lecturer") {
      staffField.style.display = "block";
      matricField.style.display = "none";
    } else {
      matricField.style.display = "none";
      staffField.style.display = "none";
    }
  }

  document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var fullName = document.getElementById("full-name").value;
    var role = document.getElementById("select-role").value;
    var matricNumber = document.getElementById("matriculation-number").value;
    var staffId = document.getElementById("staff-id").value;

    // Simulate checking login details (replace this with actual check)
    var loginDetailsCorrect = true; // Change this to actual logic

    if (loginDetailsCorrect) {
      if (role === "student" && matricNumber !== "") {
        alert("Login successful. Redirecting to student dashboard.");
        window.location.href = "studentdashboard.html";
      } else if (role === "lecturer" && staffId !== "") {
        alert("Login successful. Redirecting to staff dashboard.");
        window.location.href = "staffdashboard.html"; 
      } else {
        alert("Please complete all required fields.");
      }
    } else {
      alert("Login details are incorrect. Reloading login page.");
      window.location.reload(); // Reload the login page
    }
  });