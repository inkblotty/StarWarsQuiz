import React from 'react';
import styled from 'styled-components';
import { ThemeProps } from '../lib/helpers';

const StyledHeader = styled.h1`
  background-color: ${({ theme }: ThemeProps) => theme.colors.backgroundColor};
  color: ${({ theme }: ThemeProps) => theme.colors.textColor};
  font-size: ${({ theme }: ThemeProps) => theme.fontSize.heading}px;
  font-family: StarJedi, Verdana, sans-serif;
  margin: 0 0 ${({ theme }: ThemeProps) => theme.spacingUnit * 6}px;
  padding: ${({ theme }: ThemeProps) => `${theme.spacingUnit * 3}px ${theme.spacingUnit * 4}px`};
`;
type Props = {};
const Header = (props: Props) => {
  return (
    <StyledHeader>
      Star Wars Quiz
    </StyledHeader>
  );
}

export default Header;
