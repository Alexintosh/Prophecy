import { Col, Row, Icon, Button } from 'react-onsenui'
import styled from 'styled-components'
import React from 'react'

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

export const Label = styled.div`
    font-weight:200;
    color:$thin-text-color;
    font-size:1.1em;
`

export const AmountBig = styled.div`
    font-weight:200;
    font-size:2.4em;
    color:$thin-text-color;
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
    const { NEO, GAS, availaleToClaim, onClaim, claimDisabled } = this.props
    return (
      <Wrapper>
        <Row>
          <CenteredCol>
            <Split>
              <Label>NEO</Label>
              <AmountBig>{NEO}</AmountBig>
            </Split>
          </CenteredCol>
        </Row>
        <Row>
          <CenteredCol>
            <Split onClick={this.refresh.bind(this)}>
              <Label>Refresh</Label>
              <Icon size={30} icon='md-refresh' spin={this.state.isLoading} />
            </Split>
          </CenteredCol>
        </Row>
        <Row>
          <CenteredCol>
            <Split>
              <Label>GAS</Label>
              <AmountBig>{GAS}</AmountBig>
            </Split>
          </CenteredCol>
        </Row>
        <Row>
          <CenteredCol>
            { claimDisabled
              ? 'You can claim Gas once every 5 minutes'
            : <Button onClick={onClaim}>Claim {availaleToClaim} Gas</Button>}
          </CenteredCol>
        </Row>
      </Wrapper>
    )
  }
}
