
/*
*Crear servidor con un objeto app 
*/
var sever = require('express');
var app = sever();
/*
* Preparaqmos el motor de plantillas jade 
*/
app.set( "view engine", "jade" );
//es para crear una ruta donde se serviran las imagene, los stilos css entre otros.
app.use(sever.static('public'));

/*
* Metodo get enviamos datos a una vista index.jade
*/
app.get("/",function(req, res){
	res.render("index");
});

/*
* Metodo post que recibe parametros de un formulario
*/
/*
app.post("/", function( req, res ){
	res.render("form");
}); */

/*
*Especificamos el puerto
*/
app.listen(8888);