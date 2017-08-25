import React from 'react'
import { Page, Col, Row, Icon, Button, Carousel, CarouselItem } from 'react-onsenui'
import styled from 'styled-components'
import { connect } from 'react-redux'
import startsWith from 'lodash/startsWith'
import {
  showToast,
  hideToast
} from '../App/actions.js'

export const Num = styled(Col)`
  font-size:2em;
  padding:20px 20px;
  text-align: center;  
`

export const ScreenWrapper = styled(CarouselItem)`
  background-color: #ccc
`

export const Placeholder = styled.span`
  color: rgba(255,255,255,0.5);
`

export const AssetsCaroseul = styled(Carousel)`
  margin-bottom: 100px;
  text-align: 'center';
  height: 250px;
  position: 'relative';
  padding: '20px 0';
  color: #fff;
`

export const Screen = styled(Col)`
  font-size:2.5em;
  padding:20px 0px;
  text-align: center;
`

class SendTab extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      assets: [
        {
          label: 'NEO',
          fractionable: false,
          bg: '#F1948A'
        },
        {
          label: 'GAS',
          fractionable: true,
          bg: '#FFBACC'
        }
      ],
      index: 0,
      amount: false
    }
    this.changeAsset = this.changeAsset.bind(this)
    this.numberPressed = this.numberPressed.bind(this)
  }

  componentDidMount () {

  }

  changeAsset (e) {
    if (e.activeIndex === 0 && this.state.amount) {
      const amount = parseInt(this.state.amount)
      if (amount <= 0) {
        this.setState({index: e.activeIndex, amount: 0})
        return false
      }
    }

    this.setState({index: e.activeIndex})
  }

  componentWillReceiveProps (nextProps) {
  }

  numberPressed (num) {
    const prev = this.state.amount
    const isFractionable = this.state.assets[this.state.index].fractionable

    if (num === '.' && !isFractionable) {
      return false
    } else if (num === '.' && isFractionable && !prev) {
      num = '0.'
    } else if (num === '.' && isFractionable && prev && this.state.amount.includes('.')) {
      return false
    }

    if (num === 'DEL') {
      if (!prev) {
        return false
      }
      let deleted = `${prev}`.slice(0, -1)

      if (deleted.length === 0) {
        deleted = false
      }
      this.setState({amount: deleted})
      return false
    }

    if (num === 0 && !isFractionable && !prev) {
      return false
    }

    if (num === 0 && isFractionable && !prev) {
      num = '0.'
    } else {
      if (startsWith(`${prev}${num}`, '0.000')) {
        this.props.dispatch(showToast('Amount too low'))
        setTimeout(() => {
          this.props.dispatch(hideToast())
        }, 2000)
        return false
      }
    }

    let newSum
    if (!prev) {
      newSum = `${num}`
    } else {
      newSum = `${prev}${num}`
    }

    this.setState({amount: newSum})
  }

  getContent () {
  }

  render () {
    // TODO animation when price changes, numbers going progressively
    let gasNumber
    let placeholder = <Placeholder>0</Placeholder>
    if (this.state.amount[this.state.amount.length - 1] === '.') {
      gasNumber = this.state.amount
      placeholder = <Placeholder>0</Placeholder>
    } else if (!this.state.amount) {
      gasNumber = <Placeholder>0</Placeholder>
      placeholder = ''
    } else if (this.state.amount === '0') {
      gasNumber = <Placeholder>0</Placeholder>
      placeholder = ''
    } else {
      gasNumber = this.state.amount
    }

    return (
      <Page>
        <Carousel onPostChange={this.changeAsset} index={this.state.index} fullscreen swipeable autoScroll overscrollable style={{marginBottom: '10px', textAlign: 'center', height: '200px', position: 'relative', color: '#fff'}}>
          <CarouselItem key={0} style={{ background: '#f29e2e' }}>
            <Row>
              <Screen>
                {parseInt(this.state.amount) || <Placeholder>0</Placeholder>} NEO
                </Screen>
            </Row>
            <Row>
              <Screen>
                  $ {this.state.amount ? (this.props.price.neo * parseFloat(this.state.amount)).toFixed(2) : 0}
              </Screen>
            </Row>
          </CarouselItem>
          <CarouselItem key={1} style={{ background: '#2C9FA3' }}>
            <Row>
              <Screen>
                {gasNumber}{placeholder} GAS
                </Screen>
            </Row>
            <Row>
              <Screen>
                  $ {this.state.amount ? (this.props.price.gas * parseFloat(this.state.amount)).toFixed(2) : 0}
              </Screen>
            </Row>
          </CarouselItem>
          <div style={{
            textAlign: 'center',
            fontSize: '20px',
            position: 'absolute',
            bottom: '10px',
            left: '0px',
            right: '0px'
          }}>
            {[1, 2].map((item, index) => (
              <span key={index} style={{cursor: 'pointer'}}>
                {this.state.index === index ? '\u25CF' : '\u25CB'}
              </span>
            ))}
          </div>
        </Carousel>

        <Row>
          <Row>
            <Num onClick={() => this.numberPressed(1)}>1</Num>
            <Num onClick={() => this.numberPressed(2)}>2</Num>
            <Num onClick={() => this.numberPressed(3)}>3</Num>
          </Row>
          <Row>
            <Num onClick={() => this.numberPressed(4)}>4</Num>
            <Num onClick={() => this.numberPressed(5)}>5</Num>
            <Num onClick={() => this.numberPressed(6)}>6</Num>
          </Row>
          <Row>
            <Num onClick={() => this.numberPressed('.')}>.</Num>
            <Num onClick={() => this.numberPressed(0)}>0</Num>
            <Num onClick={() => this.numberPressed('DEL')}><Icon icon='ion-android-arrow-back' size={20} /></Num>
          </Row>
        </Row>
        <Row>
          <Button modifier='large' onClick={() => this.props.dispatch(showToast(parseFloat(this.state.amount)))}>CONTINUE</Button>
        </Row>
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
  price: state.wallet.price,
  public_key: state.account.account.address
})

export default connect(mapStateToProps)(SendTab)
