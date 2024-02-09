import React from "react";
import styled from "styled-components";
import City from "./City";
import Time from "./Time";
import Pointer from "./Pointer";
import Center from "./Center";
import Core from "./Core";

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
  const [minDeg, setMinuteDeg] = React.useState();
  const [secondDeg, setSecondDeg] = React.useState();

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

    setSecondDeg(unitDeg * timeWithOffset.getUTCSeconds());

    setMinuteDeg(
      unitDeg * timeWithOffset.getUTCMinutes() +
        (timeWithOffset.getUTCSeconds() / 60) * unitDeg
    );

    setHourDeg(
      bigUnitDeg * timeWithOffset.getUTCHours() +
        (timeWithOffset.getUTCMinutes() / 60) * bigUnitDeg
    );
  };

  return (
    <StyledClockWrapper $light={light}>
      <City light={light}>{city}</City>
      <Pointer light={light}>
        <Center />
        <Core
          light={light}
          angle={secondDeg}
          pointer_width={2}
          block_size={150}
          tail={20}
        />
        <Core
          light={light}
          angle={minDeg}
          pointer_width={2}
          block_size={120}
          tail={0}
          pointer_light="#848484"
          pointer_dark="#fff"
        />
        <Core
          light={light}
          angle={hourDeg}
          pointer_width={8}
          block_size={100}
          tail={0}
          pointer_light="#848484"
          pointer_dark="#fff"
        />
      </Pointer>
      <Time>
        {year}-{month}-{day} {hour}:{min}:{second}
      </Time>
    </StyledClockWrapper>
  );
};

export default Clock;
