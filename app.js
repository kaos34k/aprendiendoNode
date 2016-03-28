/*
*Estylos para un over redondo: http://tympanus.net/codrops/2012/08/08/circle-hover-effects-with-css-transitions/
*Comandos para instalar dependencias : -->
* npm install express --save //--crear el servidor 
* npm install mongoose --save //bases de datos
* npm install body-parser --save //--parsear eljson de resultados
* npm install multer --save //--para subir archivos 
* npm install cloudinary --save //--un repositorio para subir archivos
*/
//Crear servidor con un objeto app 
var sever = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer  = require('multer');
var cloudinary = require('cloudinary');
var methodOverride = require('method-override');
var pwd = "1234";

//Configurar cloudinary
cloudinary.config({
	cloud_name:"dgevxnhnn",
	api_key: "396979134749836",
	api_secret: "zn4oGtIVoJF_1TUZS6yiWqD7baQ"
});

var app = sever();
//es para crear una ruta donde se serviran las imagene, los stilos css entre otros.
app.use(sever.static('public'));

//Funciona para poder comprender el body o cuerpo de la información
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
//app.use(multer({dest:"./uploads/"})); No se por que esta dañado no funciona

/*
*Crear una base de datos en la consola de mongo = use nombre de la db
* conectar a la base de datos mongoose.connect("mongodb://localhost/webNode");
* >>>>PILAS aqui esta la solución por si no te puedes conectar a mongo---------http://dba.stackexchange.com/questions/55056/how-to-connect-to-mongodb-on-windows-8
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

//Formulario de ingreso a la administración de la app
app.post("/admin",function(solicitud,respuesta){
	if(solicitud.body.password == pwd){
		Producto.find(function(error,documento){
			if(error){ console.log(error); }
			respuesta.render("admin/index",{ productos: documento })
		});
	}else{
		respuesta.redirect("/");
	}
});

//pasar la vista del menu registro de productos
app.get("/menu/new", function( solicitud, respuesta ) {
	respuesta.render("menu/new");
});

//Guardar productos
app.post("/menu", function( solicitud, respuesta ) {
	var data = {
		title: solicitud.body.title,
		descripcion: solicitud.body.descripcion,
		imagenUrl: "",
		precio: solicitud.body.precio
	}

	console.log(data);
	var producto = new Producto(data);

	producto.save( function( error ){
		if( error ) { console.log( error ) };
		respuesta.render("index");
	}); 
	/*cloudinary.uploader.upload( solicitud.files.imagenUrl.path, 
		function( result ) { 
	  		producto.imagenUrl = result.url;
	  		producto.save( function( error ){
	  			console.log('producto');
				respuesta.render("index");
			}); 
		}
	);*/
});

//Consultar o listar productos
app.get("/menu", function( solicitud, respuesta ) {
	Producto.find(function(error, documento) {
		if(error){console.log(error)}
		respuesta.render("menu/index", { productos: documento });	
	});
});

app.get("/admin",function(solicitud,respuesta){
	respuesta.render("admin/form");
});
 

app.put("/menu/:id",function(solicitud,respuesta){	
	var id = solicitud.params.id;
	if( pwd  == solicitud.body.password ){
		var data = {
			title: solicitud.body.title,
			descripcion: solicitud.body.descripcion,
			precio: solicitud.body.precio
		};

		Producto.update({"_id": id}, data, function(product){
			respuesta.redirect("/menu");
		});	

	} else {
		respuesta.redirect("/");
	}
});

app.get("/menu/edit/:id",function(solicitud,respuesta){
	var id_producto = solicitud.params.id;
	Producto.findOne({"_id": id_producto},function(error,producto){
		respuesta.render("menu/edit",{ product: producto });
	});

});


/*/Editar un producto 
app.put("/menu/:id", function(solicitud,respuesta) {
	var data = {
		title: solicitud.body.title,
		descripcion: solicitud.body.descripcion,
		precio: solicitud.body.precio
	};
	console.log(solicitud.params.id);
	Producto.update( {"_id": solicitud.params.id}, data, function(producto){
		respuesta.redirect("/menu");
	});
});

app.get("/menu/edit/:id", function(solicitud, respuesta){
	var id_producto = solicitud.params.id;
	Producto.findOne({"_id": id_producto }, function(error, producto){
		respuesta.render("menu/edit", { producto: producto });
	});	
});
*/

app.get("/menu/delete/:id", function(solicitud, respuesta){
	var id_producto = solicitud.params.id;
	Producto.findOne({"_id": id_producto},function(error,producto){
		respuesta.render("menu/delete",{ product: producto });
	});
});

app.delete("/menu/:id", function(solicitud, respuesta){
	var id =  solicitud.params.id;
	if(solicitud.body.password == pwd){
		Producto.remove({"_id": id}, function(error){
			if(error){ console.log(error); }
			respuesta.redirect("/menu");
		});	
	} else {
		respuesta.redirect("/");
	}
});

//Especificamos el puerto
app.listen(8888);	