/*https://hendrixer.github.io/API-design-v4/    
PAge with content of the course

Also is a git repo https://github.com/Hendrixer/API-design-v4-course
We will use postgress for DB instead of mongo
We will use render for deploy*/

//SECTION API basics in NODE js

/*First lets cerate an http server so in root folders terminal
npm init --yes
Create a src folder inside an index.js file, and in that file*/
const http = require('http')
//Built in module to interact with things outside node js
//Now lets made a server
//Server is like a computer in which we can request some data, or to do something from a client
//A client can be another server, a browser, an app
const server = http.createServer(async (req,res)=>{
    //request and response
    if (req.method === 'GET' && req.url === '/'){//chek if someone is doing an specific request
        res.statusCode(200)
        res.end()
    }
})//This sets what the server will do, in an specific case

server.listen(3001,()=>{
    console.log('Server on http://localhost:3001')
})
//And finally we start up the server

/*Now we can start the server, in terminal node src/index.js
But res.statusCode() is a express tool, and we havn't import it, so lets just delete that line by now
And add a console.log, to verify the server is working*/
const http = require('http')

const server = http.createServer(async (req,res)=>{
    if (req.method === 'GET' && req.url === '/'){
        console.log('Hello from server')
        res.end()
    }
})
server.listen(3001,()=>{
    console.log('Server on http://localhost:3001')
})
/*And now in the browser I can visit:   Server on http://localhost:3001
And will see a blank page, and in vs terminal, I see that the server gives the console.log

Request and respose
The request can carry a lot of information to gives an specific response
So the response depends direclty on what is in the request
When someone makes a request to a server, that is known as an event

request and response, is like a callback, that is triger on the request event
In the browser, dev tools, network/red I can see that the browser is accually making a GET request*/

/*ANATOMY OF AN API
API is the code that runs on the server
A server is an app with no visual representation, it is always runing, usually conected to a network
A port is like a virtual place in a computer where a network conection start and end (4 or 5 digits)
And there can only be 1 server in a port at a time
IP adress is a unique location of where the server is located on the network
The IP adress for local host is:    127.0.0.1:5000 (5000 is the port)

ROUTE
A route is a unique combination of a URL path, and a http method (GET, POST, PUT, PATCH, DELETE, OPTIONS)
GET /food
So use a GET method in the current_direction/food
An API is a register of this types of routes
REST, graphql, hrpc are design patterns for the routes

route handler is a function that will answer to an specific event, to a specifique route

CREATING A SERVER WITH EXPRESS
Express is a framwork for nodejs

Lets install express, npm i express --save
now inside of src folder, create a server.js file, where all of the code from express will be
An inside of server.js
Now instead of JS http server, lets make a express server*/
const express = require('express')

//Now we make the API with express
const app = express()

//If we want to respond to a GET request with the given route
app.get('/',(req,res)=>{
    console.log('Hello from express')
    res.status(200)
    res.send({message:'hello'})
})

module.exports = app

/*Now lets use this in the index, so delete everything in index, and then...*/
const app = require('./server')
app.listen(3001,()=>{
    console.log('Hello on http://localhost:3001')
})

/*Now visit in the browser http://localhost:3001
And in VS terminal I will see Hello on http://localhost:3001
Then 'Hello from express'
And in the browser I will recieve a string with {"message":"hello"} the JSON data*/

//END of subsesction

//SUBSECTION Prisma

/*Object relational mapper (ORM)
ORM is "the library" that will be installed and used to interact with a dataBase
It helps so instead of writing, for example, SQL code, you can pass an object via a method
of the library, and that will interact with the DB

HEre we will use Prisma ORM, and PostgresSQL for the DB
In render.com
in + tab, select PostgreSQL
Select a name, and everything else on default, except, change to free plan
And then create DB
Then just wait that the status change to aviable, from creating
Then scroll down to Connections
And then copy the link that is in external database URL
postgres://example_postregsql_db_eedl_user:LzxVnoHynnmlDhbA3ydlM6TfldBqQmJZ@dpg-clsacd7qd2ns7394etq0-a.oregon-postgres.render.com/example_postregsql_db_eedl

Now lets install prisma in our app, and a couple of dependencies so first in terminal
npm i typescript ts-node @types/node prisma --save-dev 

And once it is installed we will crete a tsconfig file, which is a configuration for typescript
Typescript is like a compliler that transform code to JS

So in the root of the project create a tsconfig.json file with
{
    "compilerOptions": {
      "sourceMap": true,
      "outDir": "dist",
      "lib": ["esnext"],
      "esModuleInterop": true
    }
}

Now we initialize globaly prisma qith npx prisma init
That will return some lines, including next steps recomended, and also
it creates a prisma folder in the root of the project

Now to make it easy to use prisma in VS code, click in extensions, look for prisma, by prisma
And check if it is intslled, if not, install it now, just clicking install

Now in the prisma folder I can see 1 file named schema.prisma
That is where we will write a DB schema, that files has*/
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
    provider = "prisma-client-js"
  }
  
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }

/*I can also see a .env file in the root of the project with
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"

There we will delete the given url of jon doe, and paste our link from render external database url

With that we can close .env and schema.prisma files

Right now our files index and server ar .js, we now change them to be .ts
because they must be now typescript
Now modify server.ts*/
import express from 'express'

const app = express()

app.get('/',(req,res)=>{
    console.log('Hello from express')
    res.status(200)
    res.send({message:'hello'})
})

export default app

//AND also modify index.ts for
import app from './server'
app.listen(3001,()=>{
    console.log('Hello on http://localhost:3001')
})

/*Now we want a command to start the server in the app, so open package.json and modify
the scripts property adding a dev method
  "main": "personal-notes.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev":"ts-node src/index.ts"
  },
  "keywords": [],


LEts pass to designing a schema, firs the user schema, so open from prisma folder, schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
model User {
  id String @id @default(uuid())
  // uuid() provides a garanteed unique id
  createdAt DateTime @default(now())
  username String @unique
  password String
}

I create the model for user, which has 4 fields, and each has some info about the data that it will recieve

Now a product model, similar to the users one
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
model User {
  id String @id @default(uuid())
  createdAt DateTime @default(now())
  username String @unique
  password String
}
model Product {
  id String @id @default(uuid())
  createdAt DateTime @default(now())
  name String @db.VarChar(255)//Limit of characters
  belongsToId String
  belongsTo User @relation(fields: [belongsToId], references: [id])
  //belongsTo will have a User, which is related to the belongsToId field in Products model
  //And user field related to id inside User model
}


But the belongsTo field will be poined as an error, because right now is not suported the relationships
So we add them in terminal runing npx prisma format
And that creates a Product field in the User model
Because the reference must appear in both related models

And now an update model
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String    @id @default(uuid())
  createdAt DateTime  @default(now())
  username  String    @unique
  password  String
  Product   Product[]
}

model Product {
  id          String   @id @default(uuid())
  createdAt   DateTime @default(now())
  name        String   @db.VarChar(255) //Limit of characters
  belongsToId String
  belongsTo   User     @relation(fields: [belongsToId], references: [id])
}
//enum is like a bunch of constants
enum UPDATE_STATUS {
  IN_PROGRESS
  SHIPPED
  DEPRECATED
}
model Update {
  id          String   @id @default(uuid())
  createdAt   DateTime @default(now())
  updatedAt   DateTime
  title String
  body String
  status UPDATE_STATUS @default(IN_PROGRESS)
  version String? //The version is optional
  asset String?

  //And now fields with relationships
  productId String
  product Product @relation(fields: [productId], references: [id])
}

And again in terminal npx prisma format
Finally just add 
model UpdatePoint {
  id          String   @id @default(uuid())
  createdAt   DateTime @default(now())
  updatedAt   DateTime
  name        String   @db.VarChar(255)
  description String

  updateId String
  update   Update @relation(fields: [updateId], references: [id])
}
And run again npx prisma format, and modify update model
model Update {
  id        String        @id @default(uuid())
  createdAt DateTime      @default(now())
  updatedAt DateTime
  title     String
  body      String
  status    UPDATE_STATUS @default(IN_PROGRESS)
  version   String? //The version is optional
  asset     String?

  productId   String
  product     Product       @relation(fields: [productId], references: [id])
  updatePoints UpdatePoint[]
}       */

/*Migrations
Relation DBs need migrations 
Is to teach a DB about the shape of the data

To use migration first we will install:  npm i @prisma/client --save
Once it is installed just verify that iin the .env file, the DATABASE_URL
has assignated my url given by render as external database url

Now we can migrate with     npx prisma migrate dev --name init
(If I want to do this a second time, in the same DB, I will have to execute first
npx prisma migrate reset    to reset the DB from scratch)
And after 1 min aprox, I will recieve a message Your database is now in sync with your schema
And it creates a migrations folder inside prisma, with 1 folder and 1 file
Now inside the folder is a migration.sql file, and I can see there the DB code
That prisma made for us to create a sql database*/

//END of subsection

//SUBSECTION Routes and middleware

/*Now the DB is ready, and the server too. So now we want to start assignating things to routes
We have to add the CRUD-> Create Read Update Delete

Inside src folder, create router.ts file
The difference between app route and a router is, that app is the entire API,
and a router is a small part of it

In router.ts we write the structure, with the methods and routes that we will have in the app
So then we will just be filling them*/
import {Router} from 'express'

const router = Router()
//Product routers
router.get('/product',()=>{})
// :id says that I want to take what is in that part of the url and save it as id variable
router.get('/product/:id',()=>{})
router.put('/product/:id',()=>{})
router.post('/product',()=>{})
router.delete('/product/:id',()=>{})

//Update routers
router.get('/update',()=>{})
router.get('/update/:id',()=>{})
router.put('/update/:id',()=>{})
router.post('/update',()=>{})
router.delete('/update/:id',()=>{})

//Update Point
router.get('/updatepoint/:id',()=>{})
router.get('/updatepoint',()=>{})
router.put('/updatepoint/:id',()=>{})
router.post('/updatepoint',()=>{})
router.delete('/updatepoint/:id',()=>{})

/*And given that we are adding a new file in the application, we must import it in it*/
export default router

//And then in server.ts import and use the router
import express from 'express'
import router from './router'

const app = express()

app.get('/',(req,res)=>{
    console.log('Hello from express')
    res.status(200)
    res.send({message:'hello'})
})
app.use('/api',router)//'api' will be a "prefix" to the routes in the router so... localhost:3001/api/product
//use is a build in method in express, to add like a global configuration, to a certain path, or hole app

export default app

/*Now lets run our app in the server, we can call it again with
node src/index.js       Or we can just call the script n package.json
npm run dev

Now to make the request, to simulate a client, we will use Thunder Client
Which is an extension in VS code
In there I create a GET product request
But right now my server does nothing with a request, so lets start with this particular one*/
//Product routers
router.get('/product',(req,res)=>{
    res.json({message:'hello'})
})
router.get('/product/:id',()=>{})
router.put('/product/:id',()=>{})
router.post('/product',()=>{})
router.delete('/product/:id',()=>{})

/*Now, before we move on, we will add some middleware to add authentication, handle errors, and generally
And just some extracode, between the request, and the app making changes in the DB

We will use a module for middleware so in terminal
npm i morgan --save     
And then in server.ts*/
import express from 'express'
import router from './router'
import morgan from 'morgan'

const app = express()

app.use(morgan('dev'))
/*App.use doesn't necessary need to have a rout prefix, like api, or anything else
That means that the morga('dev') will be applied to the entire app, in all routes, every request*/
app.get('/',(req,res)=>{
    console.log('Hello from express')
    res.status(200)
    res.send({message:'hello'})
})
app.use('/api',router)

export default app

/*Now if I send again the request (after restarting my server) 
(in thunder client, get request to http://localhost:3001/api/product, with no body)
besides the message: 'hello', In VS terminal 
I will see:       GET /api/product 200 2.412 ms - 19
Which is generated bby morgan middleware, it is the resume of the response

Now this middleware is not very usefull, so lets create a custom Middleware*/

//Creating a custom middleware

import express from 'express'
import router from './router'
import morgan from 'morgan'

const app = express()

app.use(morgan('dev'))
app.use(express.json())//Allows client to send JSON
app.use(express.urlencoded({extended:true}))//Allow client to add query string, parameters, decode, encode, etc

//Now lets make middleware
app.use((req,res,next)=>{
    req.shh_secret='doggy'
    next()
})
//So by the time, this gets called, req.shh_secret exist in the app
app.get('/',(req,res)=>{
    console.log('Hello from express')
    res.status(200)
    res.send({message:'hello'})
})
app.use('/api',router)

export default app

/*So now lets use the req.shh_secret in the router.ts file, instead of hello */
import {Router} from 'express'

const router = Router()
//Product routers
router.get('/product',(req,res)=>{
    res.json({message:req.shh_secret})
})
router.get('/product/:id',()=>{})
router.put('/product/:id',()=>{})
//...

/*Lets test it, shut down serverm start it again, and send the request
And I will recieve as response {"message": "doggy"}   
So in this case, the middleware augment the req object, adding a shh_secret property

The router can do many things, besides returning an object, like returning a string
And change the status code (before the client reach the given URL)*/
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use((req,res,next)=>{
    res.status(401)
    res.send('Nope')
})

app.get('/',(req,res)=>{
    console.log('Hello from express')
    res.status(200)
    res.send({message:'hello'})
})
/*Here the router never call next, so it will never get call the code in router
And all the client will get is the nope and 401 status code
In this case, the URL can be anyone, and always will return nope
Because the middleware is in the hole app

Now lets delete that middleware with the nope and set server back to*/
import express from 'express'
import router from './router'
import morgan from 'morgan'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    console.log('Hello from express')
    res.status(200)
    res.send({message:'hello'})
})
app.use('/api',router)

export default app
/*Beause that was totally useless middleware
And in route remove res.shh_secret, back to 'message'

In an app, you can add any number of middlewar
app.get("/todo/:id", myMiddleware, my2ndMiddleware, handler);
// or
app.get("/todo/:id", [myMiddleware, my2ndMiddleware], handler);   
Here w¿he install cors, at the end of video, and section, but says that 
Will not be used, so in case I need it, com back here to look for it CORS*/


//END of subsection

//Authentication

/*We will acomplish the authentification with JWT (Json Web Token)
JWT takes a JS object, and given a secret, it convert it to a random string
And that string can be converted back to the same object, given the same secret

So lets first install it with
    npm i jsonwebtoken bcrypt dotenv  
That line installs the 3 npm libraries in one shot

No inside src folder, create a new folder named modules, and inside modules
create a file auth.ts

There are many ways to organize code, on is to have 1 file for middleware,
one file for handlers, one for authentification and so on...
But here we eill have 1 file pere complete route (I think)
So now in     .env  lets add the secret that will be used for jwt generation 

DATABASE_URL="postgres://example_postregsql_db_eedl_user:LzxVnoHynnmlDhbA3ydlM6TfldBqQmJZ@dpg-clsacd7qd2ns7394etq0-a.oregon-postgres.render.com/example_postregsql_db_eedl"
JWT_SECRET="cookies"#Can be any string you want   */

//And then we need to load this as global variable, so in index.ts
import * from 'dotenv'
dotenv.config()//this looks in the .env file, gets the variables and load them in the app environment

import app from './server'

app.listen(3001,()=>{
    console.log('Hello on http://localhost:3001')
})
/*We do this in the index.js because it is our entry point to the server

And now we can use it in the jwt generation in auth.ts*/
import jwt from 'jsonwebtoken'

export const createJWT = (user)=>{
    const token = jwt.sign({id:user.id,username:user.username},process.env.JWT_SECRET)
    //second argument is a secret to "encode", to create the token,
    //This secret is generated in .env file
    return token
}
/*And that gives us back a string, based on the user id, username, and secret string*/

//Protecting routes

/*Now that we generate the token (we havn't save it yet)
Lets create some middleware that "protects" specific routes, to only authenticated users
Lets implement that in ath.ts first*/
import jwt from 'jsonwebtoken'

export const createJWT = (user)=>{
    const token = jwt.sign({id:user.id,username:user.username},process.env.JWT_SECRET)
    return token
}
export const protect = (req, res, next) => {//This authentication will be done in middleware
    const bearer = req.headers.authorization;//In the request header, you user
    //must pass me an authorization data
    //(express lowercase the variables, even if from browser, headers has capital leters)
  
    if (!bearer) {//bearer is like the token "type", so will be bearerTHENALLTHEToken
      res.status(401);
      res.send({message:"Not authorized"});
      return;
    }//401 is status code for not authorized
};
/*so now it is necessary that the request includes a bearer token in the headers
To keep going, if not, 401 

Now in server.ts lets make use of this authorization middleware*/
import express from 'express'
import router from './router'
import morgan from 'morgan'
import { protect } from './modules/auth'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    console.log('Hello from express')
    res.status(200)
    res.send({message:'hello'})
})
app.use('/api',protect,router)

export default app
/*So now if want to access /api 
before getting to the router, you must pass the protect middleware

Lets test it by seting up the server, by sending GET request to
http://localhost:3001/api/product
(without any body or headers right now)

It didn't allowed me to set up the server, so I have to change the way I import dotevn in index.js*/
import dotenv from 'dotenv'
dotenv.config()//this looks in the .env file, gets the variables and load them in the app environment

import app from './server'

app.listen(3001,()=>{
    console.log('Hello on http://localhost:3001')
})
/*And now send the request, and recieve correctly 401 status code and
an object with {"message": "Not authorized"}*/

//Validating a Bearer Token

/*Now in this moment, a request with no token, doesn't pass, and send back "not authorized"
but it can accept anything for token, we can test this in the request,
select the auth tab , then bearer and in the box, anything fdasfdfaad 
Now send the request, and it hangs in the request, because right now I don't
Have the right call to next, neither do the right handler

So now lets make the Token accually meaningfull, so now in auth.ts, modify the protect function*/
export const protect = (req, res, next) => {//This authentication will be done in middleware
  const bearer = req.headers.authorization;//In the request header, 

  if (!bearer) {
    res.status(401);
    res.send({message:"Not authorized"});
    return;
  }

  /*destructure in the const creation, because split returns [bearer,sdsadjskas]
  And we need that second string, that is the token*/
  const [, token] = bearer.split(" ");//Split because the token is like "bearer dffsdfafdsf"
  if (!token) {//If there is no token
    res.status(401);
    res.send({message:"Empty invalid token"});
    return;
  }
//Now we check if the token is correct, I must use the secret to decode the token  
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
/*Now if send the request, it will return with not valid token, so it passes the first part, about
having a token, but then fails, becsuse it is invalid one, it didn't work in the jwt.verify
Which is what we want*/

/*Given that I did the try catch, the server "solve" sending an error back to the client
If I didnn't try catch, then the server would crash on the error*/

//Authorization Header

/*Now... how do we access a a JSON Web Token
HEADER is a "special" place in the request, to deliver som info, more options of the request
Headers are key values headerName: value
Its like meta data of a request

We are already taking the info in the header, with...*/
const bearer = req.headers.authorization;

//Comparing and Hashing Passwordss

/*You should NEVER store plain text passwords in database, HASHED is for "encoding the password"
And there is no "unhashed" method, that hashed password is what you will use and save
So in auth.ts, lets use bcrypt, so lets add it in auth.ts*/
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

//Creating Users

/*Lets create inside src, a handlers folder
And inside of it, user.ts, and to make it easier to work with, then in
inside of src, a file named db.ts, db.ts with*/
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default prisma
/*So we can generate a client, by calling this file

Now in user.ts*/
import prisma from "../db";
import { createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
  const hash = await hashPassword(req.body.password);

  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: hash,
    },
  });

  const token = createJWT(user);
  res.json({ token });
};
/*We create a user, with the info of the request, hashed the password and oass the username
And with that we generate a token, that in inserted in the response as an object {token:token}*/

//Authenticating a User

/*Now we need to sign in so in user.ts, below the code of above
We check if the provided user exist in DB and if the password matchs with the one there*/
});

const token = createJWT(user);
res.json({ token });
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

//Adding User Routes

/*Now that the middleware for authorization is complete, lets add some routes in server.ts*/
import express from 'express'
import router from './router'
import morgan from 'morgan'
import { protect } from './modules/auth'
import { createNewUser, signin } from './handlers/user'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    console.log('Hello from express')
    res.status(200)
    res.send({message:'hello'})
})
app.use('/api',protect,router)

app.post('/user',createNewUser)
app.post('/signin',signin)

export default app
/*And it is moment to test it, restart the server
And now in thunder-client make new request, type post to url http://localhost:3001/user
The in body tab and in JSON part*/
{
  "username":"Scott",
  "password":"admin"
}
/*Send the request, and then I must recieve a 200 status code and an object with a token

Now open a new terminal, and on it execute npx prisma studio
And that will open a new page in a given local host port 5555
And in that page, I can see the db,
Right now it is just showing the models
And in User, I can see that there is one element
And if I click it, I can see the info of the user, Scott

Now lets test the token
So go back to the request on user, and copy the token from the response
And now in the first request, get from api/product
click in Auth tab and inside bearer token, paste the token
Send the request, and recieve a 200 status code, and an object 
{"message": "message"}

So now I create the user, now lets test sign in, so with the credentials used*/
{
  "username":"Scott",
  "password":"admin"
}
/*Make a new GET request to http://localhost:3001/signin
And inside the body, and json, paste the credentials and send the request
And send it, and we have an error, it is because we don't have a router in that URL with
GET but with POST, so just change that

Now if use a wrong password I will recieve a 401 and NOPE message, and
If use the right password recieve a 200 and a token

Now if send that request, but to url /user
(to create a new user with the same credentials info), it will throw an error
Because we tell prisma model, that we want the username to be unique
And the server crashed because of that error*/

//END of subsection

//Subsection Route and Error Handlers

//Validation Overview
/*In this section, we will add som validators to the request, and actions
That the user will be able to do*/

//Adding Validation to Routes

/*Lets start by installing express validator with
npm i express-validator --save
Then in router.ts
and inside the put of*/
router.put('/product/:id',()=>{})
//Lets add some validation, and now products router is
//Product routers
router.get('/product',(req,res)=>{
  res.json({message:'message'})
})
router.get('/product/:id',()=>{})
router.put('/product/:id',body('name'),(req,res)=>{//req.body should have a field called name
  const errors = validationResult(req)//the body('name') middleware, ataches something to the request
  //and validationResult will look for that atached info
  if (!errors.isEmpty()) {//If the errors, is not empty
      res.status(400);//400, bad request, didn't send the right body
      res.json({ errors: errors.array() });
  }
})
router.post('/product',()=>{})
router.delete('/product/:id',()=>{})
/*Lets test it in this moment, start the server
First send the sign in request, with Scott, and admin
And recieve the token, then copy the token and make a new PUT request to
http://localhost:3001/api/product/123456789    Put a random ID
in this moment the id is not important
Then in auth path in bearer, paste the token, withput the quotes
Send the request, and it hanging on the request

So lets add a simple console.log in the body of the router*/
router.put('/product/:id',body('name').isString(),(req,res)=>{
  const errors = validationResult(req)
  console.log(errors)
  if (!errors.isEmpty()) {
      res.status(400);
      res.json({ errors: errors.array() });
  }
})
/*And restart the server and then send again the request
AndI will recieve a 400 and the body of*/
{
  "errors": [
    {
      "type": "field",
      "msg": "Invalid value",
      "path": "name",
      "location": "body"
    }
  ]
}

//Route Validation exercise and Solution

/*Now lets add some code in the routers, but given that some validation
Will be the exact same, Lets add middleware. So inside modules folder, create a middleware.ts file
And inside the middleware file*/
import { validationResult } from "express-validator"

export const handleInputErrors = (req,res,next)=>{
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        res.status(400);
        res.json({ errors: errors.array() });
    } else {
        next()
    }
}
/*which has almost the same code as the one that I put
In the router, so now lets go to router.ts and use this*/
router.put('/product/:id',body('name').isString(),handleInputErrors,(req,res)=>{
    
})
/*So right now the handler is empty, because the content that we had, we are now using it via middleware
Lets just test it now restarting the server
And sending the put request to /api/product/342567
And correctly recieve a 400 and ...*/
{
  "errors": [
    {
      "type": "field",
      "msg": "Invalid value",
      "path": "name",
      "location": "body"
    }
  ]
}
/*Now lets keep working in the router.ts , in the put and post requests
Consider that we will use req.user.id, and nor req.body.id
Because  req.user has passed through validation, and authorization process
So we are certain that is a valid user, and in the body, the user can
send anyhones id, or any product id, and that hasn't being validated

Now router.ts*/
import {Router} from 'express'
import { body, oneOf, validationResult } from "express-validator"
import { handleInputErrors } from './modules/middleware'

const router = Router()
//Product routers
router.get('/product',(req,res)=>{
    res.json({message:'message'})
})
router.get('/product/:id',()=>{})
router.put('/product/:id',
    body('name').isString(),
    handleInputErrors,
    (req,res)=>{
    
})
router.post('/product',
    body('name').isString(),
    handleInputErrors,
    ()=>{

})
router.delete('/product/:id',()=>{})

//Update routers
router.get('/update',()=>{})
router.get('/update/:id',()=>{})
router.put('/update/:id',
    body('title').optional(),
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS','SHIPPED','DEPRECATED']),
    body('version').optional(),
    ()=>{})
router.post('/update',
    body('title').exists().isString(),
    body('body').exists().isString(),
    ()=>{})
router.delete('/update/:id',()=>{})

//Update Point
router.get('/updatepoint/:id',()=>{})
router.get('/updatepoint',()=>{})
router.put('/updatepoint/:id',
    body('name').optional().isString(),
    body('description').optional().isString(),
    ()=>{})
router.post('/updatepoint',
    body('name').isString(),
    body('description').isString(),
    body('updateId').exists().isString(),
    ()=>{})
router.delete('/updatepoint/:id',()=>{})

export default router

//GET PRODUCT HANDLERS

/*Now we have route validation for each router, that need it, so now lets make the handler
Trying to keep simple the router file, instead of writing there the handlers
Lets add them apart, and then just call them, so inside src folder, inside handlers folder
Lets start creating product.ts file
(there we will add the handlers of product routers)

First, I write wrong in schema.prisma, the user info must be
model User {
  id        String    @id @default(uuid())
  createdAt DateTime  @default(now())
  username  String    @unique
  password  String
  products   Product[]
}
But the problem now is that I made a user that has now Product in its fields, so 
restart the server, and send a request with a "new" user info*/
{
  "username":"scott",
  "password":"admin"
}
/*send the post method with localhost:3001/user
To save the new user, and take the token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQwMGJiYTNkLWRlYWYtNGY0Ni1iY2I2LTkzNTE4NTg3YjI0OCIsInVzZXJuYW1lIjoic2NvdHQiLCJpYXQiOjE3MDI2Nzg2NzF9.SHyKBoD6V0M1z1X1ASdjMaXCQHK28XZD3pbseIMe050*/

/*now we work on product.ts*/
import prisma from "../db"

//Get all
export const getProducts = async (req,res)=>{
    const user = await prisma.user.findUnique({
        where:{
            id: req.user.id
        },
        include:{
            products: true
        }
    })
    res.json({data: user.products})
}

//get One
export const getOneProduct =async (req,res) => {
    const id = req.params.id

    const product = await prisma.product.findUnique({
        where:{
            id,
            belongsToId: req.user.id
        }
    })
    res.json({data:product})
}
/*Right now, It looks like there is an error, on products, even after I set it on
The schema.prisma, changing from Product to products
Just pay attention on that and COME BACK HERE if there is a problem*/

//Create and update product

/*in product.ts */
import prisma from "../db"

//Get all
export const getProducts = async (req,res)=>{
    const user = await prisma.user.findUnique({
        where:{
            id: req.user.id
        },
        include:{
            products: true
        }
    })
    res.json({data: user.products})
}

//get One
export const getOneProduct =async (req,res) => {
    const id = req.params.id

    const product = await prisma.product.findUnique({
        where:{
            id,
            belongsToId: req.user.id
        }
    })
    res.json({data:product})
}

export const createProduct =async(req,res)=>{
    const product = await prisma.product.create({
        data:{
            name:req.body.name,
            belongsToId: req.user.id
        }
    })
    res.json({data:product})
}

export const updateProduct =async (req,res) => {
    const updated = await prisma.product.update({
        where:{
            id: req.params.id,
            belongsToId: req.user.id
        },
        data:{
            name:req.body.name
        }
    })
    res.json({data:updated})
}

export const deleteProduct =async (req,res) => {
    const deleted = await prisma.product.delete({
        where:{
            id: req.params.id,
            belongsToId: req.user.id
        }
    })
    res.json({data:deleted})
}
/*Now that I have the handlers for product, lets add index in the product model in schema.prisma
model Product {
  id          String   @id @default(uuid())
  createdAt   DateTime @default(now())
  name        String   @db.VarChar(255) //Limit of characters
  belongsToId String
  belongsTo   User     @relation(fields: [belongsToId], references: [id])
  updates     Update[]
  @@unique([id, belongsToID])
}

And now, given that I made changes in the model, I must tell the DB about that
So in the terminal:    npx prisma migrate dev
It didn't work in first instance, so double check in schema.prisma which is...
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String    @id @default(uuid())
  createdAt DateTime  @default(now())
  username  String    @unique
  password  String
  products   Product[]
}

model Product {
  id        String   @id @default(uuid())
  createdAt DateTime @default(now())

  name        String   @db.VarChar(255)
  belongsToId String
  belongsTo   User     @relation(fields: [belongsToId], references: [id])
  updates     Update[]
  @@unique([id, belongsToId])
}

//enum is like a bunch of constants
enum UPDATE_STATUS {
  IN_PROGRESS
  SHIPPED
  DEPRECATED
}

model Update {
  id        String        @id @default(uuid())
  createdAt DateTime      @default(now())
  updatedAt DateTime
  title     String
  body      String
  status    UPDATE_STATUS @default(IN_PROGRESS)
  version   String?
  asset     String?

  productId   String
  product     Product       @relation(fields: [productId], references: [id])
  updatePoints UpdatePoint[]
}

model UpdatePoint {
  id          String   @id @default(uuid())
  createdAt   DateTime @default(now())
  updatedAt   DateTime
  name        String   @db.VarChar(255)
  description String

  updateId String
  update   Update @relation(fields: [updateId], references: [id])
}

It asks me if I am sure, so yes, and then asks for name, just hit enter
And now its updated, and I can see in product.ts, that now is reading correctly the field
That I wrote wrong products
And also in product.ts*/
import prisma from "../db"

//Get all
export const getProducts = async (req,res)=>{
    const user = await prisma.user.findUnique({
        where:{
            id: req.user.id
        },
        include:{
            products: true
        }
    })
    res.json({data: user.products})
}

//get One
export const getOneProduct =async (req,res) => {
    const id = req.params.id

    const product = await prisma.product.findUnique({
        where:{
            id,
            belongsToId: req.user.id
        }
    })
    res.json({data:product})
}

export const createProduct =async(req,res)=>{
    const product = await prisma.product.create({
        data:{
            name:req.body.name,
            belongsToId: req.user.id
        }
    })
    res.json({data:product})
}

export const updateProduct =async (req,res) => {
    const updated = await prisma.product.update({
        where:{
            id_belongsToId:{
                id: req.params.id,
                belongsToId: req.user.id
            }
        },
        data:{
            name:req.body.name
        }
    })
    res.json({data:updated})
}

export const deleteProduct =async (req,res) => {
    const deleted = await prisma.product.delete({
        where:{
            id_belongsToId:{
                id: req.params.id,
                belongsToId: req.user.id
            }
        }
    })
    res.json({data:deleted})
}

//Applying Product Route Handler

/*Now we have al the handlers for product, inside product.ts
So now we must use them in the router.ts file
In those, I don't need the callback function, but I use the handler
In the handler we are recieving the req, and res
Lets chec¿k firs in the get products router*/
//Product routers
router.get('/product',getProducts)
router.get('/product/:id',()=>{})
router.put('/product/:id',
    body('name').isString(),
    handleInputErrors,
    (req,res)=>{
    
})
router.post('/product',
    body('name').isString(),
    handleInputErrors,
    ()=>{

})
router.delete('/product/:id',()=>{})
/**Now that we have the handler for get products, lets test it
sending a GET request to http://localhost:3001/api/product
And in auth-> bearer, must be the string with the JWT (token)
Send the request and I recieve    200     {"data": []}
Because there is no single product that belongs to that given user
And we havn't write anything to deal with this scenario

To see what is in the DB, in terminal run     npx prisma studio
Now lets keep adding some handlers in router.ts in product part
Just remember that the authentification is in server.ts, indicating that every route
That starts with /api*/
router.post('/product',
    body('name').isString(),
    handleInputErrors,
    createProduct)
/*So create the handler for creating a product, and then lets test it
It is a POST request to http://localhost:3001/api/product
First... if send the request with NO body I will recieve
{
  "errors": [
    {
      "type": "field",
      "msg": "Invalid value",
      "path": "name",
      "location": "body"
    }
  ]
}
In a 400 status code, because we didn't give the info necessary in the request so lets add it
So in Body -> JSON add
{
  "name": "Note stuff app"
}
And re send the request
And in my case it is hanging, the request didn't get a response... so lets see where

The problem was that I didn't save adding the handler in the router, so when next()
was called, there was nothing else to do... so it holds
Now with the request right, send it and succesfully recieve a 200 and
{
  "data": {
    "id": "8e572b2f-0830-4040-a451-e89d7f9830bb",
    "createdAt": "2023-12-16T01:49:12.736Z",
    "name": "Note stuff app",
    "belongsToId": "400bba3d-deaf-4f46-bcb6-93518587b248"
  }
}
I can verify that the product was created in the DB refreshing the page from DB
If I close it, in terminal  npx prisma studio
And I will see that inside one of the users, is one object now
And in the Product Table, now is 1 item*/

//UPDATE HANDLER EXERCISE & SOLUTION

/*Now lets complete the handlers of product*/
router.get('/product/:id',getOneProduct)
/*And test it with a new request of GET, in 
http://localhost:3001/api/product/8e572b2f-0830-4040-a451-e89d7f9830bb
I get the ID in the page of the DB copy an past the product ID
And also add the token of that second user
Restart the server and send the request (the body is empty)
Recieve a 200 status code and
{
  "data": {
    "id": "8e572b2f-0830-4040-a451-e89d7f9830bb",
    "createdAt": "2023-12-16T01:49:12.736Z",
    "name": "Note stuff app",
    "belongsToId": "400bba3d-deaf-4f46-bcb6-93518587b248"
  }
}
All the info of the product
If I change the ID in just one value, the response will come with
{
  "data":null
}

Now lets add the delete handler in router of product*/
router.delete('/product/:id',deleteProduct)
/*And then test it using the past request, but with DELETE request
Don't forget to restart the server
Send it and recieve the exact same as above, 200 and
{
  "data": {
    "id": "8e572b2f-0830-4040-a451-e89d7f9830bb",
    "createdAt": "2023-12-16T01:49:12.736Z",
    "name": "Note stuff app",
    "belongsToId": "400bba3d-deaf-4f46-bcb6-93518587b248"
  }
}
But if I check the DB, I can see that the product was deleted from DB
IF I tru¿y to re delete the element the server will crash, because we havn't handle
that error. So to confirm via server that the element was deleted,
Just change it again to GET request, and will recieve
{
  "data": null
}
Now lets complete with the update router, and now all product handlers are complete*/
//Product routers
router.get('/product',getProducts)
router.get('/product/:id',getOneProduct)
router.put('/product/:id',
    body('name').isString(),
    handleInputErrors,
    updateProduct)
router.post('/product',
    body('name').isString(),
    handleInputErrors,
    createProduct)
router.delete('/product/:id',deleteProduct)
/*We will not test by now the put method, because for that...
First lets pass to the update objects

So inside src/handlers, create a new file name update.ts*/
import prisma from "../db"

//Get all
export const getUpdates = async (req,res)=>{
    const products = await prisma.product.findMany({
        where:{
            belongsToId: req.user.id
        },
        include:{
            updates: true
        }
    })
    const updates = products.reduce((allUpdates,product)=>{
        return [...allUpdates, ...product.updates]
    },[])
    res.json({data: updates})
}

//get One
export const getOneUpdate =async (req,res) => {
    const update = await prisma.product.findFirst({
        where:{
            id:req.params.id,
        }
    })
    res.json({data:update})
}
export const createUpdate = async (req, res) => {}
export const updateUpdate =async (req,res) => {}
export const deleteUpdate =async (req,res) => {}

/*Start with getOneUpdate and getUpdates*/

//CREATE AND DELETE HANDLERS SOLUTION

/*In router.ts file, first update the require things for that request*/
router.post('/update',
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    ()=>{})

/*Now in update.ts lets add the handler of creating an update*/
export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
      where:{
          id: req.body.id
      }
  })
  if (!product){
      res.json({message:"NOPE"})
  }
  const update = await prisma.update.create({
      data:req.body
  })
  res.json({data:update})
}

/*Now back in router.ts, first make optional the router for put an update*/
router.put('/update/:id',
    body('title').optional(),
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS','SHIPPED','DEPRECATED']).optional(),
    body('version').optional(),
    ()=>{})

/*Now in update.ts file, we add the handler code for updateUpdate*/
export const updateUpdate =async (req,res) => {
  const products = await prisma.product.findMany({
      where:{
          belongsToId:req.user.id
      },
      include:{
          updates:true
      }
  })
  const updates = products.reduce((allUpdates,product)=>{
      return [...allUpdates, ...product.updates]
  },[])
  const match = updates.find(update=>update.id===req.params.id)
  if(!match){
      return res.json({message:"NOPE"})
  }
  const updatedUpdate = await prisma.update.update({
      where:{
          id:req.params.id
      },
      data:req.body
  })
  res.json({data:updatedUpdate})
}

/*Finally the handler for delete update*/
export const deleteUpdate =async (req,res) => {
  const products = await prisma.product.findMany({
      where:{
          belongsToId:req.user.id
      },
      include:{
          updates:true
      }
  })
  const updates = products.reduce((allUpdates,product)=>{
      return [...allUpdates, ...product.updates]
  },[])
  const match = updates.find(update=>update.id===req.params.id)
  if(!match){
      return res.json({message:"NOPE"})
  }

  const deleted = await prisma.update.delete({
      where:{
          id:req.params.id
      }
  })
  res.json({data:deleted})
}

/*Finally just add the handlers to the routes, so in router.ts*/
//Update routers
router.get('/update',getUpdates)
router.get('/update/:id',getOneUpdate)
router.put('/update/:id',
    body('title').optional(),
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS','SHIPPED','DEPRECATED']).optional(),
    body('version').optional(),
    updateUpdate)
router.post('/update',
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    createUpdate)
router.delete('/update/:id',deleteUpdate)

//Debbuging routes

/*Restart the server, and lets test the code that we have so far
So first open thunder client, in the request of get product by id
Change the method to post, delete the ID from URL and then in the body JSON
{
  "name":"My car app"
}
And send the request. I recieve a 200 and the info of the created product
{
  "data": {
    "id": "3c5e5369-bc09-41cb-822d-c88c6a865ac6",
    "createdAt": "2023-12-18T17:30:29.676Z",
    "name": "My car app",
    "belongsToId": "400bba3d-deaf-4f46-bcb6-93518587b248"
  }
}
Of that info, copy the product id. Open the request that have with PUT
And change it to POST, with the URL http://localhost:3001/api/update
Check that the authorization has the same token of the created product
And inside the Body JSON
{
  "title":"New feature who dis",
  "body":"This is the best feature yet",
  "productId":"3c5e5369-bc09-41cb-822d-c88c6a865ac6"
}
The id is the one of the product, the one we just copy
That throws an error, so to fix it, go to update.ts, and in createUpdate handler*/
//Create update
export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
      where:{
          id: req.body.productId//Change id for productId
      }
  })
  if (!product){
      res.json({message:"NOPE"})
  }
  const update = await prisma.update.create({
      data:req.body
  })
  res.json({data:update})
}
/*Then open thunder client, post update request, and still failling
So again in the handler in update.ts in create product*/
//Create update
export const createUpdate = async (req, res) => {
  const {productId,...rest} = req.body
  const product = await prisma.product.findUnique({
      where:{
          id: productId
      }
  })
  if (!product){
      res.json({message:"NOPE"})
  }
  const update = await prisma.update.create({
      data:rest
  })
  res.json({data:update})
}

/*The open the schema.prisma and modify the Update model 
model Update {
  id        String        @id @default(uuid())
  createdAt DateTime      @default(now())
  updatedAt DateTime      @updatedAt //Add this part
  title     String
  body      String
  status    UPDATE_STATUS @default(IN_PROGRESS)
  version   String?
  asset     String?

  productId   String
  product     Product       @relation(fields: [productId], references: [id])
  updatePoints UpdatePoint[]
}

And given that we change the schema we have to run a migration for the DB
So shut down the server and then in terminal:     npx prisma migrate dev
And wait to recieve the Generated Prisma Client message
And to have right the handler in update.ts*/
//Create update
export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
      where:{
          id: req.body.productId
      }
  })
  if (!product){
      res.json({message:"NOPE"})
  }
  const update = await prisma.update.create({
      data: {
          title:req.body.title,
          body:req.body.body,
          product:{
              connect:product
          }
      }
  })
  res.json({data:update})
}
/*Restart the server, send the request to createUpdate, but still failling*/
//Create update
export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
      where:{
          id: req.body.productId
      }
  })
  if (!product){
      res.json({message:"NOPE"})
  }
  const update = await prisma.update.create({
      data: {
          title:req.body.title,
          body:req.body.body,
          product:{connect: {id: product.id}}
      }
  })
  res.json({data:update})
}

/*Restart the server and send the request to create an update and finally recieve a 200 and
{
  "data": {
    "id": "d77c94a9-b87e-42c5-9868-66dea50261a8",
    "createdAt": "2023-12-18T18:00:47.533Z",
    "updatedAt": "2023-12-18T18:00:47.533Z",
    "title": "New feature who dis",
    "body": "This is the best feature yet",
    "status": "IN_PROGRESS",
    "version": null,
    "asset": null,
    "productId": "3c5e5369-bc09-41cb-822d-c88c6a865ac6"
  }
}

Now of that, the first lin in the data, is the update ID
so lets try to get it, copy that make a GET request in http://localhost:3001/api/update
With empty body, but eith the token of user in auth, send the request and recieve a 200 and
{
  "data": [
    {
      "id": "d77c94a9-b87e-42c5-9868-66dea50261a8",
      "createdAt": "2023-12-18T18:00:47.533Z",
      "updatedAt": "2023-12-18T18:00:47.533Z",
      "title": "New feature who dis",
      "body": "This is the best feature yet",
      "status": "IN_PROGRESS",
      "version": null,
      "asset": null,
      "productId": "3c5e5369-bc09-41cb-822d-c88c6a865ac6"
    }
  ]
}
The update data
That url is getting ALL the updates, because of the URL, we never add the update ID
So add it in the url
I was reciving null in a 200 status code, and check for the problem, 
which was in the getOneUpdate handler So modify it to*/
//get One
export const getOneUpdate = async (req,res) => {
  const update = await prisma.update.findUnique({
      where:{
          id:req.params.id,
      }
  })
  res.json({data:update})
}
/*with that restart the server and send the request, and recieve a 200 and
{
  "data": {
    "id": "d77c94a9-b87e-42c5-9868-66dea50261a8",
    "createdAt": "2023-12-18T18:00:47.533Z",
    "updatedAt": "2023-12-18T18:00:47.533Z",
    "title": "New feature who dis",
    "body": "This is the best feature yet",
    "status": "IN_PROGRESS",
    "version": null,
    "asset": null,
    "productId": "3c5e5369-bc09-41cb-822d-c88c6a865ac6"
  }
}
And succesfully recieve the update now

So now get all and get One update, and create update has being tested, so now update update
Which will be with PUT request, with the same URL
http://localhost:3001/api/update/d77c94a9-b87e-42c5-9868-66dea50261a8
And inside the body
{
  "title":"New TITLE"
}
Send the request, and recieve the200 and
{
  "data": {
    "id": "d77c94a9-b87e-42c5-9868-66dea50261a8",
    "createdAt": "2023-12-18T18:00:47.533Z",
    "updatedAt": "2023-12-18T18:20:26.501Z",
    "title": "New TITLE",
    "body": "This is the best feature yet",
    "status": "IN_PROGRESS",
    "version": null,
    "asset": null,
    "productId": "3c5e5369-bc09-41cb-822d-c88c6a865ac6"
  }
}
The data of the update with the new given title

Finally test the delete update, so delete the body of the request, make it a DELETE
and send the request, recieve the 200 and
{
  "data": {
    "id": "d77c94a9-b87e-42c5-9868-66dea50261a8",
    "createdAt": "2023-12-18T18:00:47.533Z",
    "updatedAt": "2023-12-18T18:20:26.501Z",
    "title": "New TITLE",
    "body": "This is the best feature yet",
    "status": "IN_PROGRESS",
    "version": null,
    "asset": null,
    "productId": "3c5e5369-bc09-41cb-822d-c88c6a865ac6"
  }
}
Which is the info of the deleted update
I can verify that it was deleted, trying to get the update again, and will recieve null*/

//Creating Error Handlers

/*In difference with normal JS, where if you throw an error, it will stop executing the rest of code
express can handle the errors, so the server doesn't break
When an error is thrown by the server, will be a 500 status code, and we will
recieve an HTML with info of the error

So inside of server.ts  
Make the app throw an error on a get request
app.get('/',(req,res)=>{
    // console.log('Hello from express')
    // res.status(200)
    // res.send({message:'hello'})
    throw new Error('Hello')
})
app.use('/api',protect,router)

app.post('/user',createNewUser)
app.post('/signin',signin)

app.use((err,req,res,next)=>{
    console.log(err)
    res.json({message:'OOPS there was an error'})
})

export default app
Restart the server and then send a GET request to http://localhost:3001/
And I recieve a 200 and 
{
  "message": "OOPS there was an error"
}

So inside of that part in server, I can deal with this synchronous errors but...
In asynchronous Errors...*/

//ASYNC error handlers

/*Now in server, make an ASYNC error*/
app.get('/',(req,res)=>{
  // console.log('Hello from express')
  // res.status(200)
  // res.send({message:'hello'})
  setTimeout(()=>{
      throw new Error('hello')
  },10)
})
/*And when make a Request, I don't recieve the error handler, the site can't be reached
And even the server does crash
So to handle it, we must add a next param 
Handlers don't use next, except for the case where they must pass an error*/
app.get('/',(req,res,next)=>{
  // console.log('Hello from express')
  // res.status(200)
  // res.send({message:'hello'})
  setTimeout(()=>{
      next(new Error('hello'))
  },10)
})

/*So now that we know how the errors can be controlled in express, lets improve our app
For that in server.ts*/
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

/*And then we must add this error handers in users.ts first*/
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

/*To test it, lets try to create an user, 2 times (restart server)
So POST with http://localhost:3001/user and body
{
  "username":"rick",
  "password":"cheese"
}
Recieve a 200, and a token
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdjNTZiNWE2LWMyODAtNDY3OS1hYjNmLTQ0OGZjMzgxOTk5NCIsInVzZXJuYW1lIjoicmljayIsImlhdCI6MTcwMjkyNzU1OH0.RXzURr8s50Kqt8QXnKp0YIiS6NeF3paK55t4VRPQ2YU"
}

Then send again the same request, and recieve a 400 and
{
  "message": "invalid input"
}

Now lets implement one error handler inside product.ts  in createProduct handler*/
export const createProduct = async (req, res,next) => {
  try {
      const product = await prisma.product.create({
      data: {
          name: req.body.name,
          belongsToId: req.user.id
      }
      })
  
      res.json({data: product})
  } catch (e){//by default errors, are 500, so I don't need to redefine status code
      next(e)
  }
}//we do not change the type of error, so it will fall in the Our fault error case

/*Now to test it, lets try to create a product POST request to
http://localhost:3001/api/product
In the body
{
  "name": "Blablanfdlnfbla"
}

I will recieve a 200 and the product info
{
  "data": {
    "id": "6b9993d5-6eb6-4d5b-85a9-4a3ef9a5e183",
    "createdAt": "2023-12-18T19:38:44.663Z",
    "name": "Blablanfdlnfbla",
    "belongsToId": "400bba3d-deaf-4f46-bcb6-93518587b248"
  }
}
And In the request was also included the token
Now to make it fail, lets exed the charracter limit of 255, and resend the same request
In presenter case, the server collapse, and for me it never completes the request
So lets add an additional error handler in router.ts add*/
router.use((err,req,res,next)=>{
  console.log(err)
  res.json({message:'in router handler'})
})
/*Re send the request to create a product with more than 255 characters
and now recieve a 200 status code and
{
  "message": "in router handler"
}
The error message*/

//Handling errors with process.on

/*Now we handle the errors that occur inside express, but there might be some errors inside node
But outside express, so for those, that would be*/
setTimeout(()=>{
  throw new Error('OOPPs')
},500)

process.on('uncaughtException',()=>{

})
process.on('unhandledRejection',()=>{

})

//END of subsection

// SUBSECTION CONFIG, PERFORMANCE AND TESTING

//Environmental variables

/*The most common is NODE_ENV
In which we have 3 main "modes" to run an app
development (default), production, testinig

We already set environment to our app in the file .env
And we acces those variables with process.env.VARIABLENAME*/

//Creating environment Configurations

/*Lets create a "global config"
So inside of src foler, create a config folder,
and inside config a index.ts , local.ts , prod.ts and testing.ts

Now we will install a new library from terminal npm i lodash.merge --save
Then in config/index.ts*/
import merge from "lodash.merge"

process.env.NODE_ENV = process.env.NODE_ENV || "development";//set a default for NODE_ENV
const stage = process.env.STAGE || 'local'

let envConfig

if (stage==='production'){
    envConfig = require('./prod').default
} else if ( stage === 'testing'){
    envConfig = require('./testing').default
} else {
    envConfig = require('./local').default
}

export default merge({
    stage,
    env:process.env.NODE_ENV,
    port:3001,
    secrets:{
        jwt:process.env.JWT_SECRET,
        dbUrl: process.env.DATABASE_URL
    }
},envConfig)

/*Now in the case of production environment, there will not be used the
port 3001.So we must set the port so in prod.ts*/
export default {
  port: process.env.PORT
}
/*And the port:3001, will be overwrite to be process.env.PORT value
For this exercise that we will keep on local, for testing keep in prod.ts*/
export default {
  //    port: process.env.PORT
  port: 5000
  }

//Now lets "do the same" for local,ts
export default {
  port: 3001
}

/*Now in index.ts lets import the config (the index inside of src(index.ts))*/
import dotenv from 'dotenv'
dotenv.config()//this looks in the .env file, gets the variables and load them in the app environment
import config from './config'
import app from './server'

app.listen(config.port,()=>{
    console.log(`Hello on http://localhost:${config.port}`)
})

/*Remember that the default is developer env
So now lets restart the server
So it will appear in Hello on http://localhost:3001

And if I want to run it in production environment
instead of npm run dev 
use:    STAGE=production npm run dev

It keeps throwing me errors, that didn't detect STAGE=production
SOLUTION              SOLUTION
I open bash terminal, and set the directory of the app in
D:\IntekGlobal\Node\API dessign in nodejs
And there run the exact same line
STAGE=production npm run dev
And I correctly create a server on production environment, I have now the server
in port 5000
So, MUST use the BASH terminal in this case
 STAGE=production npm run dev

> api-dessign-in-nodejs@1.0.0 dev
> ts-node src/index.ts

Hello on http://localhost:5000
*/

//Performance managment with ASYNC

/*sync code, is blocking code because, each line runs after the past one is
done doing whatever it says
so it is "blocking" the execution of the further code

With async and the use of promises, you can implement non blocking code
Because it goes to callback queue and the original thread keeps runing*/

//Unit testing overview

/*Now we will start runing some tests, so for that first lets
install some libraries that we'll be using
npm i supertest @types/supertest jest @types/jest ts-jest

Then we have to config the testing so
npx ts-jest config:init

That creates a file in root of app named jest.config.js

Unit test, instead of testing like all the code, it goes by parts, by function, testing
the result of each "part". Testing individual things in isolation*/

// not testable
const value = 100;
const action = () => {
  console.log(value);
};
/*I didn't export the function, and if I did... the value will be undefined, 
because the scope of const value will stay in the file. So the testeble version of that is*/
// testable
export const action = (value) => {
  console.log(value);
};

//UNIT TESTING WITH JEST

/*Inside of src/handlers create a folder named __tests__
And inside that folder user.test.ts file*/
describe('user handler',()=>{
  it('should do something when something happends',()=>{
      expect(1).toBe(1)
  })
})
/*Now lets run the test, for that, we must add the runing test in the app
So open package.json file and add the test script with jest
  "scripts": {
    "test": "jest",
    "dev": "ts-node src/index.ts"
  },
And now to run al the test inside the app, in terminal npm test
And I will recieve from 1 file, passed 1 test and tells which test passes

Now if I change the toBe(2) to other number that is not 1, the test
will fail, and will tell me that it was expecting 1, but recieve 2

"test" and "start" in the package.json in scripts, are the only 2
ways that you can run code without wring run on it
like... 
npm test
npm run dev
npm start*/

//INTEGRATION TESTING WITH SUPERTEST

/*In src folder, create a folder named __test__ and inside of it routes.test.ts file with...*/
import app from '../server'
import supertest from 'supertest'

describe('GET /',()=>{
    it('Should send back some data',async ()=>{
        const res = await supertest(app)//This will "activate" the app
            .get("/")//Make a get request to root:  http://localhost:3001/

        expect(res.body.message).toBe('hello')
    })
})
/*But we had in the GET in root, a throw error, so
Go back to server.ts to sen the hello back*/
app.get('/',(req,res,next)=>{
  res.json({message:"hello"})
})
/*Now, to have 2 passed test, make the first test in user.test.ts to expect and be 1

Now in terminal npm test, and I will recieve

> api-dessign-in-nodejs@1.0.0 test
> jest

 PASS  src/handlers/__tests__/user.test.ts
 PASS  src/__test__/routes.test.ts

Test Suites: 2 passed, 2 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        4.915 s
Ran all test suites.
GET / 200 2.086 ms - 19*/

//TESTING THE CREATE USER ROUTE

/*Right now our test in user.test.ts is not really usefoll so in that file lets make a new test*/
import * as user from '../user'

describe('user handler',()=>{
    it('should create a new user',async()=>{
        const req = {body:{username:"hello",passwprd:"hi"}}//Mocking the content of a request
        const res = {json({token}){
            expect(token).toBeTruthy()
        }}
        
        await user.createNewUser(req,res,()=>{})
    })
})
/*in termina npm test, and I will recieve 2 passed tests

If I try to rerun the test, it will fail, because already exist that user
so you have to pay attention on that, and reset, delete the db once you are
done testing, it is also recomended to have a DB for tests*/

//END OF SUBSECTION

//SUBSECTION  DEPLOYMENT

//DEPLOYMENT SETUP

/*In package.json add some scripts to make it deployable
  "scripts": {
    "test": "jest",
    "dev": "ts-node src/index.ts",
    "build": "tsc -p tsconfig.json",
    "start": "node dist/index.js"
  },*/

/*build transform from typescript to JS and start is to "setup" the server
And inside of tsconfig.json*/
// {
//   "compilerOptions": {
//     "sourceMap": true,
//     "outDir": "./dist",
//     "rootDir": "./src",
//     "strict": false,
//     "lib": ["esnext"],
//     "esModuleInterop": true,
//     "declaration": true
//   },
//   "include": ["src/**/*.ts"]
// }

/*Now, to test that the configuration is right, in terminal
npm run build

It doesn't seems to done a lot, but it doesn't give any error
Which is a great sign, and we can check inside of the root folder, 
if a dist folder was created with a lot of JS files*/

//Deploying on render

/*We don't want all of that dist folder in github
So open .gitignore and 
node_modules
# Keep environment variables out of version control
.env
dist

To verify that the JS version works, npm start
And that should start my server
Now in prod.ts, ser ir again from the environment*/
export default {
  port: process.env.PORT
}

/*Now, first we need to push all of this to github
In github.com create a new repo named API-design-v4
Now in this part, llok for subsection push existing repository...
I typed git init, then the lines of the page, first
git remote add origin https://github.com/Eduardo-Davila-InGl/API-design-v4.git
*/