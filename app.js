var sever = require('express');
var app = sever();

app.set( "view engine", "jade" );

app.get("/",function(req, res){
	res.render( "index", { hola: "yeison"} );
	res.end();
});

app.post("/", function( req, res ){
	res.render("form");
}); 

app.listen(8888);