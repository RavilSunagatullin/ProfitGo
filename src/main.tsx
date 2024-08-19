import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App/styles/index.css'
import App from './App/App.tsx';
import {
    BrowserRouter,
    createBrowserRouter,
} from "react-router-dom";

import { Provider } from 'react-redux'
import {store} from "./App/store/store.ts";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <App/>
          </BrowserRouter>
      </Provider>
  </StrictMode>,
)
