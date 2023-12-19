import dotenv from 'dotenv'
dotenv.config()//this looks in the .env file, gets the variables and load them in the app environment
import config from './config'
import app from './server'

app.listen(config.port,()=>{
    console.log(`Hello on http://localhost:${config.port}`)
})