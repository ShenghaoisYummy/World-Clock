import { React, useState } from 'react'
import { TodoForm } from './TodoForm'
import { Todo } from './Todo'

import { v4 as uuidv4 } from 'uuid';
uuidv4();

export const TodoWraper = () => {

    const [todos, setTodos] = useState([]);

    const addTodo = todo => {
        setTodos([...todos, {id: uuidv4(), task: todo, completed: false, isEditing: false}]);
        console.log(todos)
    }

    const toggleComplete = id => {
        setTodos(todos.map(todo => todo.id === id ? 
            {...todo, completed:!todo.completed}: todo))};

    const deleteTodo = id => {
        setTodos(todos.filter(todo => todo.id != id))
    }

    return (

        <div className='TodoWrapper'>
            <TodoForm addTodo={addTodo}/>
            {todos.map((todo, index) => (
                <Todo task={todo} key={index} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />
            ))}
        </div>

    )
}