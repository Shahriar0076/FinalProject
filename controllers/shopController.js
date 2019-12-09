var data; var user = "shahriar";



//mongodb
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://test:12345@mydb-ze9gx.gcp.mongodb.net/test?retryWrites=true&w=majority";
//var url = "mongodb+srv://test:test@mydb-ze9gx.gcp.mongodb.net/test?retryWrites=true&w=majority";
namespace="ecommerce";

//insert
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db(namespace);
  var myobj = { name: "mmm", price: "67", description:"goodd thing to wear" ,img: 'i4.jpg' };
  /*dbo.collection("product").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });*/

  //print
  var query = { };
  dbo.collection("product").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log("query on success");
    data=result;
    db.close();
  });
});



module.exports = function(app) {
      app.get('/', function(req,res){
      	//var data = {age:29,job:'ninja',hobbies:['eating','fighting','fishing']}
      	
        res.render('index', {data:data});

      });

      app.get('/cart', function(req,res){
      	//var itemaddtocart = request.params.item.replace(/\-/g, ' ');


      	res.render('cart');
      });

      app.get('/login', function(req,res){
        //var itemaddtocart = request.params.item.replace(/\-/g, ' ');
        res.render('login');


        if (req.query.username!=null && req.query.pass!=null) {

              MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db(namespace);
  

  

 




  dbo.collection("usernameandpassword").findOne({username: req.query.username}, function(err, result) {
    if (err) throw err;
    console.log(result.username);

    dbo.collection("usernameandpassword").findOne({password: req.query.pass}, function(err, result) {
    if (err) throw err;
    console.log(result.password);
    console.log("success login");
    
    db.close();

  });


    db.close();
  });

  });

}




      });

      app.get('/signup', function(req,res){
        //var itemaddtocart = request.params.item.replace(/\-/g, ' ');
        var qs;
        res.render('signup');
//{qs:req.query}
  
      if (req.query.username!=null && req.query.pass!=null) {

              MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db(namespace);
  var myobj = { username: req.query.username, password : req.query.pass };
  dbo.collection("usernameandpassword").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
    

  });

  });

}



      });
}