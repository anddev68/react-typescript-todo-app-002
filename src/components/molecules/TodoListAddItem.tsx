import { ChangeEvent, FocusEvent, MouseEvent, useEffect, useState } from 'react'
import SecondaryButton from '../atoms/SecondaryButton'
import { TodoType } from '../../App'

type Props = {
  onAddTodo: (todo: string) => void
}

export function TodoListAddItem(props: Props) {
  const { onAddTodo } = props
  const [isOpen, setIsOpen] = useState(false)
  const [text, setText] = useState('')

  const handleChangeText = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }
  const handleAddButton = (event: MouseEvent<HTMLButtonElement>) => {
    onAddTodo(text)
    setIsOpen(false)
    setText('')
  }

  const handleOpenButton = (event: MouseEvent<HTMLButtonElement>) => {
    setIsOpen(true)
  }

  /*
  useEffect(() => {
    const listener = () => {
      setIsOpen(false)
    }
    document.addEventListener('click', listener)
    return () => {
      document.removeEventListener('click', listener)
    }
  }, [setIsOpen])
  */

  return (
    <li>
      {isOpen ? (
        <div>
          <input type="text" id="inputValue" value={text} onChange={handleChangeText} />
          <button type="button" onClick={handleAddButton}>
            Add
          </button>
        </div>
      ) : (
        <SecondaryButton text={'Add a card...'} onClick={handleOpenButton} />
      )}
    </li>
  )
}
