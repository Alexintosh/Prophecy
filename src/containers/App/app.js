import React from 'react'
import { Navigator } from 'react-onsenui'
import { Provider } from 'react-redux'
import Login from '../Login/Login'
import configureStore from './../../store'

const store = configureStore()

export class App extends React.Component {
  renderPage (route, navigator) {
    const props = route.props || {}
    props.navigator = navigator
    return React.createElement(route.component, route.props)
  }

  render () {
    return (
      <Provider store={store}>
        <Navigator
          swipeable
          renderPage={this.renderPage}
          onPrePush={e => console.log('prepush', e)}
          onPostPush={e => console.log('postpush', e)}
          onPrePop={e => console.log('prepop', e)}
          onPostPop={e => console.log('postpop', e)}
          initialRoute={{
            component: Login,
            props: {
              key: 'examples'
            }
          }}
          />
      </Provider>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.node
}

export default App
