import { Droppable } from 'react-beautiful-dnd';
import { Todo } from '../model';
import SingleTodo from './SingleTodo';
import './style.css';

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }) => {
    return (
        <div className='container'>
            <Droppable droppableId='TodosList'>
                {
                    (provided) => (
                        <div className='todos' ref={provided.innerRef} {...provided.droppableProps}>
                            <span className='todos_heading'>
                                Active Task
                            </span>
                            {
                                todos.map((t, index) => (
                                    <SingleTodo index={index} t={t} todos={todos} key={t.id} setTodos={setTodos} />
                                ))
                            }
                        </div>
                    )
                }
            </Droppable>
            <Droppable droppableId='TodosRemove'>
                {
                    (provided) => (
                        <div className='todos_remove' ref={provided.innerRef} {...provided.droppableProps}>
                            <span className='todos_heading'>
                                Complete Task
                            </span>
                            {
                                completedTodos.map((t, index) => (
                                    <SingleTodo index={index} t={t} todos={completedTodos} key={t.id} setTodos={setCompletedTodos} />
                                ))
                            }
                        </div>
                    )
                }
            </Droppable>
        </div >
    )
}

export default TodoList
