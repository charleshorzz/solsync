import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/bootstrap.min.css'
import './assets/index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import CreateLinkScreen from './screens/CreateLinkScreen';
import AboutScreen from './screens/AboutScreen';
// Ignore this curly red line
import ResultScreen from './screens/ResultScreen';
import DashboardScreen from './screens/DashboardScreen';
import AddRecipientsScreen from './screens/AddRecipientsScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route index={true} path='/' element={<HomeScreen />}/>
      <Route path='/create' element={<CreateLinkScreen />}/>
      <Route path='/about' element={<AboutScreen />}/>
      <Route path='/result' element={<ResultScreen />}/>
      <Route path='/dashboard' element={<DashboardScreen />}/>
      <Route path='/recipients' element={<AddRecipientsScreen />}/>
    </Route>
  
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
