const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

//Initializations
const app = express();

//Configurations
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname , 'views'));


//motor de vistas
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir:  path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

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



