var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/base_datos');

var user_schema = {
	nombre:String,
	segundo_nombre : String,
	usuario:String,
	password:String,
	edad :Number,
	email: String,
	fecha_nacimiento:Date,
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