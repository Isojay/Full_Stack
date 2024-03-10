import ReactDOM from 'react-dom/client'
import App from './App'

import "./css/SimilarBookRecomCSS.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <ToastContainer/>
        <App/>
    </BrowserRouter>,
)
