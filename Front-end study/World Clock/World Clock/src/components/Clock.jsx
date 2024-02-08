import React from "react";
import styled from "styled-components";
import City from "./City";
import Time from "./Time";
import Pointer from "./Pointer";

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

  const [light, setLight] = React.useState(false);

  const [year, setYear] = React.useState();
  const [month, setMonth] = React.useState();
  const [day, setDay] = React.useState();

  const [hour, setHour] = React.useState();
  const [min, setMin] = React.useState();
  const [second, setSecond] = React.useState();

  const [hourDeg, setHourDeg] = React.useState();
  const [minDeg, setminDeg] = React.useState();
  const [secondDeg, setsecondDeg] = React.useState();

  React.useEffect(() => {
    setTime();
    const interval = setInterval(() => {
      setTime();
    }, 200);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    hour >= 6 && hour <= 18 ? setLight(true) : setLight(false);
  }, [hour]);

  const setTime = () => {
    const currentTime = new Date();
    const offset = timezone * 60 * 60 * 1000;
    const timeWithOffset = new Date(currentTime.getTime() + offset);

    const unitDeg = 360 / 60;
    const bigUnitDeg = 360 / 12;

    setYear(timeWithOffset.getUTCFullYear());
    setMonth(timeWithOffset.getUTCMonth() + 1);
    setDay(timeWithOffset.getUTCDate());

    setHour(timeWithOffset.getUTCHours());
    setMin(timeWithOffset.getUTCMinutes());
    setSecond(timeWithOffset.getUTCSeconds());
  };

  return (
    <StyledClockWrapper $light={light}>
      <City light={light}>{city}</City>
      <Pointer light={light}></Pointer>
      <Time>
        {year}-{month}-{day} {hour}:{min}:{second}
      </Time>
    </StyledClockWrapper>
  );
};

export default Clock;
