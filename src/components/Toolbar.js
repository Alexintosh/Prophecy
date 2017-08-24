import React from 'react'
import IF from './If'
import { Toolbar, BackButton, ToolbarButton, Icon, Popover } from 'react-onsenui'

class AppToolbar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      popoverOpen: false
    }
    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
    this.getTarget = this.getTarget.bind(this)
  }

  show () {
    this.setState({popoverOpen: true})
  }

  getTarget () {
    return this.refs.button
  }

  hide () {
    this.setState({popoverOpen: false})
  }

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
          <IF what={this.props.showContextualMenu}>
            <ToolbarButton onClick={this.show} ref='button'>
              <Icon icon='ion-android-more-vertical' />
            </ToolbarButton>
            <Popover
              isOpen={this.state.popoverOpen}
              onOpen={this.show}
              onHide={this.hide}
              isCancelable
              onCancel={() => this.hide()}
              getTarget={this.getTarget}
            >
              <section style={{margin: '15px'}}>
                <p onClick={this.props.onLogout}>
                  Logout <Icon icon='ion-log-out' />
                </p>
                <p onClick={this.props.onSwitchNet}>
                  Switch to: { this.props.selectedNet === 'MainNet'
                    ? 'TestNet'
                    : 'MainNet'
                  }
                </p>
              </section>
            </Popover>
          </IF>
        </div>
      </Toolbar>
    )
  }
}

export default AppToolbar
