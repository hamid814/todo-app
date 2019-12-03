import React from 'react';
import Navbar from './components/layout/Navbar';
import FormContainer from './components/layout/FormContainer';
import Congrats from './components/layout/Congrats';
import Todos from './components/todos/Todos';
import TodoBtnPanel from './components/todos/TodoBtnPanel';

import TodoState from './context/todo/TodoState';
import './App.css';
import './flex.css';

const App = () => {
  return (
    <TodoState>
      <Navbar />
      <FormContainer />
      <Congrats />
      <Todos />
      <TodoBtnPanel />
    </TodoState>
  );
}
export default App