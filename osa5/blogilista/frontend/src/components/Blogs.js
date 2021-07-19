import Notification from './Notification'

const Blogs = (props) => {
    return (
      <>
        <h1>blogs</h1>
  
        <Notification notification={props.notification}/>
  
        <p>
          {props.user.username} logged in 
          <button onClick={props.logOut}>logout</button>
        </p>
  
        <ul style={{listStyle: "square"}}>
        { 
          props.blogs 
            ? props.blogs.map(b => <li key={b.id}><Blog blog={b}/></li>) 
            : <p>no blogs</p> 
        }
        </ul>
  
        <CreateBlog createBlog={props.createBlog}/>
      </>
    )
  }
  
  const Blog = (props) => {
    return (
      <>
        <p>{props.blog.title} {props.blog.author}</p>
      </>
    )
  }
  
  const CreateBlog = (props) => {
    return (
      <>
        <h2>create new</h2>
        <form id='createBlogForm' onSubmit={props.createBlog}>
          <label>
            title:
            <input type='text' name='title'></input>
          </label>
  
          <br></br>
  
          <label>
            author:
            <input type='text' name='author'></input>
          </label>
  
          <br></br>
  
          <label>
            url:
            <input type='text' name='url'></input>
          </label>
  
          <br></br>
  
          <button formAction='submit'>create</button>
        </form>
      </>
    )
  }

  
export default Blogs