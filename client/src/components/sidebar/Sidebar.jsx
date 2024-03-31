import { useState , useEffect } from "react"
import "./sidebar.css"
import axios from "axios"
import { Link } from "react-router-dom";

axios.defaults.baseURL = 'http://localhost:8090/api/';


export default function Sidebar() {
  const [cats , setCats] = useState([]);

  useEffect(()=>{
    const getCats = async()=>{
      const res = await axios.get("/category/getAllCategories")
      console.log(res)
      setCats(res.data)
    }
    getCats()
  }, [])
  return (
    <div className="sidebar">

      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>  
        <img 
        src="https://www.shutterstock.com/image-vector/music-background-260nw-92575492.jpg" 
        alt=""
         />    
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident inventore excepturi tempora 
          necessitatibus molestiae at maiores officia! Soluta, aliquam itaque!
        </p>
       </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>  
        <ul className="sidebarList">

        {
          cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
            <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))
        }

          </ul>        
    </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
      </div>

    </div>
  )
}



