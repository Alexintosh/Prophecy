import React from 'react'
import { Page } from 'react-onsenui'
import { connect } from 'react-redux'

class SendTab extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount () {

  }

  componentWillReceiveProps (nextProps) {
  }

  getContent () {
  }

  render () {
    return (
      <Page>
          Send
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
  public_key: state.account.account.address
})

export default connect(mapStateToProps)(SendTab)
