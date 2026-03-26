import { useEffect } from "react";
import { getPost, deletePost } from "../api/PostApi";
import { useState } from "react";
import "../App.css";
import Form from "./Form";

const Posts = () => {

  const [posts, setPosts] = useState([])
  const [updateDataApi, setUpdateDataApi] = useState({})
  const getPostData=async ()=>{
      const res = await getPost();
    console.log(res.data);
      setPosts(res.data)
  };
  useEffect(() => {
    getPostData();
    
  }, [])

  const handledeletepost = async (id)=>{
    const res = await deletePost(id)
    if(res.status === 204){
      const newUpdatedPosts = posts.filter((currPost)=>{
        return currPost.id != id; 

      });
      setPosts(newUpdatedPosts);
    }

  }
 const  handleUpdatepost = (curElem)=>{
   setUpdateDataApi(curElem);

 }
  return (
    <>
    <section className="section-form">
    <Form posts={posts} setPosts ={setPosts} updateDataApi={updateDataApi} setUpdateDataApi={setUpdateDataApi}/>

    </section>
    <section className="section-post">
    <ol>
    {
      posts.map((curElem)=>{
        const {id, title, content} = curElem;
        return <li key={id}>

          <p>Title:{title}</p>
          <p>Content:{content}</p>

         <button className="btn-update"onClick={()=>{handleUpdatepost(curElem)}}>
          Edit
          </button>
          <button className="btn-delete" onClick={()=>handledeletepost(id)}>Delete</button>
          </li>

      })
    }
      
    </ol>
    </section>
    </>
  )
}

export default Posts
