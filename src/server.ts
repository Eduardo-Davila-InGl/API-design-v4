import express from 'express'
import router from './router'
import morgan from 'morgan'
import { protect } from './modules/auth'
import { createNewUser, signin } from './handlers/user'
import { error } from 'console'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res,next)=>{
    res.json({message:"hello"})
})
app.use('/api',protect,router)

app.post('/user',createNewUser)
app.post('/signin',signin)

app.use((err,req,res,next)=>{
    if (err.type ==='auth'){
        res.status(401).json({message:'Unauthorized'})
    } else if (err.type === 'input'){
        res.status(400).json({message:'invalid input'})
    } else {
        res.status(500).json({message:'Ops thats on us'})
    }
})

export default app