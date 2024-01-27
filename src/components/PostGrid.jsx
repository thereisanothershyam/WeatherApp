import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PostGrid.css";

const PostGrid = () => {
  const [posts, setPosts] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/message"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="post-grid">
      <h3>Employees Details</h3>
      
      {posts.map((post) => (
        <div key={post.id} className="post-item">
          <p>
            <span className="post-label">UserName:</span> {post.username}
            <br />
            <span className="post-label">Email:</span> {post.email}
            <br />
            <span className="post-label">Company:</span> {post.company.name}
            <br />
          </p>
        </div>
      ))}
    
      <a href="#" onClick={toggleCollapse}>
        {isCollapsed ? 'Show Table' : 'Collapse Table'}
      </a>
       <table className={isCollapsed ? 'my-table collapsed' : 'my-table'}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Company Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post,index) => (
          <tr key={post.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
            <td>{post.username}</td>
            <td>{post.company.name}</td>
            <td>{post.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    
    
    
  );
};

export default PostGrid;
