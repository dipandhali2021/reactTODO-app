import React from 'react'

const TodoItem = ({title,discription,isCompleted,updateHandler,id,deleteHandler}) => {
  return (
    <div className="todo">
<div>
    <h4>{title}</h4>
    <p>{discription}</p>
</div>
<div>
<input type="checkbox" checked={isCompleted} onChange={()=>updateHandler(id)} />
<button onClick={()=>deleteHandler(id)} className='btn'>Delete</button>
</div>

    </div>
    
  )
}

export default TodoItem