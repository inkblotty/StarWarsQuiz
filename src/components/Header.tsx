import React from 'react';
import styled from 'styled-components';
import { ThemeProps } from '../lib/helpers';

const StyledHeader = styled.h1`
  align-items: center;
  display: flex;
  font-size: ${({ theme }: ThemeProps) => theme.fontSize.heading}px;
  margin: 0 0 ${({ theme }: ThemeProps) => theme.spacingUnit * 6}px;
  padding: ${({ theme }: ThemeProps) => `${theme.spacingUnit * 3}px ${theme.spacingUnit * 4}px`};
  text-transform: uppercase;
  @media screen and (max-width: 900px) {
    font-size: 28px;
    justify-content: center;
  };
`;
const StyledSpan = styled.span`
  text-shadow: -1px 1px 0 ${({ theme }: ThemeProps) => theme.colors.black},
    1px -1px 0 ${({ theme }: ThemeProps) => theme.colors.black},
    -1px -1px 0 ${({ theme }: ThemeProps) => theme.colors.black},
    1px 1px 0 ${({ theme }: ThemeProps) => theme.colors.black}
  ;
  color: ${({ theme }: ThemeProps) => theme.colors.yellow};
  display: inline-block;
  font-family: StarJedi, Verdana, sans-serif;
  font-size: 44px;
  margin-bottom: 6px; /* free font has odd alignment */
  padding: 0 ${({ theme }: ThemeProps) => theme.spacingUnit * 4}px;
  @media screen and (max-width: 900px) {
    font-size: 30px;
  };
`;
type Props = {};
const Header = (props: Props) => {
  return (
    <StyledHeader>
      <StyledSpan>Star Wars </StyledSpan>
      Quiz
    </StyledHeader>
  );
}

export default Header;
