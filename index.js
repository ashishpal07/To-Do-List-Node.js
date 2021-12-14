// get libraries
const path = require('path');
const express = require('express');
const port = 8000;

// db 1 see wether its connected or not
const db = require('./config/mongoose');

// database which we use for fetching
const Todos = require('./models/todo');

// create app
const app = express();


// set view engine
app.set('view engine', 'ejs');

// set view path
app.set('views', path.join(__dirname, 'views'));

// to get form data in json form
app.use(express.urlencoded());

// to sccess static files
app.use(express.static('assets')); 



// controller for home
app.get('/', function(req, res){
    // console.log(__dirname);
    // return res.end('<h1>Home heading</h1>');
    // res.render('home', {
    //     title: "Home"
    // });

    Todos.find({}, function(err, Todo){
        // console.log("todos = ", Todos);
        if(err){
            console.log("error white fetching todo");
            return;
        }
        return res.render('home', {
            title: "Home",
            todoList: Todo,
        });
    });

});


// app to post data and add todo
app.post('/create-todo', function(req, res){
    // console.log(req.body);
    Todos.create(req.body, function(err, todo){
        if(err){
            console.log("Error while creating todo");
            return;
        }
        console.log("*********", todo);
        res.redirect('/');
    });
});


// delete todo controller
app.get('/delete-todo/', function(req, res){

    let id = req.query.id;  // get id from url
    console.log("id = ", id);

    // find and delete todo using id
    Todos.findByIdAndDelete(id, function(err){
        if(err){
            console.log("Error while deleting todo");
            return;
        }
        return res.redirect('/');
    });

});


// delete all todos
app.get('/delete-all', function(req, res){
    Todos.remove({}, function(err){
        if(err){
            console.log("Error while deleting all data from DB!");
            return;
        }
    });
    console.log("hi");
    return res.redirect('/');
});



// check if express server is set or not
app.listen(port, function(err){
    if(err){
        console.log(`Server is not running : ${err}`);
        return;
    }
    console.log(`Server is running on port : ${port}`);
});