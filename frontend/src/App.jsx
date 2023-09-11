import {  } from 'react'
import { Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'

function App() {

  return (
    <div>
        <Route path='/' component={HomePage} exact/>
        <Route path='/chats' component={ChatPage} />
        <Route path='/login' component={LoginPage} />
    </div>
  )
}

export default App
