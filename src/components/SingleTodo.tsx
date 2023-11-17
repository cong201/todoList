import React, { useState, useRef, useEffect } from 'react'
import { Todo } from '../model';
import { MdEdit, MdDelete, MdDone } from 'react-icons/md'
import { Draggable } from 'react-beautiful-dnd';
type Props = {
    index: number;
    t: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ index, t, todos, setTodos }) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(t.todo);

    const handleDone = (id: number) => {
        setTodos(todos.map(t => t.id === id ? { ...t, isDone: !t.isDone } : t));
    }

    const handleDelete = (id: number) => {
        setTodos(todos.filter((t) => t.id !== id));
    }

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(todos.map((t) => (
            t.id === id ? { ...t, todo: editTodo } : t
        )))
        setEdit(false);
    }

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    return (
        <Draggable draggableId={t.id.toString()} index={index}>
            {(provided) => (
                <form className='todos_single' onSubmit={(e) => handleEdit(e, t.id)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {
                        edit ? (<input
                            ref={inputRef}
                            value={editTodo}
                            onChange={(e) => setEditTodo(e.target.value)}
                            className='todos_single_text'
                        />) : t.isDone ? (<s className='todos_single_text'>{t.todo}</s>) : (<span className='todos_single_text'>{t.todo}</span>)
                    }
                    <div className='dad-icon'>
                        <span className='icon' onClick={() => {
                            if (!edit && !t.isDone) {
                                setEdit(!edit);
                            }
                        }}><MdEdit /></span>
                        <span className='icon' onClick={() => handleDelete(t.id)}><MdDelete /></span>
                        <span className='icon' onClick={() => handleDone(t.id)}><MdDone /></span>
                    </div>
                </form >
            )}
        </Draggable >
    )
}

export default SingleTodo
