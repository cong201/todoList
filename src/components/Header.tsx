import { useRef } from 'react';
import './style.css';

interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e: React.FormEvent) => void;
}

const Header: React.FC<Props> = ({ todo, setTodo, handleSubmit }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <div>
            <form className='input' onSubmit={(e) => {
                inputRef.current?.blur()
                handleSubmit(e)
            }}>
                <input
                    ref={inputRef}
                    type="input"
                    placeholder='Enter a task'
                    className='input_box'
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                />
                <button className='input_submit' type='submit'>Go</button>
            </form>
        </div >
    )
}

export default Header
