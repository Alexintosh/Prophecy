import React from 'react'
import { connect } from 'react-redux'
import { Page, Button, Input, Row, AlertDialog } from 'react-onsenui'
import Toolbar from '../../components/Toolbar'
import Loading from '../../components/Loading'
import { CenteredCol } from '../../components/Balance'
import TabContainer from '../Wallet/TabsContainer'
import {login, hideError, publicLogin, getCachedPKeys} from './actions'
import PublicKeyList from '../../components/PublicKeyList'
import {
  disableClaim,
  fetchTransaction,
  fetchBalance,
  fetchClaimAmount,
  fetchMarketPrice
} from '../Wallet/actions.js'

class LoginPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      wif: '',
      isLoading: false
    }

    this.hideAlertDialog = this.hideAlertDialog.bind(this)
  }

  componentDidMount () {
    this.props.dispatch(getCachedPKeys())
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.account.account) {
      const net = this.props.net
      const pkey = nextProps.account.account.address
      this.props.dispatch(fetchMarketPrice())
      this.props.dispatch(fetchTransaction(pkey, net))
      this.props.dispatch(fetchBalance(pkey, net))
      this.props.dispatch(fetchClaimAmount(pkey, net))

      setTimeout(() => {
        console.log('timeout')
        this.props.navigator.pushPage({
          component: TabContainer,
          props: {
            key: 'walletPage'
          }
        })
      }, 2000)
    }
  }

  wifChanged (e) {
    this.setState({ wif: e.target.value })
  }

  signin () {
    this.setState({isLoading: true})
    this.props.dispatch(login(this.state.wif))
  }

  publicSignin (pkey) {
    this.setState({isLoading: true})
    this.props.dispatch(publicLogin(pkey))
    this.props.dispatch(disableClaim(true))
  }

  hideAlertDialog () {
    this.props.dispatch(hideError())
  }

  render () {
    const { wif } = this.state
    const {alertDialogShown} = this.props.account
    console.log('this.state.isLoading', this.state.isLoading)

    return (
      <section>
        <Page
          renderToolbar={() => <Toolbar title='Prophecy' />}>
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

          <PublicKeyList keys={this.props.cached_public_keys} onSelect={(pkey) => this.publicSignin(pkey)} />

          <AlertDialog
            isOpen={alertDialogShown}
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

        </Page>
        <Loading isOpen={this.state.isLoading} />
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  account: state.account,
  public_key: state.account.account.address,
  cached_public_keys: state.account.cached_public_keys
})

export default connect(mapStateToProps)(LoginPage)
