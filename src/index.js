const express = require('express');
const morgan = require('morgan');

//Initializations
const app = express();

//Configurations
app.set('port', process.env.PORT || 4000);

//Middlewares - Security
app.use(morgan('dev'));

//Global variables

//Routes
app.use(require('./routes'));
//Public files


//Starting server

app.listen(app.get('port'), ()=> {
    console.log(`Server on port : ${app.get('port')}`);
});



