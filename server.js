const db = require('./db/connection');
const express = require('express');
//Import the inquirer file
const startInquirer = require('./lib/database');
const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Default response for any other request (Not found)
app.use((req, res)=>{
    res.status(404).end();
});

//Start server after DB connection
db.connect(err =>{
    if(err) throw err;
    console.log(`Database connected`);
    app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`);
        //call for the function inquirer to start printing the prompts
        startInquirer();
    })
});

