import { useEffect, useState } from "react"
import { addPost, updatePost } from "../api/PostApi";
const Form = ({posts, setPosts, updateDataApi, setUpdateDataApi}) => {
  const [addData, setAddData] = useState({
    title:"", 
    content:"",
  })
let isEmpty = Object.keys(updateDataApi).length ===0;
  useEffect(()=>{
    updateDataApi &&
      setAddData({
        title: updateDataApi.title || "", 
        content:updateDataApi.content || "",
      })
  },[updateDataApi])

  const handleInputChange = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setAddData((prev)=>{
      return {
        ...prev,
        [name]:value,
      };
    });
  };
  const addPostData = async ()=>{
    const res = await addPost(addData)
    console.log("res", res);
    if(res.status === 200){
      setPosts([...posts, res.data])

      console.log(res.data)
      setAddData({title:"", content:""});
    }
  }
const updatePostData = async()=>{
  const res = await updatePost(updateDataApi.id, addData)
  console.log(res)
  if(res.status === 200){
    setPosts((prev)=>{
      return prev.map((curElem)=>{
        return curElem.id === res.data.id ? res.data : curElem;
      })
    })
      setAddData({
        title:"", 
        content:"",
      })
      setUpdateDataApi({});
  }
}

  const handleForSubmit= (e)=>{
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if(action ==="Add"){

    addPostData();
    }else if(action==="Edit"){
      updatePostData();
    }
    
  }


  return (
    
   <form onSubmit={handleForSubmit}>
    <div>
    <label htmlFor="title"></label>
    <input
    type="text"
    autoComplete="off"
    id="title"
    name="title"
    placeholder="Add Title"
    value={addData.title}
    onChange={handleInputChange}/>
    </div>
    <div>
    <input
    type="text"
    autoComplete="off"
    id="content"
    name="content"
    placeholder="Add Post"
    value={addData.content}
    onChange={handleInputChange}/>

    </div>
    <button type="submit" value={isEmpty ?"Add":"Edit"}>
    {isEmpty ?"Add":"Edit"}
    </button>
    </form>
    
  )
}

export default Form
