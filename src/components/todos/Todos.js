import React, { useEffect, useContext } from 'react';
import TodoItem from './TodoItem';
import NoTodo from './NoTodo';

import TodoContext from '../../context/todo/todoContext';

const Todos = (props) => {
  const todoContext = useContext(TodoContext);

  const { todos, getTodos, filtered } = todoContext;

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div id='todos-container' className='container-sm mt-1 mb-1'>
      {
        todos.length > 0
          ? !filtered
            ? todos.map((t, index) => (
              <TodoItem key={t.id} todo={t} number={index} />
              ))
            : todos.map((t, index) => (
              !t.done && <TodoItem key={t.id} todo={t} number={index} />
            ))
          : <NoTodo />
      }
    </div>
  )
}

export default Todos
