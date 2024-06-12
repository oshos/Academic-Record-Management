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
  
  document.getElementById("createForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var fullName = document.getElementById("full-name").value;
    var emailAddress = document.getElementById("email-address").value;
    var role = document.getElementById("select-role").value;
    var matricNumber = document.getElementById("matriculation-number").value;
    var staffId = document.getElementById("staff-id").value;

    // Simulate checking if the user is already registered (replace this with actual check)
    var userAlreadyRegistered = false;

    if (userAlreadyRegistered) {
      alert("User is already registered. Redirecting to login page.");
      window.location.href = "loginpage.html"; 
    } else {
      if (role === "student" && matricNumber !== "") {
        alert("Your account is created. Redirecting to student dashboard.");
        window.location.href = "studentdashboard.html"; 
      } else if (role === "lecturer" && staffId !== "") {
        alert("Your account is created. Redirecting to staff dashboard.");
        window.location.href = "staffdashboard.html"; 
      } else {
        alert("Please complete all required fields.");
      }
    }
  });