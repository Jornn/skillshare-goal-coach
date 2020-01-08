import React from 'react'
import ReactDom from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import { firebaseApp } from './firebase'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import { logUser } from './actions'

import App from './components/App'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'

const store = createStore(reducer)

firebaseApp.auth().onAuthStateChanged(user => {
    if (user) {
        // console.log('user signed in or up', user)
        const { email } = user
        browserHistory.push('/app')
        store.dispatch(logUser(email))
    } else {
        // console.log('user has signed out or still needs to sign in')
        browserHistory.replace('/signin')
    }
})

ReactDom.render(
    <Provider store={store}>
        <Router path="/" history={browserHistory}>
            <Route path="/app" component={App} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
        </Router>
    </Provider>, document.getElementById('root')
)