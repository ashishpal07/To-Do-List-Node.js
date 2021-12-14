1. todo list  npm init

2. todo list nmp install express

        todolist/index.js

        const express = require('express');
        const port = 8000;

        const app = express();

        app.get('/', function(req, res){
            return res.end('<h1>Home heading</h1>');
        });


        app.listen(port, function(err){
            if(err){
                console.log(`Server is not running : ${err}`);
                return;
            }
            console.log(`Server is running on port : ${port}`);
        });

3. todolist / views / home.ejs

        install ejs in todo list

        <!-- set view engine in todolist/index.js -->
        app.set('view engine', 'ejs')

        <!-- now set view path for this we need to import path module -->
        todolist/index.js
        const path = require('path')

        app.set('views', path.join(__dirname, 'views'));

4. todolist/views/home.ejs write some HTML or what

5. now render home.ejs from todolist/index.ejs

        app.get('/', function(req, res){
            // console.log(__dirname);
            // return res.end('<h1>Home heading</h1>');
            res.render('home', {
                title: "Home"
            });
        });

6. now write home.ejs file what do you want

7. in todolist/index.js
        app.get(express.urlencoded());   to get form submitted data in jason formate

8. for backend connection install mongoose in todolist

        create 2 folders in todolist 
        1. models/ todo.js
        2. config/ mongoose.js
        
        mongoose.js
        // import library
        const mongoose = require('mongoose');

        // connect from mongodb
        mongoose.connect('mongodb://localhost/todo_list_db');

        // aquire connection if it is succesful
        const db = mongoose.connection;

        // error
        db.on('error', console.error.bind(console, 'error connecting to db'));

        // up and running then print the message
        db.once('open', function(){
            console.log("successfully connected to database!");
        });

        now go to index.js file and import data base file
        const db = require('./config/mongoose.js');
        
        and run nodemon .\index.js and see data base connected or not

        goto models/ todo.js  create schema in that
        const mongoose = require('mongoose');

        const todoSchema = new mongoose.Schema({
            description : {
                type : String,
                require : true,
            },

            category : {
                type : String,
                // require : true,
            },

            date : {
                type : String,
                require : true,
            }
        });


        const Todos = mongoose.model('Todos', todoSchema);

        module.exports = Todos;


        goto index.js
        const Contact = require('./models/contact');
        // to get form data in json form
        app.use(express.urlencoded());