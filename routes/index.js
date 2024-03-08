// route class for todo application

const express = require('express');
const router = express.Router();
const homeController = require('../controller/homecontroller');
router.get('/',homeController.home)

// controller for creating todo list
router.post('/create_todo',homeController.createTodo)

// controller for deleting the todo list
router.post('/delete_todo',homeController.deleteTodo) 

// controller for getting Edit page
router.get('/editdata',homeController.EditPage)

// conteoller for Edting todo list
router.post('/edit-todolist',homeController.editDetails)

console.log('router is loaded')
module.exports = router;