import React from 'react'
import { connect } from 'react-redux'
import { Navigator, Toast, Button } from 'react-onsenui'
import Login from '../Login/Login'
import {hideToast} from './actions'

export class App extends React.Component {
  renderPage (route, navigator) {
    const props = route.props || {}
    props.navigator = navigator
    return React.createElement(route.component, route.props)
  }

  render () {
    console.log(this.props)

    return (
      <section>
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

        <Toast isOpen={this.props.toast.isShown}>
          <div className='message'>
            {this.props.toast.message}
          </div>
          <Button onClick={() => this.props.dispatch(hideToast())}>
            Dismiss
          </Button>
        </Toast>
      </section>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.node
}

const mapStateToProps = (state) => ({
  net: state.app.net,
  toast: state.app.toast
})

export default connect(mapStateToProps)(App)
