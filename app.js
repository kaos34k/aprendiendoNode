
/*
*Crear servidor con un objeto app 
*/
var sever = require('express');
var app = sever();
/*
* Preparaqmos el motor de plantillas jade 
*/
app.set( "view engine", "jade" );


/*
* Metodo get enviamos datos a una vista index.jade
*/
app.get("/",function(req, res){
	res.render( "index", { hola: "yeison"} );
	res.end();
});

/*
* Metodo post que recibe parametros de un formulario
*/

app.post("/", function( req, res ){
	res.render("form");
}); 

/*
*Especificamos el puerto
*/
app.listen(8888);