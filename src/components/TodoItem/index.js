import {useState} from 'react'
import './index.css'

const TodoItem = props => {
  const [isEditActive, setEdit] = useState(false)
  const [isSaveActive, setSave] = useState(false)
  const {todoDetails, deleteTodo, checkTodo, onEditTodo} = props
  const {id, title, isChecked} = todoDetails
  const [textInput, setTextInput] = useState(title)
  const toDoClass = isChecked ? 'title checked' : 'title'

  const onDeleteTodo = () => {
    deleteTodo(id)
  }

  const onClickCheck = () => {
    checkTodo(id)
  }

  const onClickEdit = () => {
    setEdit(true)
    setSave(true)
  }

  const onChangeTodo = event => {
    setTextInput(event.target.value)
  }
  const onClickSave = () => {
    setEdit(false)
    setSave(false)
    onEditTodo({id, textInput})
  }
  return (
    <li className="todo-item">
      <div className="todo-item-container">
        <input type="checkbox" onClick={onClickCheck} />
        {isEditActive ? (
          <input
            type="text"
            value={textInput}
            className="editable-todo-input"
            onChange={onChangeTodo}
          />
        ) : (
          <p className={toDoClass}>{title}</p>
        )}
      </div>
      <div className="todo-item-btn-container">
        {isSaveActive ? (
          <button
            type="button"
            className="save-and-edit-btn"
            onClick={onClickSave}
          >
            save
          </button>
        ) : (
          <button
            type="button"
            className="save-and-edit-btn"
            onClick={onClickEdit}
          >
            Edit
          </button>
        )}
        <button type="button" className="delete-btn" onClick={onDeleteTodo}>
          Delete
        </button>
      </div>
    </li>
  )
}

export default TodoItem
