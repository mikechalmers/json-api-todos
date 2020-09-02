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

  // add the listener to the span (as it exists on page load and the spans don't)
  // then apply it to the spans as second argument
  $('.list').on('click', 'span', function(){
    removeTodo($(this).parent());
  });


});

function addTodos(todos){
  todos.forEach(function(todo){
    addTodo(todo);
  });
}

function addTodo(todo){
  var newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>');
  // add the id to the jQuery data so we can identify and delete later
  newTodo.data('id', todo._id);
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

function removeTodo(todo){
  // grab the id from the jQuery data we added in the addTodo function
  var clickedId = todo.data('id');
  var deleteUrl = 'api/todos/' + clickedId;

  $.ajax({
    method: 'DELETE',
    url: deleteUrl
  })
  .then(function(data){
    console.log(data);
    todo.remove();
  })
  .catch(function(err){
    console.log(err);
  });
}
