import exp from "constants";
import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res, next) => {
  try{
    const hash = await hashPassword(req.body.password);

    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hash,
      },
    });
    const token = createJWT(user);
    res.json({ token });
  } catch (e){
    e.type = 'input'
    next(e)
  }
};

export const signin = async (req,res)=>{
    const user = await prisma.user.findUnique({
        where:{
            username:req.body.username
        }//Look for the user
    })//With the user check if the password matches 
    //(we don't need toconsider the hashing, because in auth (where is comparePasswords), i do the hashing)
    const isValid = await comparePasswords(req.body.password,user.password)
    if (!isValid){
        res.status(401)
        res.json({message:"NOPE"})
        return
    }
    const token = createJWT(user);
    res.json({ token });
}