import React from 'react'
import styled from 'styled-components'
import { ListItem, Icon } from 'react-onsenui'

export const DeleteIcon = styled(Icon)`
    font-size: 30px;
    color: #ccc;
`

export default class PublicKeyListItem extends React.Component {
  componentDidMount () {
    this.renderIcon = this.renderIcon.bind(this)
  }

  renderIcon () {
    return (<DeleteIcon icon='ion-android-cancel' className='list-item__thumbnail' />)
  }

  render () {
    const {index, row} = this.props
    return (
      <ListItem key={index}>
        <div className='left' style={{display: 'block'}} onClick={this.props.onSelect}>
          {row}
        </div>
        <div className='right'>
          {this.renderIcon()}
        </div>
      </ListItem>
    )
  }
}
