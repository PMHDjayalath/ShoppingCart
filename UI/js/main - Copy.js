function login(){
	$("#loadingModal").modal("show");
	var isFound = false;
	$.ajax({
		url: 'http://localhost:5000/api/user' ,
		type: 'GET',
		success: function(result) {
			for (let i = 0; i < result.length; i++) {
				console.log(result[i]);
				console.log(result[i].Username + "-" + document.getElementById("username").value + "&&" + result[i].Password + "-" + document.getElementById("password").value)
				if(result[i].Username == document.getElementById("username").value && result[i].Password == document.getElementById("password").value){
					isFound = true;
					$("#loadingModal").modal("hide");
					if(result[i].Type == "Admin"){
						window.location.href = "./admin/index.html";
					}
					else{
						localStorage.setItem("shoeMArt", result[i].ID);
						window.location.href = "./index.html";
					}
				}
			}
			if(!isFound){
				$("#loadingModal").modal("hide");
				document.getElementById("msg").style.display = "block";
			}
		}
	});
}

function Register(){
	var obj = new Object();
	
	if(document.getElementById("fName").value == "" || document.getElementById("lName").value == "" ||document.getElementById("username").value == "" || document.getElementById("password").value == ""){
		alert("Please fill all fields");
	}
	else {
		$("#loadingModal").modal("show");
		obj.ID = "";
		obj.FirstName = document.getElementById("fName").value;
		obj.LastName = document.getElementById("lName").value;
		obj.Username = document.getElementById("username").value;
		obj.Password = document.getElementById("password").value;
		obj.Type = "user";
		
		$.ajax({
			url: 'http://localhost:5000/api/user' ,
			type: 'GET',
			success: function(result) {
				obj.ID = Number(result.length) + 1;
				$.ajax({
					url: 'http://localhost:5000/api/user',
					type: 'POST',
					data : obj,
					success: function(result) {
						$("#loadingModal").modal("hide");
						if(result == "Error"){
							alert("Error");
						}
						else{
							login();
						}
					} 
				});
			}
		});
	}
}
