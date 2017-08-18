import React from 'react'
import { Page, Button, Input, Row, AlertDialog } from 'react-onsenui'
import Toolbar from '../../components/Toolbar'
import Loading from '../../components/Loading'
import { CenteredCol } from '../../components/Balance'
import TabPage from '../Wallet/TabPage'
import { getAccountsFromWIFKey } from 'neon-js'

export default class LoginPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      wif: '',
      alertDialogShown: false,
      isLoading: false
    }

    this.hideAlertDialog = this.hideAlertDialog.bind(this)
  }

  wifChanged (e) {
    this.setState({ wif: e.target.value })
  }

  signin () {
    console.log('Loading...')
    this.setState({isLoading: true})

    let loadAccount
    try {
      loadAccount = getAccountsFromWIFKey(this.state.wif)[0]
      console.log(loadAccount)
    } catch (e) {
      loadAccount = -1
    }

    setTimeout(() => {
      this.setState({isLoading: false})
      if (loadAccount === -1 || loadAccount === -2 || loadAccount === undefined) {
        this.setState({alertDialogShown: true})
      } else {
        this.props.navigator.pushPage({
          component: TabPage
        })
      }
    }, 1000)
  }

  hideAlertDialog () {
    this.setState({alertDialogShown: false})
  }

  render () {
    const { wif } = this.state
    return (
      <Page renderToolbar={() => <Toolbar title='Prophecy' />}>
        <Row>
          <CenteredCol style={{ margin: '20px' }}>
            <h3>Prophecy</h3>
            <Input
              value={wif}
              onChange={e => this.wifChanged(e)}
              placeholder='Private Key'
              style={{ width: '100%', margin: '20px 0' }}
              type='text'
              modifier='material'
              float
            />
            <Button id='signin' onClick={e => this.signin(e)} modifier='large'>
              Login
            </Button>
            <Button id='forgot_btn' modifier='quiet'>
              CREATE WALLET
            </Button>
          </CenteredCol>
        </Row>

        <AlertDialog
          isOpen={this.state.alertDialogShown}
          isCancelable={false}>
          <div className='alert-dialog-title'>Warning!</div>
          <div className='alert-dialog-content'>
            Cannot load the wallet, check you private key.
          </div>
          <div className='alert-dialog-footer'>
            <button onClick={this.hideAlertDialog} className='alert-dialog-button'>
              Ok
            </button>
          </div>
        </AlertDialog>

        <Loading isOpen={this.state.isLoading} />
      </Page>
    )
  }
}
