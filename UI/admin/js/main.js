$(document).ready(function(){
	localStorage.setItem("shoeMArt", "");
	$("#loadingModal").modal('show');
});

$.ajax({
	url: 'http://localhost:5000/api/order/' ,
	type: 'GET',
	success: function(result) {
		for (let i = 0; i < result.length; i++) {
			if(result[i].Status == "Waiting for Order Shipping"){
				document.getElementById("orderList").innerHTML +=
				"<div class=\"shadow p-3 mb-5 bg-body rounded\"> "+
				"	<div class=\"row\">"+
				"		<div class=\"col\">"+
				"			<h5>Order ID : "+ result[i]._id +"</h5>"+
				"			<h6 class=\"text-secondary\"><i class=\"fa fa-history\"></i> "+ result[i].Status +"</h6>"+
				"		</div>"+
				"		<div class=\"col text-end\">"+
				"			<h6>Total Amount : "+ result[i].Total +".00 LKR</h6>"+
				"		</div>"+
				"	</div>"+
				"	<div class=\"row\">"+
				"		<div class=\"col-5 mx-4\">"+
				"			<p><h6>Ship to :</h6>"+ result[i].Address.split(".")[0] +"<br/>"+ result[i].Address.split(".")[1] +" <br/>"+ result[i].Address.split(".")[2] +"<br/>"+ result[i].Address.split(".")[3] +"</p>"+
				"			<button type=\"button\" class=\"btn btn-warning\" onclick=\"shipTheOrder('"+ result[i]._id +"','"+ 'Shipped! Waiting for Order Received' +"')\">Ship The Order</button>"+
				"		</div>"+
				"		<div class=\"col-6 \" id=\"ordersTable2\">"+
				"		</div>"+
				"	</div>"+
				"</div>";
				var counter = 0;
				document.getElementById("ordersTable2").innerHTML +=
					"<div class=\"row\" style=\"\">"+
						"<div class=\"col-10\" style=\"border : 1px solid black ; \">"+
						"<h5>Item Name</h5>"+
						"</div>"+
						"<div class=\"col-2\" style=\"border-bottom : 1px solid black ; border-top : 1px solid black ; border-right : 1px solid black; \">"+
						"<h5>Quantity</h5>"+
						"</div>";
					"</div>";
				for(var j = 0 ; j < result[i].Items.length; j++){
					$("#loadingModal").modal('show');
					$.ajax({
						url: 'http://localhost:5000/api/inventory/' + result[i].Items[j].id,
						type: 'GET',
						success: function(result2) {
							if(result2 == "Error"){
								alert("Error");
							}
							name = result2[0].itemName;
							//console.log(result[i].Items[j]);
							document.getElementById("ordersTable2").innerHTML +=
							"<div class=\"row\" style=\"\">"+
								"<div class=\"col-10\" style=\"border-bottom : 1px solid black ; border-left : 1px solid black\">"+
									name +
								"</div>"+
								"<div class=\"col-2\" style=\"border-bottom : 1px solid black ; border-left : 1px solid black ; border-right : 1px solid black \">"+
									result[i].Items[counter].qty +
								"</div>";
							"</div>";
							counter++;
							$("#loadingModal").modal("hide");
						} 
					});
				}
			}
			if(result[i].Status == "Shipped! Waiting for Order Received"){
				document.getElementById("orderList").innerHTML +=
				"<div class=\"shadow p-3 mb-5 bg-body rounded\"> "+
				"	<div class=\"row\">"+
				"		<div class=\"col\">"+
				"			<h5>Order ID : "+ result[i]._id +"</h5>"+
				"			<h6 class=\"text-secondary\"><i class=\"fa fa-history\"></i> "+ result[i].Status +"</h6>"+
				"		</div>"+
				"		<div class=\"col text-end\">"+
				"			<h6>Total Amount : "+ result[i].Total +".00 LKR</h6>"+
				"		</div>"+
				"	</div>"+
				"	<div class=\"row\">"+
				"		<div class=\"col-5 mx-4\">"+
				"			<p><h6>Ship to :</h6>"+ result[i].Address.split(".")[0] +"<br/>"+ result[i].Address.split(".")[1] +" <br/>"+ result[i].Address.split(".")[2] +"<br/>"+ result[i].Address.split(".")[3] +"</p>"+
				"		</div>"+
				"		<div class=\"col-6 \" id=\"ordersTable2\">"+
				"		</div>"+
				"	</div>"+
				"</div>";
				var counter = 0;
				document.getElementById("ordersTable2").innerHTML +=
					"<div class=\"row\" style=\"\">"+
						"<div class=\"col-10\" style=\"border : 1px solid black ; \">"+
						"<h5>Item Name</h5>"+
						"</div>"+
						"<div class=\"col-2\" style=\"border-bottom : 1px solid black ; border-top : 1px solid black ; border-right : 1px solid black; \">"+
						"<h5>Quantity</h5>"+
						"</div>";
					"</div>";
				for(var j = 0 ; j < result[i].Items.length; j++){
					$("#loadingModal").modal('show');
					$.ajax({
						url: 'http://localhost:5000/api/inventory/' + result[i].Items[j].id,
						type: 'GET',
						success: function(result2) {
							if(result2 == "Error"){
								alert("Error");
							}
							name = result2[0].itemName;
							//console.log(result[i].Items[j]);
							document.getElementById("ordersTable2").innerHTML +=
							"<div class=\"row\" style=\"\">"+
								"<div class=\"col-10\" style=\"border-bottom : 1px solid black ; border-left : 1px solid black\">"+
									name +
								"</div>"+
								"<div class=\"col-2\" style=\"border-bottom : 1px solid black ; border-left : 1px solid black ; border-right : 1px solid black \">"+
									result[i].Items[counter].qty +
								"</div>";
							"</div>";
							counter++;
							$("#loadingModal").modal("hide");
						} 
					});
				}
			}
			if(result[i].Status == "Order Completed!"){
				document.getElementById("orderList").innerHTML +=
				"<div class=\"shadow p-3 mb-5 bg-body rounded\"> "+
				"	<div class=\"row\">"+
				"		<div class=\"col\">"+
				"			<h5>Order ID : 597454599565</h5>"+
				"			<h6 class=\"text-success\"><i class=\"fa fa-check-circle-o\"></i> Completed!</h6>"+
				"		</div>"+
				"		<div class=\"col text-end\">"+
				"			<h6>Total Amount : 6500.00 LKR</h6>"+
				"		</div>"+
				"	</div>"+
				"	<div class=\"row\">"+
				"		<div class=\"col-5 mx-4\">"+
				"			<p><h6>Ship to :</h6>"+ result[i].Address.split(".")[0] +"<br/>"+ result[i].Address.split(".")[1] +" <br/>"+ result[i].Address.split(".")[2] +"<br/>"+ result[i].Address.split(".")[3] +"</p>"+
				"		</div>"+
				"		<div class=\"col-6 \" id=\"ordersTable2\">"+
				"		</div>"+
				"	</div>"+
				"</div>";
				var counter = 0;
				document.getElementById("ordersTable2").innerHTML +=
					"<div class=\"row\" style=\"\">"+
						"<div class=\"col-10\" style=\"border : 1px solid black ; \">"+
						"<h5>Item Name</h5>"+
						"</div>"+
						"<div class=\"col-2\" style=\"border-bottom : 1px solid black ; border-top : 1px solid black ; border-right : 1px solid black; \">"+
						"<h5>Quantity</h5>"+
						"</div>";
					"</div>";
				for(var j = 0 ; j < result[i].Items.length; j++){
					$("#loadingModal").modal('show');
					$.ajax({
						url: 'http://localhost:5000/api/inventory/' + result[i].Items[j].id,
						type: 'GET',
						success: function(result2) {
							if(result2 == "Error"){
								alert("Error");
							}
							name = result2[0].itemName;
							//console.log(result[i].Items[j]);
							document.getElementById("ordersTable2").innerHTML +=
							"<div class=\"row\" style=\"\">"+
								"<div class=\"col-10\" style=\"border-bottom : 1px solid black ; border-left : 1px solid black\">"+
									name +
								"</div>"+
								"<div class=\"col-2\" style=\"border-bottom : 1px solid black ; border-left : 1px solid black ; border-right : 1px solid black \">"+
									result[i].Items[counter].qty +
								"</div>";
							"</div>";
							counter++;
							$("#loadingModal").modal("hide");
						} 
					});
				}
			}
			
				
		}
		$("#loadingModal").modal('hide');
	}
});


function shipTheOrder(id , newStatus){
	$("#loadingModal").modal('show');
	console.log(id + "-" + newStatus);
	var obj = new Object();
	
	obj.ID = id;
	obj.newStatus = newStatus;
	
	$.ajax({
		url: 'http://localhost:5000/api/order',
		type: 'PUT',
		data : obj,
		success: function(result) {
			if(result == "Error"){
				alert("Error");
			}
			else{
				window.location.reload();
			}
			$("#loadingModal").modal('hide');
		} 
	});
}

$.ajax({
	url: 'http://localhost:5000/api/inventory' ,
	type: 'GET',
	success: function(result) {
		if(result.length != 0){
			var count = 1;
			for (let i = 0; i < result.length; i++) {
				document.getElementById("tblBody").innerHTML +=
				"<tr>" 
				+"  <td scope=\"row\">"+ result[i].itemCode +"</td>"
				+"  <td><img src='"+ result[i].img +"' class=\"card-img-top mx-2\" style=\"width : 8%;\" />"+ result[i].itemName + "</td>"
				+"  <td>"+ result[i].unitPrice + "</td>"
				+"  <td class=\"text-center\">	"
				+"	<i class=\"fas fa-pen text-success buttons mx-2\" onclick = showUpdateWondow('"+ result[i]._id +"')></i>"
				+"	<i class=\"fas fa-trash text-danger buttons mx-2\" onclick = showDeleteWondow('"+ result[i]._id +"')></i>"
				+"  </td>"
				+"</tr>";
					
				count++;
			}
			$("#loadingModal").modal("hide");
		}
		else {
			//document.getElementById("empty").style.display = "block";
		}
	} 
});
			
var deleteId = "";
function showDeleteWondow(id) {
	deleteId = id;
	$("#deleteConfirmationDialog").modal("show");
}
function deleteCofirmed() {
	$("#loadingModal").modal("show");
	$.ajax({
		url: 'http://localhost:5000/api/inventory/' + deleteId,
		type: 'DELETE',
		success: function(result) {
			alert("delete successfull");
			location.reload();
		}
	});
}
		
var updateId = "";
function showUpdateWondow(id) {
	$("#loadingModal").modal("show");
	updateId = id;
	var obj = new Object();
	$.ajax({
		url: 'http://localhost:5000/api/inventory/' + updateId,
		type: 'GET',
		success: function(result) {
			document.getElementById("itemCodeU").value = result[0].itemCode;
			document.getElementById("itemNameU").value = result[0].itemName;
			document.getElementById("imgU").value = result[0].img;
			document.getElementById("unitPriceU").value = result[0].unitPrice;
			$("#loadingModal").modal("hide");
			$("#updateDialog").modal("show");
		} 
	});
}
		
function updateCofirmed() {
	$("#loadingModal").modal("show");
	$("#updateDialog").modal("hide");
	var obj = new Object();
	
	obj._id = updateId;
	obj.itemCode = document.getElementById("itemCodeU").value;
	obj.itemName = document.getElementById("itemNameU").value;
	obj.img = document.getElementById("imgU").value;
	obj.unitPrice = document.getElementById("unitPriceU").value;
	$.ajax({
		url: 'http://localhost:5000/api/inventory',
		type: 'PUT',
		data : obj,
		success: function(result) {
			$("#loadingModal").modal("hide");
			if(result == "Error"){
				alert("Error");
			}
			else{
				alert("Update Successfull");
				location.reload();
			}
		} 
	});
}

function addToInventory() {
	$("#updateDialog").modal("hide");
	$("#loadingModal").modal("show");
	var obj = new Object();
	
	obj.itemCode = document.getElementById("itemCode").value;
	obj.itemName = document.getElementById("itemName").value;
	obj.img = document.getElementById("img").value;
	obj.unitPrice = document.getElementById("unitPrice").value;
			
	$.ajax({
		url: 'http://localhost:5000/api/inventorybyItemCode/' + document.getElementById("itemCode").value,
		type: 'GET',
		success: function(result) {
			if(result.length == 0){
				$.ajax({
					url: 'http://localhost:5000/api/inventory',
					type: 'POST',
					data : obj,
					success: function(result) {
						if(result == "Error"){
							alert("Error");
						}
						else{
							alert("Saved Successfull");
							location.reload();
						}
					} 
				});
			}
			else {
				document.getElementById("wrning").style.display = "block";
			}
		} 
	});
}



function showOrders(){
	window.location.href = "./orders.html";
}

function showDashboard(){
	window.location.href = "./index.html";
}

function logOut(){
	window.location.href = "../login.html";
}
		