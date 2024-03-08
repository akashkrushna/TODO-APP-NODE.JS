const TodoLists = require('../models/todo_list');

// Function for redirecting to main home page
module.exports.home = async function(req, res) {
    try {
        const todo = await TodoLists.find({});
        return res.render('homePage', {
            title: "Home",
            todoList: todo
        });
    } catch (err) {
        console.log('Error in fetching data:', err);
        return res.status(500).send('Internal Server Error');
    }
}

// Function for creating todo list
module.exports.createTodo = async function(req, res) {
    try {
        const dueDate = req.body.dateValue.split('-');
        const newdate = DateValue(dueDate);

        await TodoLists.create({
            desc: req.body.desc,
            category: req.body.category,
            dueDate: newdate
        });
        
        return res.redirect('/');
    } catch (err) {
        console.log('Oops, error occurred:', err);
        return res.status(500).send('Internal Server Error');
    }
}

// Function for deleting todo list
module.exports.deleteTodo = async function(req, res) {
    try {
        const ids = req.query.id.split(',');
        await TodoLists.deleteMany({ _id: { $in: ids } });
        return res.redirect('/');
    } catch (err) {
        console.log('Error while deleting:', err);
        return res.status(500).send('Internal Server Error');
    }
}

// Function for fetching data for edit page
module.exports.EditPage = async function(req, res) {
    try {
        const todoLists = await TodoLists.findById(req.query.id);
        return res.render('editPage', {
            title: 'Edit Page',
            todolist: todoLists
        });
    } catch (err) {
        console.log('Error while fetching data:', err);
        return res.status(500).send('Internal Server Error');
    }
}

// Function for updating todo data after editing
module.exports.editDetails = async function(req, res) {
    try {
        const dueDate = req.body.dueDate.split('-');
        const newdate = DateValue(dueDate);
        
        await TodoLists.updateOne({ _id: req.query.id }, {
            $set: { desc: req.body.desc, category: req.body.category, dueDate: newdate }
        });
        
        return res.redirect('/');
    } catch (err) {
        console.log('Error while updating:', err);
        return res.status(500).send('Internal Server Error');
    }
}

// Function to format date
function DateValue(dueDate) {
    const months = ['jan','feb','mar','Apr','May','june','july','aug','sept','oct','nov','dec'];
    const monthIndex = parseInt(dueDate[1]) - 1;
    const month = months[monthIndex];
    return dueDate[2] + '-' + month + '-' + dueDate[0];
}


