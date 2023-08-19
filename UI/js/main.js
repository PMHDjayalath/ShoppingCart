$(document).ready(function(){
	$("#loadingModal").modal('show');
});



var userID = localStorage.getItem("shoeMArt");
if(userID == ""){
	alert("Please Login First");
	window.location.href = "./login.html";
}

$.ajax({
	url: 'http://localhost:5000/api/inventory' ,
	type: 'GET',
	success: function(result) {
		for (let i = 0; i < result.length; i++) {
			document.getElementById("list").innerHTML +=
			"<div class=\"col\">"+
			"	<div class=\"card h-100\">"+
			"	  <img src='"+ result[i].img +"' class=\"card-img-top\" >"+
			"	  <div class=\"card-body\">"+
			"		<h5 class=\"card-title\">"+ result[i].itemName +"</h5>"+
			"		<div class=\"row\">"+
			"			<div class=\"col\">"+
			"				<p class=\"card-text my-2\">"+ result[i].unitPrice +" LKR</p>"+
			"			</div>"+
			"			<div class=\"col text-end\">"+
			"				<button type=\"button\" class=\"btn btn-primary\" onclick=\"addtocard('"+ result[i]._id +"')\"><i class=\"fa fa-shopping-cart\" style=\"\"></i></button> "+
			"			</div> "+
			"	  </div>"+
			"	</div>"+
			"</div>"
		}
		$("#loadingModal").modal("hide");
	}
});


$.ajax({
	url: 'http://localhost:5000/api/cart/' + userID ,
	type: 'GET',
	success: function(result) {
		document.getElementById("noOfItems").innerHTML = result.length + " Items In Your Cart";
		
		var total = 0;
		
		for (let i = 0; i < result.length; i++) {
			$.ajax({
				url: 'http://localhost:5000/api/inventory/' + result[i].id ,
				type: 'GET',
				success: function(result2) {
					console.log(result2);
					document.getElementById("cartData").innerHTML +=
					"<tr>"+
					"	<td><img src='"+ result2[0].img +"' class=\"card-img-top mx-2\" style=\"width : 15%;\" />"+ result2[0].itemName  +"</td>"+
					"	<td>"+ result2[0].unitPrice +"</td>"+
					"	<td><button><i class=\"fa fa-sort-asc\" onClick=updateCart('"+result[i]._id+"','" + result[i].qty+"','" + "inc" + "')></i></button>"+ 
							result[i].qty +
					"		<button><i class=\"fa fa-sort-desc\" onClick=updateCart('"+result[i]._id+"','" + result[i].qty+"','" + "dec" + "')></i></button>"+
					"	</td>"+
					"	<td>"+ result2[0].unitPrice * result[i].qty +"</td>"+
					"	<td><i class=\"fa fa-trash\"  style=\"font-size:24px;color:red\" onclick=\"removeFromCart('"+result[i]._id+"')\"></i></td>"+
					"</tr>";
					total = total + (result2[0].unitPrice * result[i].qty);
					document.getElementById("subTotal").innerHTML = total;
					document.getElementById("discount").innerHTML = total * 0.1;
					document.getElementById("total").innerHTML = total - (total * 0.1);
				}
			});
		}
		$("#loadingModal").modal("hide");
	}
});

$.ajax({
	url: 'http://localhost:5000/api/order/' + userID ,
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
						} 
					});
				}
				$("#loadingModal").modal("hide");
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
				"			<button type=\"button\" class=\"btn btn-primary\" onclick=\"updateTheOrder('"+ result[i]._id +"','"+ 'Order Completed!' +"')\">Confirm Order Received</button>"+
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
						} 
					});
				}
				$("#loadingModal").modal("hide");
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
						} 
					});
				}
				$("#loadingModal").modal("hide");
			}
			
				
		}
	}
});

function addtocard(data){
	$("#loadingModal").modal("show");
	console.log(data);
	var obj = new Object();
	
	obj.id = data;
	obj.qty = 1;
	obj.userID = userID;
	
	$.ajax({
		url: 'http://localhost:5000/api/cart',
		type: 'POST',
		data : obj,
		success: function(result) {
			$("#loadingModal").modal("hide");
			if(result == "Error"){
				alert("Error");
			}
			else{
				alert("Item Added to the cart");
			}
		} 
	});
}

function removeFromCart(id) {
	$("#loadingModal").modal("show");
	$.ajax({
		url: 'http://localhost:5000/api/cart/' + id,
		type: 'DELETE',
		success: function(result) {
			if(result == "Error"){
				alert("Error");
			}
			else{
				$("#loadingModal").modal("hide");
				window.location.reload();
			}
		} 
	});
}

function updateCart(id , currentValue , task ){
	$("#loadingModal").modal("show");
	console.log(id + "-" + currentValue + "-" + task);
	var isApproved = false;
	var obj = new Object();
	
	obj.ID = id;
	if(task == "dec"){
		console.log("dec");
		if(Number(currentValue) > 1){
			obj.newValue = Number(currentValue) - 1;
			isApproved = true;
		}
		else{
			console.log("Qty can not be bolow 1");
		}
	}
	else{
		obj.newValue = Number(currentValue) + 1;
		isApproved = true;
	}
	
	if(isApproved){
		$.ajax({
			url: 'http://localhost:5000/api/cart',
			type: 'PUT',
			data : obj,
			success: function(result) {
				$("#loadingModal").modal("hide");
				if(result == "Error"){
					alert("Error");
				}
				else{
					window.location.reload();
				}
			} 
		});
	}
}

function confirmOrder(){
	$("#loadingModal").modal("show");
	var obj = new Object();
	obj.userID = userID;
	obj.Total = document.getElementById("total").innerHTML;
	obj.Address = document.getElementById("name").value + "," + 
					document.getElementById("address").value + "." + 
					document.getElementById("city").value + "," + 
					document.getElementById("postal").value + "." + 
					document.getElementById("mobile").value; 
	obj.Items = [];
	
	$.ajax({
		url: 'http://localhost:5000/api/cart/' + userID ,
		type: 'GET',
		success: function(result) {
			for (let i = 0; i < result.length; i++) {
				obj.Items.push({"id" : result[i].id ,
								"qty" : result[i].qty
				});
				$.ajax({
					url: 'http://localhost:5000/api/cart/' + result[i]._id,
					type: 'DELETE',
					success: function(result) {
						if(result == "Error"){
							alert("Error");
						}
					} 
				});
			}
			$.ajax({
				url: 'http://localhost:5000/api/order',
				type: 'POST',
				data : obj,
				success: function(result) {
					$("#loadingModal").modal("hide");
					if(result == "Error"){
						alert("Error");
					}
					else{
						alert("Order Confirmed");
						window.location.reload();
					}
				} 
			});
		}
	});
}

function updateTheOrder(id , newStatus){
	$("#loadingModal").modal("show");
	console.log(id + "-" + newStatus);
	var obj = new Object();
	
	obj.ID = id;
	obj.newStatus = newStatus;
	
	$.ajax({
		url: 'http://localhost:5000/api/order',
		type: 'PUT',
		data : obj,
		success: function(result) {
			$("#loadingModal").modal("hide");
			if(result == "Error"){
				alert("Error");
			}
			else{
				window.location.reload();
			}
		} 
	});
}

function logOut(){
	localStorage.setItem("shoeMArt", "");
	window.location.href = "./login.html";
}

function viewCart(){
	window.location.href = "./cart.html";
}

function showOrders(){
	window.location.href = "./orders.html";
}

function home(){
	window.location.href = "./index.html";
}
		