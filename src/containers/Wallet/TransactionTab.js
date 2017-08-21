import React from 'react'
import { PullHook, Page } from 'react-onsenui'
import TransactionList from '../../components/TransactionList'
import { fetchTransaction } from './actions'
import { connect } from 'react-redux'

class TransactionTab extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      state: 'initial',
      doneCb: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleLoad = this.handleLoad.bind(this)
  }

  componentDidMount () {
    this.props.dispatch(fetchTransaction(this.props.public_key))
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.wallet.transactions) {
      this.setState({state: 'initial'}, this.state.doneCb)
    }
  }

  handleChange (e) {
    this.setState({state: e.state})
  }

  handleLoad (done) {
    this.props.dispatch(fetchTransaction(this.props.public_key))
    this.setState({doneCb: done})
  }

  getContent () {
    switch (this.state.state) {
      case 'initial':
        return 'Pull to refresh'
      case 'preaction':
        return 'Release'
      case 'action':
        return 'Loading...'
    }
  }

  render () {
    const {transactions} = this.props.wallet
    return (
      <Page>
        <PullHook
          onChange={this.handleChange}
          onLoad={this.handleLoad}>
          {this.getContent()}
        </PullHook>
        <TransactionList
          key='tab_history'
          history={transactions}
                />
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
  public_key: state.account.account.address
})

export default connect(mapStateToProps)(TransactionTab)
