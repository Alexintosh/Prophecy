import React from 'react'
import styled from 'styled-components'
import { List, ListItem, Icon } from 'react-onsenui'

export const ReceivedIcon = styled(Icon)`
  font-size: 30px;
  color: #5abc03;
`

export const SentIcon = styled(Icon)`
  font-size: 30px;
  color: #a02e2e;
`

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
        <div className='left'>
          { amount < 0
            ? <SentIcon icon='ion-arrow-graph-down-right' className='list-item__thumbnail' />
            : <ReceivedIcon icon='ion-arrow-graph-up-right' className='list-item__thumbnail' />
          }
        </div>
        <div className='center' style={{display: 'block'}}>
          { amount < 0
            ? 'Sent ' : 'Received '
          }
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
