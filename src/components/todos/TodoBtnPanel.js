import React, { useContext } from 'react';

import TodoContext from '../../context/todo/todoContext';

const TodoBtnPanel = (props) => {
  const todoContext = useContext(TodoContext);

  const { clearTodos, checkAll, filterTodos, clearFilter, filtered, todos, allDone } = todoContext;

  const toggleFilter = () => {
    filtered ? clearFilter() : filterTodos()
  }

  return (
    <div className='grid-3 container-sm mt-0'>
      <div className={`btn btn-block rounded ${todos.length === 0 ? 'btn-light' : 'btn-success'}`} onClick={checkAll}>
        <div className={`box ${!allDone && 'bg-dark'}`}></div>
        {allDone ? 'Uncheck all' : 'Check all'}
      </div>
      <div className={`btn btn-block rounded ${todos.length === 0 ? 'btn-light' : 'btn-warning'}`} onClick={toggleFilter}>
        Show {filtered ? 'all' : 'active'}
      </div>
      <div className={`btn btn-block rounded ${todos.length === 0 ? 'btn-light' : 'btn-danger'}`} onClick={clearTodos}>
        Clear todos 
      </div>
    </div>
    
  )
}

export default TodoBtnPanel
