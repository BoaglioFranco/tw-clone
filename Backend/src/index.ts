import express from 'express';
import { createConnection } from 'typeorm';
import authRoutes from './routes/auth';
import dotenv from 'dotenv';
import { User } from './entities/User';
import { CustomNamingStrategy } from './dbNamingStrategy';

dotenv.config()

const main = async () => {

    const conn = await createConnection({
        type: "mysql",
        database: "tweeter",
        username: 'root',
        password: 'root',
        logging: true,
        synchronize: true,
        entities: [User], //db entities
        namingStrategy: new CustomNamingStrategy(),
    })



    const app = express();
    const port = 5000;
    

    app.use(express.json()); //Parses json body types.
    
    app.use((_req, res, next) =>{  //CORS STUFF
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Token"); //added token for API auth
        res.setHeader("Access-Control-Allow-Methods", "DELETE, POST, GET, PUT, OPTIONS");
        next();
    });
    
    app.get('/' ,(req, res, next) =>{
        res.send('Puto el que lee!');
    })
    app.use(authRoutes);
    
    app.listen(port, ()=> {
        console.log(`Server up and running on port ${port}`);
    })

}

main();