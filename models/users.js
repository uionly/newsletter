var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema,
    bcrypt    = require('bcryptjs');



var UserSchema = new Schema({
  created:{type: Date, default:new Date()},
  username:{type: String,  required: true, unique: true},
  email: {
    type: String,
    required: true,
    unique: true
  },

  hashed_password: {
    type: String
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
  token: String
})


/**
 * Virtuals
 */
UserSchema.virtual('password').set(function(password) {
  console.log('virtual', password)
  this._password = password;
  this.salt = this.makeSalt();
  this.hashed_password = this.hashPassword(password);
  this.activationCode = Date.now().toString().substr(4, 4) + Date.now().toString().substr(6, 4) + Date.now().toString();
}).get(function() {
  return this._password;
});

/**
 * Methods
 */
UserSchema.methods = {
  makeSalt: function() {
    return bcrypt.genSaltSync(10);
  },
  hashPassword: function(password) {
  if (!password || !this.salt) return '';
  var salt = new Buffer(this.salt, 'base64');
  //return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  return bcrypt.hashSync(password, 10);
},
}


var User = mongoose.model('User', UserSchema);

module.exports = User;
