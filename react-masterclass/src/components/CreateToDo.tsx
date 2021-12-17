import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
    toDo: string;
}

function CreateToDo() {
    const setToDos = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryState);
    const { register, handleSubmit, setValue } = useForm<IForm>();

    const handelValid = ({ toDo }: IForm) => {
        setToDos((oldToDos) => [{ text: toDo, id: Date.now(), category }, ...oldToDos]);  // 기존 배열에 폼에서 넘어온 데이터 더해서 새로운 배열 생성
        setValue("toDo", "");
    };

    return (
        <form onSubmit={handleSubmit(handelValid)}>
            <input {...register("toDo",
                {
                    required: "할 일을 적어주세요",
                }
            )}
                placeholder="Write a to do"></input>
            <button>Add</button>
        </form>
    );
}

export default CreateToDo;