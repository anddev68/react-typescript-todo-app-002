import React, { MouseEvent } from 'react'

interface Props {
  text: string
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

const SecondaryButton: React.FC<Props> = (props) => {
  const { text, onClick } = props

  return (
    <button className="deleteButton" onClick={onClick}>
      {text}
    </button>
  )
}

export default SecondaryButton
