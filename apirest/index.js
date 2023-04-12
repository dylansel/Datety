const express = require('express');
const morgan = require('morgan');

const app = express();

// Configure the port for the application
app.set('port', process.env.PORT || 3000);

// Use morgan to log application requests
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Configure the routes for the application
app.get('/', (req, res) => {
    res.json({ "Title": "Hello Hord" })
})

//app.use('/users', require('./routes/users'));
//app.use('/posts', require('./routes/posts'));

// Start the application server
app.listen(app.get('port'), () => {
    console.log(`Server started on port ${app.get('port')}`);
});

