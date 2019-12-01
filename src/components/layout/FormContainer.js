import React , { useState, useEffect, useContext } from 'react';
import TodoContext from '../../context/todo/todoContext';

const FormContainer = () => {
  const todoContext = useContext(TodoContext);

  const { addTodo, updateTodo, current } = todoContext;

  useEffect(() => {
    if(current !== null) {
      setText(current.text);
    }
    // eslint-disable-next-line
  }, [current])

  const [text, setText] = useState('');
  const [error, setError] = useState(false);
  const [wantToAddEmpty, setWantToAddEmpty] = useState(false);
  
  const onChange = (e) => {
    setText(e.target.value);
  }

  const onSubmit = () => {
    if(!current) {
      if(text !== '') {
        addTodo(text);
        setText('');
        setWantToAddEmpty(false);
      } else {
        setError(true);
        setWantToAddEmpty(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    } else {
      updateTodo(text, current.id);
      setText('');
    }
  }

  const onBack = () => {
    updateTodo(current.text, current.id);
    setText('');
  }

  const onKeyDown = (e) => {
    if(e.keyCode === 13) {
      onSubmit();
    } else if (e.keyCode === 27) {
      current ? onBack() : wantToAddEmpty && setWantToAddEmpty(false);
    }
  }

  const onAddEmpty = () => {
    addTodo('');
    setWantToAddEmpty(false);
  }

  return (
    <div className={`container-sm border p-2 pb-1 mb-1 mt-1 ${current && 'border-success'}`}>
      <h2 className={current ? 'text-success' : 'text-primary'}>{current ? 'Edit Todo' : 'Add Todo'}</h2>
      <input id='input' type='text' className="border-primary" onChange={onChange} onKeyDown={onKeyDown} value={text} />
      <div className={!wantToAddEmpty ? current ? 'form-group grid-3-1' : 'form-group' : 'form-group grid-3-1'}>
        <input
        onClick={onSubmit}
        type='submit'
        className='btn btn-primary btn-block mt-0'
        value={!current ? !error ? 'Add' : 'Please enter somethig' : 'Update'}/>
        {
          current
          ? <input
            onClick={onBack}
            type='submit'
            className='btn btn-warning btn-block mt-0 p-0'
            value='back' />
          : <input
            onClick={onAddEmpty}
            type='submit'
            className={wantToAddEmpty ? 'btn btn-light btn-block mt-0 p-0' : 'd-n'}
            value='Add empty' />
        }
        
      </div>
    </div>
  )
}

export default FormContainer
