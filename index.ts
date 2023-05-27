import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import  cookieParser  from 'cookie-parser';
import router from './src/router/index.routes';
import sessions from 'express-session';

class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.config();
    this.mongoSetup();
    this.routes();
  }
  private routes(): void {
    
    this.app.use('/', router);
  }
  
  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cookieParser())
    this.app.use(cors());
    

//session middleware

    dotenv.config()
    this.app.use(sessions({
    resave: false,
      cookie: { maxAge: 1000 * 60 * 60 * 24 },
    saveUninitialized: true,
    secret: process.env['JWT_SECRET'] as string,
    
    }));
    this.app.all('/*', async function(req:Request, res:Response, next:NextFunction){
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
      res.header("Access-Control-Allow-Methods", "POST, GET,PUT,DELETE,PATCH");
      

      next();
    });
    
  }
  private start():void{
    this.app.listen(process.env.PORT,()=>{
      
    console.log(`server started! ${process.env.PORT}`);
    
    })
  }

  

  private async mongoSetup() {
    mongoose.pluralize(function(name) {
      
      return name;
  });
    mongoose.set("strictQuery", false);
  
    const connection = await mongoose.connect(`${process.env.DB_SERVER}`,()=>{
      console.log('Database connection created!');
        this.start()
    });
    console.log(connection, 'connection')
  }
}

export default new App().app;
