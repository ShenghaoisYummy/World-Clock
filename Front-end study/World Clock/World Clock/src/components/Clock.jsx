import React from "react";
import styled from "styled-components";

const StyledClockWrapper = styled.div`
  width: ${(props) => props.size};
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
  background-color: ${({ $light, theme }) =>
    $light ? theme.clockBackground.light : theme.clockBackground.dark};
  color: ${(props) => props.color};

  border-radius: 16px;
  padding: 16px;
  margin: 16px;
`;

StyledClockWrapper.defaultProps = {
  size: "40rem",
  $light: false,
  color: "black",
};

const Clock = (props) => {
  const { city, timezone } = props;
  return <StyledClockWrapper> Clock </StyledClockWrapper>;
};

export default Clock;
