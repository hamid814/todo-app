import React, { useReducer } from 'react';
import uuid from 'uuid';
import TodoContext from './todoContext';
import todoReducer from './todoReducer';
import {
  GET_TODOS,
  ADD_TODO,
  CLEAR_TODOS,
  CHECK_TODO,
  CHECK_ALL,
  UPDATE_TODO,
  DELETE_TODO,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_TODOS,
  CLEAR_FILTER
} from '../types';

const TodoState = props => {
  const initialState = {
    todos: [],
    filtered: null,
    current: null,
    todosEmpty: true
  };

  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Get todos
  const getTodos = () => {
    let list;
    if(localStorage.getItem('todos') === null) {
      list = [];
    } else {
      list = JSON.parse(localStorage.getItem('todos'));
    }

    dispatch({
      type: GET_TODOS,
      payload: list
    });
  };

  // add todo
  const addTodo = (text) => {
    const newTodo = {
      id: uuid.v4(),
      text,
      done: false
    }
    dispatch({
      type: ADD_TODO,
      payload: newTodo
    });
  }

  // mark todo as complete
  const checkTodo = (id) => {
    dispatch({
      type: CHECK_TODO,
      payload: id
    });
  }

  // check all of todos
  const checkAll = () => {
    let newList;
    if(state.todos.filter(t => t.done).length !== state.todos.length) {
      newList = state.todos.map(t => {t.done = true; return t});
      dispatch({
        type: CHECK_ALL,
        payload: newList
      });
    } else {
      newList = state.todos.map(t => {t.done = false; return t});
      dispatch({
        type: CHECK_ALL,
        payload: newList
      });
    }
  }

  //  delete todo
  const deleteTodo = (id) => {
    dispatch({
      type: DELETE_TODO,
      payload: id
    });
    if(state.current && state.current.id === id) {
      clearCurrent();
    }
  }

  // set current for edit
  const setCurrent = (todo) => {
    dispatch({
      type: SET_CURRENT,
      payload: todo
    });
  }

  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    });
  }

  // update todo
  const updateTodo = (text, id) => {
    dispatch({
      type: UPDATE_TODO,
      payload: {
        text,
        id
      }
    });
    clearCurrent();
  }

  // show todos that are not done
  const filterTodos = () => {
    dispatch({
      type: FILTER_TODOS
    });
  }

  // clear filter (show all)
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    });
  }

  // clear all from todo list
  const clearTodos = () => {
    dispatch({
      type: CLEAR_TODOS
    });
  }

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        current: state.current,
        todosEmpty: state.todosEmpty,
        filtered: state.filtered,
        getTodos,
        addTodo,
        checkTodo,
        updateTodo,
        deleteTodo,
        checkAll,
        clearTodos,
        setCurrent,
        filterTodos,
        clearFilter
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoState;