import React from 'react'
import { Tabbar, Tab, Page } from 'react-onsenui'
import TransactionTab from './TransactionTab'
import MainTab from './MainTab'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      index: 0
    }
    this.renderTabs = this.renderTabs.bind(this)
  }

  renderTabs (activeIndex, tabbar) {
    return [
      {
        content: <MainTab key='tab_home_0' title='Prophecy Wallet' active={activeIndex === 0} />,
        tab: <Tab key='tab_home' label='Home' icon='md-home' />
      },
      {
        content: <TransactionTab key='tab_transaction' active={activeIndex === 1} />,
        tab: <Tab key='tab_transaction' label='History' icon='md-settings' />
      }
    ]
  }

  render () {
    return (
      <Page>
        <Tabbar
          index={this.state.index}
          onPreChange={(event) => {
            this.setState({ index: event.index })
          }}
          onPostChange={() => console.log('postChange')}
          onReactive={() => console.log('postChange')}
          position='bottom'
          renderTabs={this.renderTabs}
        />
      </Page>
    )
  }
}