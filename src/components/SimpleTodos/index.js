import {Component} from 'react'
import {v4 as uid} from 'uuid'
import TodoItem from '../TodoItem'
import './index.css'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
    isChecked: false,
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
    isChecked: false,
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
    isChecked: false,
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
    isChecked: false,
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
    isChecked: false,
  },
  {
    id: 6,
    title: 'Fix the production issue',
    isChecked: false,
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
    isChecked: false,
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
    isChecked: false,
  },
]

class SimpleTodos extends Component {
  state = {
    todosList: initialTodosList,
    todosInput: '',
  }

  deleteTodo = id => {
    const {todosList} = this.state
    const updatedTodosList = todosList.filter(eachTodo => eachTodo.id !== id)

    this.setState({
      todosList: updatedTodosList,
    })
  }

  checkTodo = id => {
    this.setState(prev => ({
      todosList: prev.todosList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isChecked: !eachItem.isChecked}
        }
        return eachItem
      }),
    }))
  }

  onChangeTodo = event => {
    this.setState({todosInput: event.target.value})
  }

  onEditTodo = ({id, textInput}) => {
    console.log(textInput)
    this.setState(prev => ({
      todosList: prev.todosList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, title: textInput}
        }
        return eachItem
      }),
    }))
  }

  onClickAddTodos = () => {
    const {todosInput} = this.state
    const inputParts = todosInput.split(' ')
    const lastPart = inputParts[inputParts.length - 1]

    if (!Number.isNaN(Number(lastPart))) {
      const count = parseInt(lastPart)
      const todo = inputParts.slice(0, inputParts.length - 1).join(' ')

      const newTodos = []
      for (let i = 0; i < count; i += 1) {
        newTodos.push({
          id: uid(),
          title: todo,
          isChecked: false,
        })
      }

      this.setState(prev => ({
        todosList: [...prev.todosList, ...newTodos],
        todosInput: '',
      }))
    } else {
      const newTodo = {
        id: uid(),
        title: todosInput,
        isChecked: false,
      }

      this.setState(prev => ({
        todosList: [...prev.todosList, newTodo],
        todosInput: '',
      }))
    }
  }

  render() {
    const {todosList, todosInput} = this.state
    return (
      <div className="todo-app">
        <div className="todo-container">
          <h1 className="heading">Simple Todos</h1>
          <div className="todo-input-container">
            <input
              type="text"
              value={todosInput}
              onChange={this.onChangeTodo}
              className="todo-input"
            />
            <button
              type="button"
              className="todo-add-btn"
              onClick={this.onClickAddTodos}
            >
              Add
            </button>
          </div>
          <ul className="todos-list">
            {todosList.map(eachTodo => (
              <TodoItem
                key={eachTodo.id}
                todoDetails={eachTodo}
                deleteTodo={this.deleteTodo}
                checkTodo={this.checkTodo}
                onEditTodo={this.onEditTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default SimpleTodos
