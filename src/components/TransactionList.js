import React from 'react'
import { List, ListHeader } from 'react-onsenui'
import TransactionItem from './TransactionItem'
import IF from './If'

class TransactionList extends React.Component {
  renderRow (row, index) {
    return (
      <TransactionItem key={index} index={index} row={row} />
    )
  }

  render () {
    return (
      <section>
        <IF what={this.props.history.length > 0}>
          <List
            dataSource={this.props.history}
            renderRow={this.renderRow}
            renderHeader={() => <ListHeader>Last transactions</ListHeader>}
          />
        </IF>
        <IF what={this.props.history.length < 1}>
          <p>No recent transactions</p>
        </IF>
      </section>
    )
  }
}

export default TransactionList
