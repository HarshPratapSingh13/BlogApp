import { useLocation } from "react-router";
import "./singlePost.css"
import axios from "axios"
import {useEffect , useState} from "react"
import { Link } from "react-router-dom";

axios.defaults.baseURL = 'http://localhost:8090/api';

export default function SinglePost() {
    
    axios.defaults.baseURL = 'http://localhost:8090/api';

    const location = useLocation();
    console.log(location);
    const path = location.pathname.split("/")[2];
    const [post,setPost] = useState({});
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    useEffect(()=>{
        const getPost = async()=>{

            const res = await axios.get("/post/" + path);       
                 // <Link to={`/?cat=${c.name}`} className="link">

            //console.log(res.data)
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        };
        getPost()
       
    },[path]);

  return (
    <div className="singlePost">
       <div className="singlePostWrapper">
        {
            post.photo &&
            (
                <img 
                src={post.photo}
                 alt=""
                 className="singlePostImg" />
            )
        }
      
        <h1 className="singlePostTitle">
            {title}
      
            <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit" ></i>
            <i className="singlePostIcon far fa-trash-alt"></i>
            </div>
            </h1>
        <div className="singlePostInfo">
            <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b> {post.username}</b>
            </Link>
            </span>
            
            <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
            </span>
        </div>
        <p className="singlePostDesc">
            {desc}
        </p> 

       </div>
      
    </div>
  )
}
