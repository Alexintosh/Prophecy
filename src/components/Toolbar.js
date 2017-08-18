import React from 'react'

import { Toolbar, BackButton } from 'react-onsenui'

class AppToolbar extends React.Component {
  backButton () {
    return (
      <div className='left'>
        {
                this.props.modifier
                        ? <BackButton modifier={this.props.modifier}>Back</BackButton>
                    : ''
            }
      </div>
    )
  }

  render () {
    const backButton = this.backButton()
    return (
      <Toolbar modifier={this.props.modifier} >
        {backButton}
        <div className='center'>{this.props.title}</div>
      </Toolbar>
    )
  }
}

export default AppToolbar
