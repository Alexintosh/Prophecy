import React from 'react'
import { List, ListHeader } from 'react-onsenui'
import TransactionItem from './TransactionItem'

class TransactionList extends React.Component {
  renderRow (row, index) {
    return (
      <TransactionItem key={index} index={index} row={row} />
    )
  }

  render () {
    return (
      <List
        dataSource={this.props.history}
        renderRow={this.renderRow}
        renderHeader={() => <ListHeader>Last transactions</ListHeader>}
      />
    )
  }
}

export default TransactionList
