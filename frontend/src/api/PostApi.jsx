import axios from "axios";
const api = axios.create({
  baseURL:'/blog', 
  withCredentials: true,
  
});

const auth = axios.create({
  baseURL:"/account", 
  withCredentials:true,
})

export const getPost = ()=>{
  return api.get("/all/");
}
export const deletePost = (id)=>{
  return api.delete(`/delete/${id}/`);
}
export const addPost = (post)=>{
  return api.post('/create/',post);
}
export const updatePost = (id, post) =>{
  return api.patch(`/update/${id}/`, post);
}

auth.interceptors.response.use(
    (res)=>res, 
    async (error) => {
        const original = error.config; 
        const onPublicPage = ["/register","/","/login"].includes(window.location.pathname) 
        if(onPublicPage){
          return Promise.reject(error);
        }
        if(error.response?.status === 401 && !original._retry){
            original._retry = true; 
            try{
                await axios.post(
                    "/account/refresh/",
                    {}, 
                    { withCredentials :true}
                );
                return auth(original);
            } catch{
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
); 
export default auth;
