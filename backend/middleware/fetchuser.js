const jwt = require('jsonwebtoken');
const JWT_SEC = 'awdawdawd131224122222!$#!#$%daw';
const fetchuser  = (req,res,next)=>{
  //Get The User From The JWT Token and add id to req objct 
  const token = req.header('auth-token');
  if(!token){
    res.status(401).send({error:"Please authenticate using a valid token "})
  }
  try {
    const data = jwt.verify(token,JWT_SEC)
    req.user = data.user 
  next();
  } catch (error) {
    res.status(500).send({error:"Couldn't verify the JWT token "});
  }
  
}
module.exports  = fetchuser;