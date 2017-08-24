import React from 'react'
import { Tabbar, Tab, Page } from 'react-onsenui'
import TransactionTab from './TransactionTab'
import MainTab from './MainTab'
import SendTab from './SendTab'
import Toolbar from '../../components/Toolbar'
import {doLogout} from '../Login/actions'
import { connect } from 'react-redux'
import {switchNet} from '../App/actions'

const titles = ['Prophecy Wallet', 'Transfer', 'Transaction']

class TabsContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      index: 0,
      toolbarTitle: titles[0]
    }
    this.renderTabs = this.renderTabs.bind(this)
  }

  renderTabs (activeIndex, tabbar) {
    // navigator={this.props.navigator}
    return [
      {
        content: <MainTab key='tab_main' active={activeIndex === 0} />,
        tab: <Tab key='tab_main_' label='Wallet' />
      },
      {
        content: <SendTab key='tab_transfer_' active={activeIndex === 1} />,
        tab: <Tab key='tab_transfer' label='Transfer' />
      },
      {
        content: <TransactionTab key='tab_transaction_' active={activeIndex === 2} />,
        tab: <Tab key='tab_transaction' label='Transaction' />
      }
    ]
  }

  render () {
    return (
      <Page renderToolbar={() => <Toolbar
        onLogout={() => this.props.dispatch(doLogout(this.props.navigator))}
        onSwitchNet={() => this.props.dispatch(switchNet(this.props.net))}
        selectedNet={this.props.net}
        showContextualMenu={this.props.isLogged}
        title={this.state.toolbarTitle} />}>
        <Tabbar
          initialIndex={0}
          index={this.state.index}
          onPreChange={(event) => {
            if (event.index !== this.state.index) {
              this.setState({index: event.index, toolbarTitle: titles[event.index]})
            }
          }}
          position='top'
          renderTabs={this.renderTabs}
        />
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  net: state.app.net,
  isLogged: state.account.account.address
})

export default connect(mapStateToProps)(TabsContainer)
