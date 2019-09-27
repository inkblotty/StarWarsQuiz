import React from 'react';
import styled from 'styled-components';

const size = 30;
const Arc = styled.div`
  border: 10px solid ${({ theme }) => theme.colors.fontColor};
  height: ${size}px;
  margin: 6px; /* enough so the points of the square don't overlap nearby content */
  width: ${size}px;

  @keyframes infinite-spinning {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  -webkit-animation: infinite-spinning 1s infinite; /* Safari 4+ */
  -moz-animation:    infinite-spinning 1s infinite; /* Fx 5+ */
  -o-animation:      infinite-spinning 1s infinite; /* Opera 12+ */
  animation:         infinite-spinning 1s infinite; /* IE 10+, Fx 29+ */
`;

const Loading = () => (
  <Arc aria-label='Loading' />
);

export default Loading;
