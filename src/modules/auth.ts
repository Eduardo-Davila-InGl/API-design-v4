import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const comparePasswords =(password,hash)=>{//Password is send in plain text from user, and the hashed one
  return bcrypt.compare(password,hash)
}
export const hashPassword = (password)=>{
  return bcrypt.hash(password,5)
  //the 5 is the "salt", that is the nomber of cycles that the password will pass of hashing
}

export const createJWT = (user)=>{
    const token = jwt.sign({id:user.id,username:user.username},process.env.JWT_SECRET)
    return token
}
export const protect = (req, res, next) => {
    const bearer = req.headers.authorization;
  
    if (!bearer) {
      res.status(401);
      res.send({message:"Not authorized"});
      return;
    }
    const [, token] = bearer.split(" ");
    if (!token) {
      res.status(401);
      res.send({message:"Not valid token"});
      return;
    }
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      next();
      return;
    } catch (e) {
      console.error(e);
      res.status(401);
      res.send("Not valid token");
      return;
    }
};