var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/base_datos');
var email = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/,"El correo no es valido"];
var gen = ["F","M"];

var user_schema = {
	nombre:String,
	segundo_nombre : String,
	usuario:{type:String, required: true, maxlength:[50, "Nombre de usuario es muy grande"]},
	password:{type:Stringl, minlength[8, "La contraseña es muy corta"]},
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
