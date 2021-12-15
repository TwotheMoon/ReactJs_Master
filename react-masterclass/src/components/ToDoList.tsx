import { useForm } from "react-hook-form";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

interface IForm {
    toDo: string;
}
// toDos[] 데이터 타입 정의
interface IToDo {
    text: string,
    id: number,
    category: "TO_DO" | "DOING" | "DONE",  // 모든 string 타입이 아닌 세가지 타입중 하나
}

const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});

function ToDoList() {
    const [toDos, setToDos] = useRecoilState(toDoState);  // useState 처럼 아래 두가지 함수를 합친것
    //const toDos = useRecoilValue(toDoState);      // atom 값 사용  // 현재 빈배열
    //const setToDos = useSetRecoilState(toDoState); // atom 값 수정  // 데이터가 있는 배열 수정
    const { register, handleSubmit, setValue } = useForm<IForm>();

    const handelValid = ({ toDo }: IForm) => {
        setToDos((oldToDos) => [{ text: toDo, id: Date.now(), category: "TO_DO" }, ...oldToDos]);  // 기존 배열에 폼에서 넘어온 데이터 더해서 새로운 배열 생성
        setValue("toDo", "");
    };
    console.log(toDos);

    return (
        <div>
            <h1>To Dos</h1>
            <hr />
            <form onSubmit={handleSubmit(handelValid)}>
                <input {...register("toDo",
                    {
                        required: "할 일을 적어주세요",
                    }
                )}
                    placeholder="Write a to do"></input>
                <button>Add</button>
            </form>
            <ul>
                {toDos.map((toDo) =>
                    <li key={toDo.id}>
                        {toDo.text}
                    </li>
                )}
            </ul>
        </div>
    );
}

export default ToDoList;