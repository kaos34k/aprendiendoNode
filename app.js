

//*Crear servidor con un objeto app 
var sever = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = sever();
//es para crear una ruta donde se serviran las imagene, los stilos css entre otros.
app.use(sever.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ) );


/*
*Crear una base de datos en la consola de mongo = use nombre de la db
* conectar a la base de datos mongoose.connect("mongodb://localhost/webNode");
* >>>>>>>>>>PILAS aqui esta la solución por si no te puedes conectar a mongo---------http://dba.stackexchange.com/questions/55056/how-to-connect-to-mongodb-on-windows-8
*/
mongoose.connect("mongodb://localhost/webNode");
//Definir un esquema o una tabla.
var productoChema = {
	title: String,
	descripcion: String,
	imagenUrl:String,
	precio: Number,
};

var Producto = mongoose.model("Producto", productoChema );
// Preparaqmos el motor de plantillas jade 
app.set( "view engine", "jade" );



//* Metodo get enviamos datos a una vista index.jade
app.get("/",function(req, res){
	res.render("index");
});

app.post("/menu", function( solicitud, respuesta ){
	var data = {
		title: solicitud.body.title,
		descripcion: solicitud.body.descripcion,
		imagenUrl: solicitud.body.imagenUrl,
		precio: solicitud.body.precio
	}
	
	var producto = new Producto(data);
	
	producto.save( function(error){
			res.render("index");
	});

	respuesta.render("menu/new");
});

app.get("/menu/new", function( solicitud, respuesta ){
	respuesta.render("menu/new");
});

//*Especificamos el puerto
app.listen(8888);