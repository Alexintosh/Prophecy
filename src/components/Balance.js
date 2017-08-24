import { Col, Row, Icon, Button } from 'react-onsenui'
import styled from 'styled-components'
import React from 'react'
import {coin2FIAT} from '../utils/CryptoCompareApi'

export const CenteredCol = styled(Col)`
    align-items: center;
    justify-content: center;
    text-align: center;
`

export const Wrapper = styled.div`
    margin:20px 0;
    width: 100%;
`

export const Split = styled.div`
    display:inline-block;
    text-align: center;
    clear:none;
`

export const SingleBalanceContainer = styled.div`
  display:inline-block;
  text-align: left;
  clear:none;
  margin-left:10px;
`

export const USD = styled.div`
  color: #444;
`

export const Label = styled.div`
    font-weight:200;
    color:$thin-text-color;
    font-size:1.1em;
`

export const RefreshButton = styled(Button)`
  border-radius: 100%;
  padding: 3px 13px 0px 13px;
  margin-top: 8px;
`

export const AmountBig = styled.div`
    font-weight:200;
    font-size:2.4em;
    color:$thin-text-color;
    margin:0px 0px 2px 0px;
`
export const AmountSmall = styled.div`
  font-weight:200;
  font-size:1.2em;
  color:#444;
  margin:0px 0px 2px 0px;
`

export const fiat = styled.div`
    font-size:1.1em;
    font-weight:200;
`

export class Balance extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      animationStart: false
    }
  }

  componentWillReceiveProps (nextProps) {
    const now = Date.now()

    if (now - this.state.animationStart > 1000) {
      this.setState({ isLoading: false, animationStart: false })
    } else {
      const delta = 1000 - (now - this.state.animationStart)

      setTimeout(() => {
        this.setState({ isLoading: false, animationStart: false })
      }, delta)
    }
  }

  refresh () {
    this.setState({
      isLoading: true,
      animationStart: Date.now()
    })
    this.props.onRefresh()
  }

  render () {
    const { NEO, GAS, availaleToClaim, onClaim, claimDisabled, claimInProgress, NEO_PRICE, GAS_PRICE } = this.props
    return (
      <Wrapper>
        <Row>
          <CenteredCol>
            <Split>
              <Label>NEO</Label>
              <AmountBig>{NEO}</AmountBig>
              <AmountSmall>{coin2FIAT(NEO, NEO_PRICE)}</AmountSmall>
            </Split>
          </CenteredCol>

          <CenteredCol>
            <Split onClick={this.refresh.bind(this)}>
              <Label>Refresh</Label>
              <RefreshButton>
                <Icon size={30} icon='md-refresh' spin={this.state.isLoading} />
              </RefreshButton>
            </Split>
          </CenteredCol>

          <CenteredCol>
            <Split>
              <Label>GAS</Label>
              <AmountBig>{GAS < 0.001 ? 0 : GAS.toPrecision(5)}</AmountBig>
              <AmountSmall>{coin2FIAT(GAS, GAS_PRICE)}</AmountSmall>
            </Split>
          </CenteredCol>
        </Row>
        <Row>
          <CenteredCol>
            <br /><br />
            { claimInProgress
              ? 'You can claim Gas once every 5 minutes'
            : <Button modifier='large' disabled={claimDisabled} onClick={onClaim}>Claim {availaleToClaim} Gas</Button>}
          </CenteredCol>
        </Row>
      </Wrapper>
    )
  }
}
