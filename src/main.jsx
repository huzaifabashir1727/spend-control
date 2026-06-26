import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import {store} from './store/store.js'
import { AuthProvider } from './context/AuthContext.jsx'
import Auth from './components/Auth.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <Auth>
          <App />
        </Auth>
      </AuthProvider>
    </Provider>
  </StrictMode>,
)
