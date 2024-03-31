 import "./write.css"

export default function Write() {
  return (
    <div className="write">

    <img 
    className="writeImg"
    src="https://assets-global.website-files.com/616e938268c8f0a92cb2b540/616e938268c8f02b2db2c3ca_add%20music%20to%20video%20pink%20headphones.jpg" 
    alt="" />


       <form action="" className="writeForm">

    <div className="writeFormGroup">
    <label htmlFor="fileInput">
    <i className="writeIcon fas fa-plus"></i>
    </label>
    <input type="file" id="fileInput" style={{display:"none"}}/>
    <input type="text" placeholder="Title" className="writeInput" autoFocus={true}  />

    </div>

    <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>

       </form>
    </div>
  )
}
