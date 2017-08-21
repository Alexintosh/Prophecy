import React from 'react'
import { Tabbar, Tab, Page } from 'react-onsenui'
import TransactionTab from './TransactionTab'
import MainTab from './MainTab'
import Toolbar from '../../components/Toolbar'

const titles = ['Prophecy Wallet', 'Transfer', 'Transaction']

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      index: 0,
      toolbarTitle: titles[0]
    }
    this.renderTabs = this.renderTabs.bind(this)
  }

  renderTabs (activeIndex, tabbar) {
    return [
      {
        content: <MainTab key='tab_home_0' active={activeIndex === 0} />,
        tab: <Tab key='tab_home' label='Wallet' />
      },
      {
        content: <TransactionTab key='tab_transfer_' active={activeIndex === 1} />,
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
      <Page renderToolbar={() => <Toolbar title={this.state.toolbarTitle} />}>
        <Tabbar
          index={this.state.index}
          onPreChange={(event) => {
            if (event.index !== this.state.index) {
              this.setState({index: event.index, toolbarTitle: titles[event.index]})
            }
          }}
          onPostChange={() => console.log('postChange')}
          onReactive={() => console.log('postChange')}
          position='top'
          renderTabs={this.renderTabs}
        />
      </Page>
    )
  }
}
