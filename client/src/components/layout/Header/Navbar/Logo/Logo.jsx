import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    /* border: 1px solid blue;       */
`;

const LogoImg = styled.div`
    width: 24px;
    height: 24px;
    
    img {
        width: 100%;
        height: 100%;
    }
`;

const LogoText = styled.div`
    font-size: 17px;
    color: #f5f5f5;
    font-weight: 600;
    width: 100%;
    height: 100%;
    /* border: 1px solid red; */
    display: flex;
    align-items: center;
`;

const LogoTextSpan = styled.span`
    font-size: 19px;
    color: #23cfb5;
    font-weight: 600;
    width: 100%;
    height: 100%;
    /* border: 1px solid red; */
    display: flex;
    align-items: center;
`;

const Logo = () => {
  return <LogoContainer>
        <LogoImg></LogoImg>
        <LogoText>
           Ricey
            <LogoTextSpan>
                Store
            </LogoTextSpan>
        </LogoText>
  </LogoContainer>
};

export default Logo;
