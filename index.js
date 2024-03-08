const express = require('express');
const app = express();
port = 6000;
const expressLayout = require('express-ejs-layouts');
app.use(expressLayout)
const db = require('./config/mongoose')
//const TodoLists = require('./models/todo_list')
// it is use to handle middle ware here we are using express.urlenceode to use the parser
app.use(express.urlencoded()) 
app.use('/',require('./routes'))
// for getting static
app.use(express.static('./assets'))
app.set('layout extractStyles',true);
app.set('layout extractScripts',true)
app.set('view engine','ejs');
app.set('views','./views')
app.listen(port,function(err){
    if(err){
        console.log(`error in running the ${port}`)
        return;
    }
    console.log(`Server is running @ ${port}`)
})
