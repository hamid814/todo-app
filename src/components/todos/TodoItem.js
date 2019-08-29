import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import TodoContext from '../../context/todo/todoContext';

const TodoItem = ({ todo: { id, text, done }, todo, number }) => {
  const todoContext = useContext(TodoContext);

  const { setCurrent, checkTodo, deleteTodo } = todoContext;

  const onCheck = () => {
    checkTodo(id);
  }
  const onDelete = () => {
    deleteTodo(id);
  }
  const onEdit = () => {
    setCurrent(todo);
    document.querySelector('#input').focus();
  }

  return (
    <div className={`card rounded pl-2 ${done ? 'border-light' : 'border-dark'}`} onDoubleClick={onEdit}>
      <div className="badge mr-1 d-i-b">{number + 1}</div>
      <div className={`box cursor-p ${done ? '' : 'bg-dark'}`} onClick={onCheck}></div>
      <div className={`text text-dark${done && ' line-through text-light'}`}>{text}</div>
      <div className={`float-right close ${done && 'text-light'}`} onClick={onDelete}>&times;</div>
      <div className={`float-right text-sm mr-1 hover-warning close ${done && 'text-light'}`} onClick={onEdit} style={EStyle}>&euml;</div>
    </div>
  )
}

const EStyle = {
  height: '8px !important',
  overfloxY: 'none'
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  onDelete: PropTypes.func
}

export default TodoItem
