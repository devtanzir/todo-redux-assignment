import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addTodo, deleteTodo, toggleTodo } from "./store/features/todoSlice";
import BarIcon from "./assets/bars-icon.svg";
import { useState } from "react";
import { createId } from "./utils/utils";
import DottedSeparator from "./components/dotted-separator";
import Swal from "sweetalert2";
import { FaTrashCan } from "react-icons/fa6";
import { MdPendingActions } from "react-icons/md";
import { GiSandsOfTime } from "react-icons/gi";
import { AiOutlineFileDone } from "react-icons/ai";

function App() {
  const initialState = {
    task: "",
    status: "PENDING",
  };
  const [formData, setFormData] = useState({ ...initialState });
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todo);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.task) return;
    dispatch(
      addTodo({
        id: createId(),
        name: formData.task,
        status: formData.status,
        completed: false,
      })
    );
    setFormData({ ...initialState });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTodo(id));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <>
      <div className="py-5 sm:pt-7 sm:pb-[30px] max-w-[405px] sm:max-w-[805px]         my-[137px] mx-auto bg-white rounded-[7px] shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="h-[52px] px-5 sm:px-[25px] relative">
            <img
              src={BarIcon}
              alt="icon"
              className="top-1/2 absolute translate-x-[17px] -translate-y-1/2"
            />
            <input
              type="text"
              onChange={handleChange}
              value={formData.task}
              required
              name="task"
              placeholder="Add a new task"
              className="h-full w-full outline-none text-lg rounded-[5px] pr-5 pl-[56px] border border-[#999] focus:pl-[52px] focus:border-2 focus:border-[#3c87ff] active:pl-[52px] active:border-2 active:border-[#3c87ff] placeholder:text-[#bfbfbf]"
            />
          </div>
          <div className="flex justify-between items-center gap-4 px-5 sm:px-[25px] py-3">
            <select
              className="border border-gray-400 rounded py-2 px-4"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In progress</option>
              <option value="DONE">Completed</option>
            </select>
            <div className="flex-1">
              <button
                type="submit"
                style={{
                  background:
                    "linear-gradient(135deg, #1798fb 0%, #2D5CFE 100%)",
                }}
                className="border-none w-full opacity-60 outline-none text-white cursor-pointer text-[13px] py-2.5 px-4 rounded tracking-[0.3px]  transition-transform duration-200 ease-linear"
              >
                Create
              </button>
            </div>
          </div>
        </form>
        <DottedSeparator className={"py-5 px-5"} />
        <ul className="px-5 flex flex-col gap-3">
          {todos.length > 0 ? (
            todos?.map((item) => (
              <li
                className={`flex justify-between items-center border border-slate-200 shadow rounded px-4 py-2 ${
                  item.status == "PENDING" && "bg-sky-100"
                } ${item.status == "IN_PROGRESS" && "bg-yellow-100"} ${
                  item.status == "DONE" && "bg-green-100"
                }`}
                key={item.id}
              >
                <span>{item.name}</span>{" "}
                <div className="flex gap-2">
                  {item.status !== "PENDING" && (
                    <button
                      title="pending"
                      className="bg-sky-400 hover:bg-sky-500 transition ease-linear p-2 rounded font-bold"
                      onClick={() =>
                        dispatch(toggleTodo({ id: item.id, status: "PENDING" }))
                      }
                    >
                      <MdPendingActions className="text-white" />
                    </button>
                  )}
                  {item.status !== "IN_PROGRESS" && (
                    <button
                      title="in progress"
                      className="bg-yellow-400 hover:bg-yellow-500 transition ease-linear p-2 rounded font-bold"
                      onClick={() =>
                        dispatch(
                          toggleTodo({ id: item.id, status: "IN_PROGRESS" })
                        )
                      }
                    >
                      <GiSandsOfTime />
                    </button>
                  )}
                  {item.status !== "DONE" && (
                    <button
                      title="done"
                      className="bg-green-400 hover:bg-green-500 transition ease-linear p-2 rounded font-bold"
                      onClick={() =>
                        dispatch(toggleTodo({ id: item.id, status: "DONE" }))
                      }
                    >
                      <AiOutlineFileDone />
                    </button>
                  )}

                  <button
                    title="delete"
                    className="bg-red-400 hover:bg-red-500 transition ease-linear p-2 rounded font-bold"
                    onClick={() => handleDelete(item.id)}
                  >
                    <FaTrashCan className="text-white" />
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>There is no tasks</p>
          )}
        </ul>
      </div>
    </>
  );
}

export default App;
