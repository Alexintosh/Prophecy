import React from 'react'
import { Page, Modal, Button } from 'react-onsenui'
import Spinner from 'react-spinkit'

export default class Loading extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  componentDidMount () {
    this.setState({
      isOpen: this.props.isOpen
    })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      isOpen: nextProps.isOpen
    })
  }

  render () {
    const {isOpen} = this.state
    return (
      <div>
        { isOpen
        ? <Page>
          <Modal isOpen={this.state.isOpen}>
            <section style={{ margin: '16px', textAlign: 'center' }}>
              <div style={{ margin: '20px auto', width: '30px', height: '38px' }}>
                <Spinner name='folding-cube' color='white' />
              </div>

              <p>
                <Button style={{color: '#fff', fontSize: '11px'}}onClick={() => this.setState({ isOpen: false })} modifier='quiet'>
                  DISMISS
                </Button>
              </p>

            </section>
          </Modal>
        </Page>
        : '' }
      </div>
    )
  }
}
