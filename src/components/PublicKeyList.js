import React from 'react'
import { List, ListHeader } from 'react-onsenui'
import IF from '../components/If'
import PublicKeyListItem from './PublicKeyListItem'

class PublicKeyList extends React.Component {
  constructor (props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
  }

  renderRow (row, index) {
    return (
      <PublicKeyListItem
        key={index}
        index={index}
        row={row}
        onSelect={this.props.onSelect} />
    )
  }

  render () {
    return (
      <IF what={this.props.keys.length > 0}>
        <List
          dataSource={this.props.keys}
          renderRow={this.renderRow}
          renderHeader={() => <ListHeader>Recently used public keys</ListHeader>}
        />
      </IF>
    )
  }
}

export default PublicKeyList
