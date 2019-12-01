import React, { useState, useEffect, useContext } from 'react';
import TodoContext from '../../context/todo/todoContext';

const Congrats = () => {
  const { todos } = useContext(TodoContext);

  const [allDone, setAllDone] = useState(false);

  useEffect(() => {
    todos.filter(t => t.done).length === todos.length && todos.length !== 0 ? setAllDone(true) : setAllDone(false)
  }, [todos]);

  return (
    <div className={`container-sm mt-0 mb-0 ${!allDone && 'd-n'}`}>
      <div className='alert alert-success text-center text-bold mt-0 mb-0'>
        Nice Job!
        Yoy have done all your works  
      </div>  
    </div>
  )
}

export default Congrats
