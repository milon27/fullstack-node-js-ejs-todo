require('dotenv').config();
const express = require('express');
const todoController = require('./controllers/todoController');
const app = express();

/**
 * @description set up view engine (look for all view in /views folder)
*/
app.set('view engine', 'ejs');

/**
 * @description static files middleware
 * @param /public = the end point
 * @param ./public = the directory uri
 * @example app.use('/public', express.static('./public'));
 */
/**
 * @description it recives all the end point not only (/public) and then search that static file into ./public folder
 * @url http://localhost:2727/style.css ---> ./public/style.css
 * @url http://localhost:2727/assets/style.css  ---> ./public/assets/style.css
 */
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//fire controller (./controllers/todoController.js)  
todoController(app);


//create the server
app.listen(process.env.API_PORT, () => console.log(` app listening at http://localhost:${process.env.API_PORT}`));

