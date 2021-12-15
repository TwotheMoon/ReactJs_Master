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

interface IForm {
    email: string
    firstName: string
    lastName: string
    userName: string
    password: string
    passwordConfig: string
    // required 가 아닌 항목은 ? 기입 해줘야함
}

// react-hook-form 사용 회원가입 폼
function ToDoList() {
    const { register, handleSubmit, formState: { errors } } = useForm<IForm>({
        defaultValues: {
            email: "@naver.com",
        }
    });

    // 데이터의 값이 유효할떄 할 일
    const onValid = (data: any) => {
        console.log(data);
    };
    console.log(errors);
    return (
        <div>
            <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onValid)}>          {/*es6 문법 toDo라는 이름의 함수로 반환하는 데이터 props 로 제공 */}
                <input
                    {...register("email", {
                        required: "이메일을 적어주세요",
                        pattern: {
                            value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                            message: "지원하지 않는 이메일 형식 이에요.",
                        },
                    })}
                    placeholder="Email"
                />
                <span>
                    {errors?.email?.message}
                </span>
                <input
                    {...register("firstName", { required: true })} placeholder="First Name"
                />
                <input
                    {...register("lastName", { required: true })} placeholder="Last Name"
                />
                <input
                    {...register("userName", { required: true, minLength: 10 })} placeholder="Username"
                />
                <input
                    {...register("password", { required: true, minLength: 5 })} placeholder="Password"
                />
                <input
                    {...register("passwordConfig", {
                        required: "Password is required",
                        minLength: {
                            value: 5,
                            message: "패스워드가 너무 짧아요"
                        }
                    })} placeholder="PasswordConfig"
                />
                <span>
                    {errors?.passwordConfig?.message}
                </span>

                <button>Add</button>
            </form>
        </div >
    );
}

export default ToDoList;