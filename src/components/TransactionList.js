import React from 'react'
import { List, ListItem } from 'react-onsenui'

class TransactionList extends React.Component {
  componentDidMount () {
    this.formatAmout = this.formatAmount.bind(this)
    this.renderRow = this.renderRow.bind(this)
  }

  formatAmount (t) {
    return t.type === 'NEO' ? parseInt(t.amount) : parseFloat(t.amount).toPrecision(5)
  }

  renderRow (row, index) {
    const amount = this.formatAmount(row)
    return (
      <ListItem key={index}>
        <div style={{display: 'block'}}>
          {amount} {row.type}
          <p><small>{row.txid.substring(0, 32)}</small></p>
        </div>
      </ListItem>
    )
  }

  render () {
    return (
      <List
        dataSource={this.props.history}
        renderRow={this.renderRow}
            />
    )
  }
}

export default TransactionList
