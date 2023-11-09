import express from 'express';
import {PORT, mongoDBURL} from './config.js';
import mongoose from 'mongoose'
import {Book } from "./models/bookmodels.js"
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';

const app = express();

//Middlewear for parsing request body
app.use(express.json());

//Middlewear for handling CORS policy
//Option 1: Allow All Origins  with default of cors(*)
app.use(cors())

//Options 2:  Allow custom Origins
app.use(
    cors({
            origin:'',//https://localhost:3000
            methods:[],//['GET','POST','PUT','DELETE']
            allowedHeaders:['Content-type'],
        })
)

app.get('/',(request, response)=>{
    console.log(request)
    return response.status(234).send('welcome to MERN Stack tutorial');
})

app.use('/books',booksRoute);


mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("App connected to database");
    app.listen(PORT ,() =>{
        console.log(`App is listening to port:${PORT}`)
    });
}).catch((error)=>{
    console.log(error);
})