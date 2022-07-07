const LocalStrategy=require("passport-local").Strategy
const db=require("./db");
//const passport=require("passport");
module.exports=(passport)=>{
 Users=db.models.Users;
passport.serializeUser((user,done)=>{
 done(null,user.id);   
});
passport.deserializeUser((id,done)=>{
  
    Users.findOne({where :{id:id}})
    .then((user)=>{
        if(user)
        return done(null,user);
        else
        return done(null,false);
    })
    .catch(error => done(error,null));
});
passport.use("local-signup", new LocalStrategy({
    usernameField:"email",
    passwordField:"password",
    passReqToCallback:true
},(req,email,password,done)=>{
Users.create(req.body)
.then(user=>{
    return done(null,user);
}).
catch(error => console.log(error.message));
}));

passport.use("local-login", new LocalStrategy({
    usernameField:"email",
    passwordField:"password",
    passReqToCallback:true
},(req,email,password,done)=>{
Users.findOne({where :{email:email}})
.then(user=>{
      if(user)
    return done(null,user);
    else
    return done(null,false,console.log("no user existed"));
    
}).
catch(error => console.log(error.message));
}));



}