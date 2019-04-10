import { composeWithDevTools } from 'redux-devtools-extension' /* REMOVE IN PRODUCTION !!! */
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { ajax } from 'rxjs/ajax'
import * as epics from './epics'
import * as reducers from './reducers'

const base = '/api'

const getFile = (url: string) => ajax.getJSON(base + url)

const rootEpic = combineEpics(
    epics.topojson,
    epics.toporefs
)

const epicMiddleware = createEpicMiddleware(
    { dependencies: { getFile } }
)


const rootReducer = combineReducers(reducers)


const store = createStore(
    rootReducer,
    {},
    process.env.NODE_ENV === 'development' ? composeWithDevTools(
        applyMiddleware(
            epicMiddleware
        )
    ) : applyMiddleware(
        epicMiddleware
    ) 
)

epicMiddleware.run(rootEpic)

export default store
