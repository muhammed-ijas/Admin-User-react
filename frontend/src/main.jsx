import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Home from './pages/Home.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import store from './store.js';
import { Provider } from 'react-redux'
import privateRoute from './components/PrivateRouter.jsx';
import Profile from './pages/Profile.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Home />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/profile' element={<privateRoute><Profile /></privateRoute>} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  </Provider>
)
