import React from 'react'

import { Toolbar, BackButton, ToolbarButton, Icon } from 'react-onsenui'

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
      <Toolbar>
        {backButton}
        <div className='center'>{this.props.title}</div>
        <div className='right'>
          <ToolbarButton onClick={this.props.onLogout}>
            <Icon icon='ion-log-out' />
          </ToolbarButton>
        </div>
      </Toolbar>
    )
  }
}

export default AppToolbar
