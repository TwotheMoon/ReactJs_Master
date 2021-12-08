import React, { useState } from "react";
import styled from "styled-components";

function App() {

  const [value, setValue] = useState("");
  // 이벤트에 대한 정의 : 이녀석은 HTML input 요소에 대한 이벤트이다
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },  // == setValue(event.currentTarget.value);
    } = event;                   // 데이터 무결성을 위해 getter, setter
    setValue(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("hello", value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={value} onChange={onChange} type="text" placeholder="username"></input>
        <button>Log in</button>
      </form>
    </div>
  );
}

export default App;
