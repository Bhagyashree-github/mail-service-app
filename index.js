import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import fs from 'fs';
import router from './router/router.js';

const app = express();

const PORT = 3000 || process.env.PORT

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/signup',router );



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    //database connection goes here.
});