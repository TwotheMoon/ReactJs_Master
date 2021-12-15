import { useForm } from "react-hook-form";

interface IForm {
    toDo: string;
}

function ToDoList() {
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const handelValid = (data: IForm) => {
        console.log("할 일 추가", data.toDo);
        setValue("toDo", "");
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handelValid)}>
                <input {...register("toDo",
                    {
                        required: "할 일을 적어주세요",
                    }
                )}
                    placeholder="Write a to do"></input>
                <button>Add</button>
            </form>
        </div>
    );
}

export default ToDoList;