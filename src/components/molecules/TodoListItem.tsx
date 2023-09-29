import { TodoType } from '../../App'
import SecondaryButton from '../atoms/SecondaryButton'
import { DragEvent } from 'react'

type Props = {
  todo: TodoType
}

export function TodoListItem(props: Props) {
  const { todo } = props
  const onDragStart = (event: DragEvent<HTMLElement>, todoId: number) => {
    event.dataTransfer.setData('todoId', `${todoId}`)
  }
  const onDragEnd = () => {}
  const handleDelete = (todoId: number) => {}

  return (
    <li
      key={todo.id}
      id={`todo-${todo.id}`}
      draggable="true"
      onDragEnd={onDragEnd}
      onDragStart={(e) => onDragStart(e, todo.id)}
    >
      {todo.todo}
      <SecondaryButton onClick={() => handleDelete(todo.id)} text={'×'} />
    </li>
  )
}
