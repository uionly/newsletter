var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
// var User = mongoose.model('User');
var User = require('../../models/users')
var bcrypt    = require('bcryptjs');
var jwt = require('jsonwebtoken');



var ensureAuthorized = function(req, res, next) {

  var bearerToken;
  var bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== 'undefined') {
    var bearer = bearerHeader.split(" ");
    bearerToken = bearer[1];
    req.token = bearerToken;

    //populate({path: 'following', select: 'name email'}).

    User.findOne({token: req.token})
    .populate('following')
    .exec(function(err, user) {
      if (err || !user) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(403);
  }
};

//login user
router.post('/login', function(req, res){
  console.log(req.body)
  User.findOne({username:req.body.username}, function(err, user){

    if(user){
      if(user.isAdmin){
        bcrypt.compare(req.body.password, user.hashed_password, function(err, rs){
          if(rs){
              res.send({success:true, isAdmin:true, message:"LoggedIn Successfully!", final:true, record:user, token:user.token})
          }else{
              res.send({success:false, message:"Authentication failed!"})
          }
        })
      }else{
        bcrypt.compare(req.body.password, user.hashed_password, function(err, rs){
          if(rs){
              res.send({success:true,isAdmin:false, message:"LoggedIn Successfully!", final:true, record:user, token:user.token})
          }else{
              res.send({success:false, message:"Authentication faild!"})
          }
        })
      }
    }else{
      res.send({success:false, message:'User is not Registered!'})
    }
  })
})

//register user
router.post('/register', function(req, res){
  User.findOne({username:req.body.username}, function(err, user){
    if(user){
      res.send({success:false, message:'Username already taken!!'})
    }else{
      User.findOne({email:req.body.email}, function(err, user){
        if(user){
          res.send({success:false, message:'Email is already registered!'})
        }else{
          var newUser = new User(req.body);
          newUser.token = jwt.sign(newUser.toObject(), 'newsletter');
        
          newUser.save(function(err, user){
            if(!err){
              res.send({success:true, message:'User has been created...'})
            }else{
              res.send({success:false, message:err})
            }
          })
        }
      })
    }
  })

})

router.get('/allNewsletter', ensureAuthorized, function(req, res){
  res.send({success:true, message:'loading all newsletter'})
})


module.exports = router;
