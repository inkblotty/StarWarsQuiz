import React from 'react';
import styled from 'styled-components';
import { ThemeProps } from '../lib/helpers';

const StyledHeader = styled.h1`
  background-color: ${({ theme }: ThemeProps) => theme.colors.backgroundColor};
  color: ${({ theme }: ThemeProps) => theme.colors.textColor};
`;
type Props = {
} & ThemeProps;
const Header = ({ theme }: Props) => {
  return (
    <StyledHeader theme={theme}>
      Star Wars Quiz
    </StyledHeader>
  );
}

export default Header;
