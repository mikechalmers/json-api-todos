$(document).ready(function(){

  //populate todos
  $.getJSON("/api/todos")
  .then(addTodos)
  .catch(function(err){
    console.log(err);
  });

  // submit new todo
  $('#todoInput').keypress(function(event){
    if(event.which == 13) {
      createTodo();
    }
  });

});

function addTodos(todos){
  todos.forEach(function(todo){
    addTodo(todo);
  });
}

function addTodo(todo){
  var newTodo = $('<li class="task">' + todo.name + '</li>');
  if(todo.completed){
    newTodo.addClass("done");
  }
  $('.list').append(newTodo);
}

function createTodo(){
  // send request to create todo
  var userInput = $('#todoInput').val();
  $.post('/api/todos', { name: userInput })
  // alternative: shoe the new data and clear the form before it gets posted (then remove it if it fails)
  // this would be for speed if sending large amount of data, but works fine for this implementation
  .then(function(newTodo){
    $('#todoInput').val('');
    addTodo(newTodo);
  })
  .catch(function(err){
    console.log(err);
  });
}
