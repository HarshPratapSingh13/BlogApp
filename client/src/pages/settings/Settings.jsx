import Sidebar from "../../components/sidebar/Sidebar"
import "./settings.css"

export default function Settings() {
  return (
    <div className="settings">
      
      <div className="settingsWrapper">
            <div className="settingsTitle">

            <span className="settingsUpdateTitle">
                Update your account
            </span>
            <span className="settingsDeleteTitle">
                Delete Account
            </span>

            </div>

        <form action="" className="settingsForm">
             <label>Profile pictue</label>
             <div className="settingsPP">

                <img
                 src="https://domf5oio6qrcr.cloudfront.net/medialibrary/8718/brain-music-health-memory.jpg"
                 alt="" />
                <label htmlFor="fileInput">
                <i className="settingsPPIcon far fa-user-circle"></i>
                </label>
                <input type="file" id="fileInput" style={{display:"none"}} />
             </div>

        <label>Username</label>
        <input type="text" placeholder="harsh"/>
        <label>Email</label>
        <input type="email" placeholder="harsh@gmail.com"/>
        <label>Password</label>
        <input type="password" />
        <button className = "settingsSubmit">Update</button>

        </form>

      </div>
    <Sidebar/>
    </div>
  )
}
