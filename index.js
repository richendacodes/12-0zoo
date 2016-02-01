var mysql = require('mysql');
var prompt = require('prompt');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'N0nconform',
    database: 'zoo_db'
});

connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        };
        //console.log('connected as id ' + connection.threadId);
    });

prompt.start();

prompt.message = "";


var zoo = {
  welcome : "",
  menu : function(){
            console.log("Enter (A): ------> to Add a new animal to the Zoo!")
            console.log("Enter (U): ------> to Update info on an animal in the Zoo!")
            console.log("Enter (V): ------> to Visit the animals in the Zoo!")
            console.log("Enter (D): ------> to Adopt an animal from the Zoo!")
            console.log("Enter (Q): ------> to Quit and exit the Zoo!")
        },
  add : function(input_scope){ 
          console.log("To add an animal to the zoo please fill out the following form for us!"); 
          prompt.get(['name', 'type', 'age'], function (err, result) { 
            connection.query("INSERT INTO animals (name, type, age) VALUES (result.name, result.type, result.age)");
            console.log('Command-line input received:');
            console.log('  username: ' + result.username);
            console.log('  email: ' + result.email);
          });
        currentScope.menu();
        currentScope.promptUser();
        },
  visit : function(){
            console.log("Enter (I): ------> do you know the animal by it's id? We will visit that animal!")
            console.log("Enter (N): ------> do you know the animal by it's name? We will visit that animal!")
            console.log("Enter (A): ------> here's the count for all animals in all locations!")
            console.log("Enter (C): ------> here's the count for all animals in this one city!")
            console.log("Enter (O): ------> here's the count for all the animals in all locations by the type you specified!")
            console.log("Enter (Q): ------> Quits to the main menu!")
            currentScope.visit();
            currentScope.view(currentScope);
          },
  view : function(){
              var currentScope = input_scope;
              console.log("Please choice what you like to visit!");
              prompt.get(['->', 'visit'], function (err, result) {
                if (result.visit == "Q") {
                  currentScope.menu();
                }; else if (result.visit == "O") {
                  currentScope.type(input_scope);
                }; else if (result.visit == "I") {
                  currentScope.type(input_scope);
                }; else if (result.visit == "N") {
                  currentScope.type(input_scope);
                }; else if (result.visit == "A") {
                  currentScope.type(input_scope);
                }; else if (result.visit == "C") {
                  currentScope.type(input_scope);
                }; else {
                  console.log("Sorry didn't get that, come again?");
                  currentScope.visit();
                  currentScope.view(currentScope);
                };
              });
            };
  type : function(input_scope){
            var currentScope = input_scope;
            console.log("Enter animal type to find how many animals we have of those type");
            prompt.get(['->', 'animal_type'], function (err, result) {
              connection.query("SELECT animals.type FROM animals WHERE type=result.animal_type");
            });
            currentScope.menu();
            currentScope.promptUser();
          },

  animID : function(input_scope){
            var currentScope = input_scope;
            console.log("Enter ID of the animal you want to visit");
            prompt.get(['->', 'animal_id'], function (err, result) {
              connection.query("SELECT animals.type FROM animals WHERE id=result.animal_id");
            });
            currentScope.menu();
            currentScope.promptUser();
          },  

  name : function(input_scope){
            var currentScope = input_scope;
            console.log("Enter name of the animal you want to visit");
            prompt.get(['->', 'animal_name'], function (err, result) {
              connection.query("SELECT animals.type FROM animals WHERE id=result.animal_name");
            });
            currentScope.menu();
            currentScope.promptUser();
          },      

  all : function(input_scope){
            var currentScope = input_scope;
            console.log("What type of animal would you like to count?");
            prompt.get(['->', 'animal_id'], function (err, result) {
              connection.query("SELECT type, count(*) as 'Cnt' FROM animals GROUP BY type");
            });
            currentScope.menu();
            currentScope.promptUser();
          },      
  update : function(input_scope){
            var currentScope = input_scope;
            prompt.get(['--->','id','new_name','new_age','new_type','new_caretaker_id'], function (err, result) {
              connection.query("INSERT INTO animals ('id','new_name','new_age','new_type','new_caretaker_id') VALUES (result.id, result.new_name, result.new_age, result.new_type, result.new_caretaker_id)");
            });
            currentScope.menu();
            currentScope.promptUser();
          },

  adopt : function(input_scope){
            var currentScope = input_scope;
            console.log("Enter ID of the animal you want to adopt");
            prompt.get(['->', 'animal_id'], function (err, result) {
              connection.query("DELETE animals WHERE id=result.animal_id");
            });
            currentScope.menu();
            currentScope.promptUser();
          }, 

  promptUser : function() {
                var self = this;
                prompt.get(['input'], function (err, result) {
                  if (result.input == Q) {
                    self.exit();
                  }; else if (result.input == A) {
                    self.add(self);
                  }; else if (result.input == V) {
                    self.visit();
                  }; else if (result.input == D) {
                    self.adopt(self);
                  }; else {
                    console.log("Sorry, didn't get that, come again?")
                  };
                });
              },

  exit : function () {
            console.log("Thank you for visiting us, good bye~!");
            process.exit();
          },

  open : function () {
    this.welcome();
    this.menu();
    this.promptUser();
  }

}

  function care(input_scope) {
    var currentScope = input_scope;
    console.log("Enter city name NY/SF");
  }


connection.end();