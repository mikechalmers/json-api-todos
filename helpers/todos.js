var db = require('../models');

exports.getTodos = function(req, res){
  db.Todo.find()
  .then(function(todos){
    res.json(todos);
  })
  .catch(function(err){
    res.send(err);
  });
};

exports.createTodo = function(req, res){
  db.Todo.create(req.body)
  .then(function(newTodo){
    // adding status(201) between res and json sends a "something was created" status
    res.status(201).json(newTodo);
  })
  .catch(function(err){
    res.send(err);
  });
};

exports.getTodo = function(req, res){
  db.Todo.findById(req.params.todoId)
  .then(function(foundTodo){
    res.json(foundTodo);
  })
  .catch(function(err){
    res.send(err);
  });
};

exports.updateTodo = function(req, res){
  // needs ID object as is findOne, not FindByID
  // takes three arguments, what to find (filter) and what to change (update)
  // third option is so the res.json shows the updated data, not the old data
  db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
  .then(function(todo){
    // status 202 = accepted
    res.status(202).json(todo);
  })
  .catch(function(err){
    res.send(err);
  });
};

exports.deleteTodo = function(req, res){
  db.Todo.deleteOne({_id: req.params.todoId})
  .then(function(){
    // status 202 = accepted
    res.status(202).json({ message: 'we deleted it, okay?'});
  })
  .catch(function(err){
    res.send(err);
  });
};

module.exports = exports;
