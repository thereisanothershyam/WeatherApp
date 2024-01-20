import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PostGrid.css";

const PostGrid = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
    </div>
  );
};

export default PostGrid;
