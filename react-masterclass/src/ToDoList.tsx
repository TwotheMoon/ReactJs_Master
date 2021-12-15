import React, { useState } from "react";
import { useForm } from "react-hook-form";

// 라이브러리 없이 리액트로만 회원가입 폼
// function ToDoList(){
//     const [todo, setTodo] = useState("");
//     const [toDoError, setToDoError] = useState("");
//     const onChange = (event:React.FormEvent<HTMLInputElement>) => {
//       const {
//           currentTarget: {value},
//       } = event;
//       setToDoError("");
//       setTodo(value);
//     };
//     const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         if(todo.length < 10){
//             return setToDoError("To do should be longer");
//         }
//         console.log("submit");
//     };


//     return (
//     <div>
//         <form onSubmit={onSubmit}>
//             <input onChange={onChange} value={todo} placeholder="Write a to do"></input>
//             <button>Add</button>
//             {toDoError !== "" ? toDoError : null}
//         </form>    
//     </div>
//     );
// }

// react-hook-form 사용 회원가입 폼
function ToDoList() {
    const { register, watch } = useForm();
    // register : onChagne, onBlur, ref 관련 wathc : 폼에 모든 값을 주시
    console.log(watch());
    return (
        <div>
            <form>          {/*es6 문법 toDo라는 이름의 함수로 반환하는 데이터 props 로 제공 */}
                <input {...register("email")} placeholder="Email"></input>
                <input {...register("firstName")} placeholder="First Name"></input>
                <input {...register("lastName")} placeholder="Last Name"></input>
                <input {...register("userName")} placeholder="Username"></input>
                <input {...register("password")} placeholder="Password"></input>
                <input {...register("passwordConfig")} placeholder="PasswordConfig"></input>
                <button>Add</button>
            </form>
        </div>
    );
}

export default ToDoList;