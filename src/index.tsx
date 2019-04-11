import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'
import './index.css'
import App from './components/App'
import store from './storeConfiguration'

ReactDOM.render(
    <LocaleProvider locale={enUS}>
        <Provider store={store}>
            <App />
        </Provider>
    </LocaleProvider>,
    document.getElementById('root')
)

