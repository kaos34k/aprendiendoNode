var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/base_datos');
var email = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/,"El correo no es valido"];
var gen = ["F","M"];

/*validaciones personalizadas*/
var = validar_contraseña = {
	validator: function(pass){
		return this.password_confirmation = pass;	
	},
	message:"Las contraseñas no son iguales",
};	


var user_schema = {
	nombre:String,
	segundo_nombre : String,
	usuario:{type:String, required: true, maxlength:[50, "Nombre de usuario es muy grande"]},
	password:{type:Stringl,	minlength[8, "La contraseña es muy corta"],validate: validar_contraseña},
	edad :{ type:Number, min:[5, "la edad no puede ser menor que 5"], max:[90, "La edad no puede ser mayor a 90"] },
	email: {type:String, required: "El correo es obligatorio", match:email},
	fecha_nacimiento:Date,
	genero:{type:String, enum:{values:gen, message:"Opcion no valida"}}
};

user_schema.virtual('password_confirmation').get(function() {
	return this.p_confirmation;
}).set(function(password){
	this.p_confirmation = password;
});

user_schema.virtual('full_name').get(function() {
	return this.name + this.segundo_nombre;
}).set(function(full_name){
	var word = full_name.split('');
	this.nombre = word[0];
	this.segundo_nombre = word[1];
});

var user = mongoose.model('User', user_schema);
/*
*
*/
module.exports.user = user;
/*
 *hasta aqui va el modelo  de mongo para ser exportado a otros arcchivos ver video 19 y 7 CF
*/


/*para guardar un modelo*/

app.post( "/users", function( req, res) {
	var user= new user({
		nombre:req.body.nombre,
		segundo_nombre : req.body.segundo_nombre,
		usuario:req.body.usuario,
		password:req.body.password,
		edad :req.body.edad,
		email: req.body.email,
		fecha_nacimiento:req.body.fecha_nacimiento,
		genero:req.body.genero	
	});
	user.save().then( function(usu){
		res.send("El susario a sido guardado con éxito ");
	},function(err){
		if(err){
			console.log(String(err));
			res.send("Ocurrio un error al crear el usuario");
		}
	});
});
