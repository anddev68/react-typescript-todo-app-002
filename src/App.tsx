import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import './App.css'
import PrimaryButton from './components/PrimaryButton'
import SecondaryButton from './components/atoms/SecondaryButton'
import LoginForm from './components/LoginForm'
import { Panel } from './components/organisms/Panel'

export type TodoType = {
  id: number
  todo: string
  status: 0 | 1 | 2
}

function App() {
  const [inputText, setInputText] = useState<string>('')
  const [isDragging, setIsDragging] = useState(false)
  const [isDroppable, setIsDroppable] = useState(false)
  // const [draggedTodo, setDraggedTodo] = useState<todoType | null>(null) // ドラッグされたTODOアイテムの情報を保持

  const [showFormTodo, setShowFormTodo] = useState(false)
  const [showFormInProgress, setShowFormInProgress] = useState(false)
  const [showFormDone, setShowFormDone] = useState(false)

  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false) // ログインフォームの表示状態

  const [isLoggedIn, setIsLoggedIn] = useState(false) // ログイン状態

  // フォームがフォーカスを失ったときのハンドラ
  const handleFormBlur = () => {
    console.log('フォーカスが外れた')
    setShowFormTodo(false)
    setShowFormInProgress(false)
    setShowFormDone(false)
  }
  // ログインボタンをクリックしたときにモーダルを表示
  const handleLoginButtonClick = () => {
    setIsLoginFormVisible(true)
  }

  // ログインが成功したときの処理
  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
    setIsLoginFormVisible(false)
  }

  // ログアウト処理
  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  const handleSignUpButtonClick = () => {
    console.log('SignUp')
  }

  const [todoList, setTodoList] = useState<TodoType[]>([])
  const [todoCount, setTodoCount] = useState(0)
  const todoUntouched = todoList.filter((todo) => todo.status === 0)
  const todoInProgress = todoList.filter((todo) => todo.status === 1)
  const todoDone = todoList.filter((todo) => todo.status === 2)
  const addTodo = (text: string, status: 0 | 1 | 2) => {
    setTodoList([
      ...todoList,
      {
        todo: text,
        id: todoCount,
        status
      }
    ])
    setTodoCount(todoCount + 1)
  }
  const moveTodo = (id: number, to: 0 | 1 | 2) => {
    const index = todoList.findIndex((todo) => todo.id === id)
    todoList[index].status = to
    setTodoList([...todoList])
  }

  return (
    <>
      <header>
        <h1>Trello?</h1>
        <div className="login">
          {/* <PrimaryButton text="Login" />
          <PrimaryButton text="SignUp" /> */}
          {/** ログインボタンを押下した場合*/}
          {isLoginFormVisible && <LoginForm onLogin={handleLoginSuccess} />}
          {/* ログインしていない場合にログインボタンを表示 */}
          {!isLoggedIn && <PrimaryButton text="Login" onClick={handleLoginButtonClick} />}

          {/* ログインしていない場合にSignUpボタンを表示 */}
          {!isLoggedIn && <PrimaryButton text="SignUp" onClick={handleSignUpButtonClick} />}

          {/* ログイン状態に応じてログアウトボタンを表示 */}
          {isLoggedIn && <PrimaryButton text="Logout" onClick={handleLogout} />}
        </div>
      </header>
      <div>{/**空 */}</div>
      <div className="kanban">
        <Panel
          title="未着手"
          todoList={todoUntouched}
          onAddTodo={(text) => addTodo(text, 0)}
          onMoveTodo={(id) => moveTodo(id, 0)}
        />
        <Panel
          title="着手中"
          todoList={todoInProgress}
          onAddTodo={(text) => addTodo(text, 1)}
          onMoveTodo={(id) => moveTodo(id, 1)}
        />
        <Panel
          title="完了"
          todoList={todoDone}
          onAddTodo={(text) => addTodo(text, 2)}
          onMoveTodo={(id) => moveTodo(id, 2)}
        />
      </div>
    </>
  )
}

export default App
