import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { LocaleProvider } from 'antd'
import { BrowserRouter } from 'react-router-dom'
import enUS from 'antd/lib/locale-provider/en_US'
import './index.css'
import App from './components/App'
import store from './storeConfiguration'

ReactDOM.render(
    <LocaleProvider locale={enUS}>
        <Provider store={store}>
            <BrowserRouter>
             <App/>
            </BrowserRouter>
        </Provider>
    </LocaleProvider>,
    document.getElementById('root')
)

