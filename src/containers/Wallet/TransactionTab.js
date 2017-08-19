import React from 'react'
import { PullHook, Page } from 'react-onsenui'
import Toolbar from '../../components/Toolbar'
import TransactionList from '../../components/TransactionList'
import { fetchTransaction } from './actions'
import { connect } from 'react-redux'

class TransactionTab extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      state: 'initial'
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    this.props.dispatch(fetchTransaction(this.props.public_key))
  }

  handleChange (e) {
    this.setState({state: e.state})
  }

  handleLoad () {
    this.props.dispatch(fetchTransaction(this.props.public_key))
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
      <Page renderToolbar={() => <Toolbar title='History' />} >      
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
