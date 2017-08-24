import React from 'react'
import { connect } from 'react-redux'
import { Navigator } from 'react-onsenui'
import Login from '../Login/Login'

export class App extends React.Component {
  renderPage (route, navigator) {
    const props = route.props || {}
    props.navigator = navigator
    return React.createElement(route.component, route.props)
  }

  render () {
    return (
      <Navigator
        swipeable
        renderPage={this.renderPage.bind(this)}
        initialRoute={{
          component: Login,
          props: {
            key: 'login'
          }
        }}
        />
    )
  }
}

App.propTypes = {
  children: React.PropTypes.node
}

const mapStateToProps = (state) => ({
  net: state.net
})

export default connect(mapStateToProps)(App)
