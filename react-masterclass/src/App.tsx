import React from "react";
import { useRecoilState } from "recoil";
import { hoursSelector, minutesState } from "./atoms";

function App() {
  const [minutes, setMinutes] = useRecoilState(minutesState);
  const [hours, setHours] = useRecoilState(hoursSelector);
  const onMinutesChange = (e: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+e.currentTarget.value);
  };
  const onHoursChange = (e: React.FormEvent<HTMLInputElement>) => {
    setHours(+e.currentTarget.value);
  };

  return (
    <div>
      <input value={minutes} onChange={onMinutesChange} type="number" placeholder="Minutes" />
      <input value={hours} onChange={onHoursChange} type="number" placeholder="Hours" />
    </div>
  );
}

export default App;
