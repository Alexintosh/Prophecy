import { Col, Row, Icon, Button } from 'react-onsenui';
import styled from 'styled-components';
import React from 'react';

export const CenteredCol = styled(Col)`
    align-items: center;
    justify-content: center;
    text-align: center;
`;

export const Wrapper = styled.div`
    margin:20px 0;
    width: 100%;
`;

export const Split = styled.div`
    display:inline-block;
    width:50%;
    text-align: center;
    clear:none;
`;

export const Label = styled.div`
    font-weight:200;
    color:$thin-text-color;
    font-size:1.1em;
`;

export const AmountBig = styled.div`
    font-weight:200;
    font-size:2.4em;
    color:$thin-text-color;
    margin:0px 0px 2px 0px;
`;

export const fiat = styled.div`
    font-size:1.1em;
    font-weight:200;
`;

export const Balance = () => {
    return(
        <Wrapper>
            <Row>
                <CenteredCol>
                    <Split>
                        <Label>NEO</Label>
                        <AmountBig>15</AmountBig>
                    </Split>
                </CenteredCol>
                <CenteredCol>
                    <Split>
                        <Label>Refresh</Label>
                        <Icon size={30} icon='md-refresh' />
                    </Split>
                </CenteredCol>
                <CenteredCol>
                    <Split>
                        <Label>GAS</Label>
                        <AmountBig>1500</AmountBig>
                    </Split>
                </CenteredCol>
            </Row>
            <Row>
                <CenteredCol>
                    <Button>Claim 0 Gas</Button>
                </CenteredCol>
            </Row>         
        </Wrapper>
    );
};