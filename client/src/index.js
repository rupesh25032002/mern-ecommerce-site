import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom"
import { ThemeProvider } from 'styled-components';
import theme from './components/stylecomponents/Theme';
import { Provider } from 'react-redux';
import store from './store/store';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <ThemeProvider theme={theme}>
    <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
    </ThemeProvider>

);

reportWebVitals();
