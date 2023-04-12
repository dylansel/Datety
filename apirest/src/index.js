const express = require('express');
const morgan = require('morgan');
const crud = require('./CRUDs/crud')

const app = express();

// Configure the port for the application
app.set('port', process.env.PORT || 3000);

// Use morgan to log application requests
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Configure the routes for the application
app.get('/', (req, res) => {
    res.json({ 
        "Title": "datety",
        "description": "La API se encuentra funcionando exitosamente"
    })
})

app.get('/users', async (req, res) => {
    const respuesta = await crud.getAll("event");
    res.json(respuesta.results);
})
//app.use('/users', require('./routes/users'));
//app.use('/posts', require('./routes/posts'));

// Start the application server
app.listen(app.get('port'), () => {
    console.log(`Server started on port ${app.get('port')}`);
});

