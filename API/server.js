const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cors = require('cors');

app.use(cors());
var mongo = require('mongodb');

var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://Dimuth:z9wn0fBpJEgTHBXI@ac-xjhhhyo-shard-00-00.quiz4be.mongodb.net:27017,ac-xjhhhyo-shard-00-01.quiz4be.mongodb.net:27017,ac-xjhhhyo-shard-00-02.quiz4be.mongodb.net:27017/test?replicaSet=atlas-kp5b32-shard-0&ssl=true&authSource=admin";

app.get('/api', (req, res) => {
	res.send("Done");
});


//Get all Items
app.get('/api/inventory', (req, res) => {
   console.log("request received for get storeManger");
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("shoemart");
        dbo.collection("inventory").find({}).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
});

//Get One Item
app.get('/api/inventory/:id', (req, res) => {
	var id = req.params.id;
	console.log("request received for get One Members");
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("shoemart");
        dbo.collection("inventory").find({_id : mongo.ObjectID(id)}).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
});

//Get One Item by Item Code
app.get('/api/inventorybyItemCode/:id', (req, res) => {
	var id = req.params.id;
	console.log("request received for get One Members");
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("shoemart");
        dbo.collection("inventory").find({itemCode : id}).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
});

//Create Item
app.post('/api/inventory', (req, res) => {
    console.log("CreateItem started");
    var itemObj = new Object();

    itemObj.itemCode = req.body.itemCode;
    itemObj.itemName = req.body.itemName;
    itemObj.img = req.body.img;
	itemObj.unitPrice = req.body.unitPrice;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("shoemart");
        dbo.collection("inventory").insertOne(itemObj, function (err1, res1) {
            if (err1) throw err1;
            console.log("Item was added.");
            res.send(true);
            db.close();
        });
    });

});

app.put('/api/inventory', (req, res) => {

    var itemObj = new Object();

	itemObj._id = req.body._id;
    itemObj.itemCode = req.body.itemCode;
    itemObj.itemName = req.body.itemName;
    itemObj.img = req.body.img;
	itemObj.unitPrice = req.body.unitPrice;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("shoemart");
        var myquery = { _id: mongo.ObjectID(itemObj._id) };
        var newvalues = { $set: {
									itemCode : req.body.itemCode,
									itemName : req.body.itemName,
									img : req.body.img,
									unitPrice : req.body.unitPrice
								} 
						};
        dbo.collection("inventory").updateOne(myquery , newvalues , function (err1, res1) {
                if (err1) throw err1;
                console.log("Item updated successfully.");
                res.send(true);
                db.close();
        });
    });
});


//delete Item
app.delete('/api/inventory/:id', function (req, res) {
    var id = req.params.id;
    console.log("deleting" + id);

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("shoemart");

        var myquery = { _id: mongo.ObjectID(id) };
        console.log(myquery);
        dbo.collection("inventory").deleteOne(myquery, function (err1, result) {
            if (err1) throw err1;
            console.log("bItemook was deleted");
            res.send(true);
            db.close();
        });
    });

});

//Get all Items in the cart for specific person
app.get('/api/cart/:id', (req, res) => {
	var id = req.params.id;
	console.log("request received for get One Members");
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("shoemart");
        dbo.collection("cart").find({userID : id}).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
});

//Add to cart
app.post('/api/cart', (req, res) => {
    console.log("CreateItem started");
    var memberObj = new Object();

    memberObj.id = req.body.id;
    memberObj.qty = req.body.qty;
	memberObj.userID = req.body.userID;
	
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("shoemart");
        dbo.collection("cart").insertOne(memberObj, function (err1, res1) {
            if (err1) throw err1;
            console.log("Item was added.");
            res.send(true);
            db.close();
        });
    });

});


//Update cart
app.put('/api/cart', (req, res) => {

    var cartObj = new Object();

    cartObj.ID = req.body.ID;
    cartObj.newValue = req.body.newValue;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("shoemart");
        var myquery = { _id: mongo.ObjectID(cartObj.ID) };
        var newvalues = { $set: {qty: cartObj.newValue } };

        dbo.collection("cart").updateOne(myquery , newvalues , function (err1, res1) {
                if (err1) throw err1;
                console.log("Item updated successfully.");
                res.send(true);
                db.close();
        });
    });
});

//Remove from the cart
app.delete('/api/cart/:id', function (req, res) {
    var id = req.params.id;
    console.log("Removing item" + id);

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("shoemart");

        var myquery = { _id: mongo.ObjectID(id) };
        console.log(myquery);
        dbo.collection("cart").deleteOne(myquery, function (err1, result) {
            if (err1) throw err1;
            console.log("Item was removed");
            res.send(true);
            db.close();
        });
    });

});



//Get all Orders
app.get('/api/order', (req, res) => {
   console.log("request received for get storeManger");
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("shoemart");
        dbo.collection("order").find({}).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
});


//Get Orders of Specific person
app.get('/api/order/:id', (req, res) => {
	var id = req.params.id;
	console.log("request received for get One Members");
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("shoemart");
        dbo.collection("order").find({userID : id}).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
});

//Create Order
app.post('/api/order', (req, res) => {
    var orderObj = new Object();

    orderObj.Total = req.body.Total;
    orderObj.Address = req.body.Address;
	orderObj.Items = req.body.Items;
	orderObj.Status = "Waiting for Order Shipping";
	
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("shoemart");
        dbo.collection("order").insertOne(orderObj, function (err1, res1) {
            if (err1) throw err1;
            console.log("Item was added.");
            res.send(true);
            db.close();
        });
    });

});

//Update cart
app.put('/api/order', (req, res) => {

    var cartObj = new Object();

    cartObj.ID = req.body.ID;
    cartObj.newStatus = req.body.newStatus;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("shoemart");
        var myquery = { _id: mongo.ObjectID(cartObj.ID) };
        var newvalues = { $set: {Status: cartObj.newStatus } };

        dbo.collection("order").updateOne(myquery , newvalues , function (err1, res1) {
                if (err1) throw err1;
                console.log("Item updated successfully.");
                res.send(true);
                db.close();
        });
    });
});

//Get all Users
app.get('/api/user', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("shoemart");
        dbo.collection("users").find({}).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
});


//Create User
app.post('/api/user', (req, res) => {
    var userObj = new Object();

	userObj.ID = req.body.ID;
    userObj.FirstName = req.body.FirstName;
    userObj.LastName = req.body.LastName;
	userObj.Username = req.body.Username;
	userObj.Password = req.body.Password;
	userObj.Type = req.body.Type;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("shoemart");
        dbo.collection("users").insertOne(userObj, function (err1, res1) {
            if (err1) throw err1;
            console.log("User was added.");
            res.send(true);
            db.close();
        });
    });
});


app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});