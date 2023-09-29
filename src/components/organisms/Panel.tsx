import { TodoType } from '../../App'
import { TodoListItem } from '../molecules/TodoListItem'
import { TodoListAddItem } from '../molecules/TodoListAddItem'
import { DragEvent } from 'react'

type Props = {
  title: string
  todoList: TodoType[]
  onAddTodo: (text: string) => void
  onMoveTodo: (id: number) => void
}

export function Panel(props: Props) {
  const { title, todoList, onAddTodo, onMoveTodo } = props

  const onDragEnter = (e: DragEvent<HTMLDivElement>) => {}
  const onDragLeave = () => {}
  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    const todoIdString = e.dataTransfer.getData('todoId')
    const todoIdNumber = Number(todoIdString)
    onMoveTodo(todoIdNumber)
  }

  return (
    <div
      className="todoDiv drop-zone"
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={(event) => {
        event.stopPropagation()
        event.preventDefault()
      }}
      onDrop={onDrop}
    >
      <h2>{title}</h2>
      <ul>
        {todoList.map((todo) => (
          <TodoListItem todo={todo} key={todo.id} />
        ))}
        <TodoListAddItem onAddTodo={onAddTodo} />
      </ul>
    </div>
  )
}
