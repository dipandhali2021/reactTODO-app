import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import TodoItem from "../components/TodoItem";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh,setRefresh]= useState(false)


  const { isAuthenticated, setIsAuthenticated} = useContext(Context);
  if (!isAuthenticated) return <Navigate to={"/login"} />;
  const updateHandler=async (id)=>{
    try {
      const {data}= await axios.put(`${server}/task/${id}`,{},{withCredentials:true})

      toast.success(data.message);
      setRefresh((prev)=>!prev)
    } catch (error) {
      toast.error(error.response.data.message);
      
    }
  }
  const deleteHandler=async(id)=>{ 
    try {
      const {data}= await axios.delete(`${server}/task/${id}`,{withCredentials:true})

      toast.success(data.message);
      setRefresh((prev)=>!prev)
    } catch (error) {
      toast.error(error.response.data.message);
      
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/task/new`,
        {
          title,
          discription,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setTitle("");
      setDiscription("");
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev)=>!prev)
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/task/my`, {
        withCredentials: true,
      })
      .then((res) => {
        let Task = res.data.tasks;
        setTasks(Task);
        console.log(res.data.tasks);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, [refresh]);

  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={submitHandler}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Title"
              required
            />
            <input
              value={discription}
              onChange={(e) => setDiscription(e.target.value)}
              type="text"
              placeholder="Description"
              required
            />

            <button disabled={loading} type="submit">
              Add Task
            </button>
          </form>
        </section>
      </div>

      <section className="todosContainer">
        {tasks.map((i) => (
          <TodoItem title={i.title} discription={i.discription} isCompleted={i.isCompleted} updateHandler={updateHandler} deleteHandler={deleteHandler} id={i._id} key={i._id}  />
        ))}
      </section>
    </div>
  );
};

export default Home;
