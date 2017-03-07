
//=====================================
//Initializing required apps

var inquirer = require("inquirer");
var mysql = require("mysql");

//=====================================


//=====================================
//Establishing SQL connection

var connection =  mysql.createConnection({
	host: "127.0.0.1",
	port: 3306,

	user: "root",
	password: "Password",
	database: "bamazon"
});

connection.connect(function(err){
	if (err) throw err;
});
//=====================================

//=====================================
//Creating Constructor

function productsData(item_id, product_name, department_name, price, stock_quantity){
	this.item_id = item_id;
	this.product_name = product_name;
	this.department_name = department_name;
	this.price = price;
	this.stock_quantity = stock_quantity;
}

//=====================================
//Step 1 - Establish contents list

connection.query("SELECT * FROM products", function(err, res) {
	console.log("Welcome to Bamazon!");
	console.log("These are the items for sale:");
	for(var i = 0; i < res.length; i++) {
		console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
	}
	console.log("===========================================================================");
});
//=====================================

// //=====================================
// //Step 2 - Prompts

var sellFunction = function(){
	inquirer.prompt([
	{
		message: "Please enter the product ID you would like to purchase",
		name: "productId"
	},
	{
		type: "input",
		message: "Please enter the quantity of the item you would like to purchase",
		name: "quantity"
	}
	]).then(function(user){
		connection.query("SELECT * FROM products", function(err, result) {
		
		var newArray = new Array(1);

		for (var i= 0; i < 1; i++) {
			//Nesting Array
			newArray[i] = new Array(result.length);
				for (j = 0; j < 10; j++) {
					newArray[i] [j] = 
					[
					result[j].item_id, 
					result[j].product_name, 
					result[j].department_name, 
					result[j].price,
					result[j].stock_quantity
					];
				}
			}

// ======================================
// Step 3 - If Statement
		//Variable for user ID
		var id = user.productId

		if (result[id].stock_quantity > user.quantity){
				//Update Database
				connection.query("UPDATE products SET ?", {
					stock_quantity: result[j].stock_quantity
				});

				//Display total of order
				console.log("Your purchase total is " + user.quantity * result[j].price);
			}
			else {
				console.log("Insufficient Quality");
			}
		});
		

		});
		
		
	
};

};

sellFunction();

//=====================================
