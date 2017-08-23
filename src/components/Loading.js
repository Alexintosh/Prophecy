import React from 'react'
import { Page, Modal, Button } from 'react-onsenui'

export default class Loading extends React.Component {
  constructor (props) {
    super(props)

    console.log(props)

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
    console.log(nextProps)
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
            <section style={{ margin: '16px' }}>
              <p style={{ opacity: 0.6 }}>
                Loading
              </p>
              <p>
                <Button onClick={() => this.setState({ isOpen: false })}>
                  Close
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
