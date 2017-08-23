import React from 'react'
import styled from 'styled-components'
import { ListItem, Icon } from 'react-onsenui'

export const ReceivedIcon = styled(Icon)`
font-size: 30px;
color: #5abc03;
`

export const SentIcon = styled(Icon)`
font-size: 30px;
color: #a02e2e;
`

export const ClaimIcon = styled(Icon)`
font-size: 30px;
color: #ccc;
`

export default class TransactionItem extends React.Component {
  componentDidMount () {
    this.formatAmout = this.formatAmount.bind(this)
    this.renderIcon = this.renderIcon.bind(this)
    this.renderLabel = this.renderLabel.bind(this)
  }

  formatAmount (t) {
    return t.type === 'NEO' ? parseInt(t.amount) : parseFloat(t.amount).toPrecision(5)
  }

  renderIcon (amount) {
    if (amount < 0) {
      return (<SentIcon icon='ion-arrow-graph-down-right' className='list-item__thumbnail' />)
    } else if (amount === 0) {
      return (<ClaimIcon icon='ion-link' className='list-item__thumbnail' />)
    } else {
      return (<ReceivedIcon icon='ion-arrow-graph-up-right' className='list-item__thumbnail' />)
    }
  }

  renderLabel (amount, type) {
    if (amount < 0) {
      return (`Sent ${amount} ${type}`)
    } else if (amount === 0) {
      return (`GAS claimed`)
    } else {
      return (`Received ${amount} ${type}`)
    }
  }

  render () {
    const {index, row} = this.props
    const amount = this.formatAmount(row)
    return (
      <ListItem key={index}>
        <div className='left'>
          {this.renderIcon(amount)}
        </div>
        <div className='center' style={{display: 'block'}}>
          {this.renderLabel(amount, row.type)}
          <p><small>{row.txid.substring(0, 32)}</small></p>
        </div>
      </ListItem>
    )
  }
}
