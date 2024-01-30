import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./PostGrid.css";

import { CSVLink } from "react-csv";

const PostGrid = () => {
  const [posts, setPosts] = useState([]);
  const [users, setusers] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);


  const data = [
    { firstname: "jill", lastname: "smith", age: 22 },
    { firstname: "david", lastname: "warner", age: 23 },
    { firstname: "nick", lastname: "james", age: 26 }
  ];
  const filteredData = posts.map(({ name, username, email, company }) => ({ name, username: username, email: email, city: company.city }));



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/usermessage"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userresponse = await axios.get(
          "http://localhost:8000/getUsers"
        );
        setusers(userresponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="post-grid">
      <h3>Employees Details</h3>

      {
        users.map((user) => (
          <div key={user._id} className="post-item">
            <p>
              <span className="post-label">UserName:</span> {user.firstname}
              <br />
              <span className="post-label">UserLastName:</span> {user.lastname}
              <br />
              <span className="post-label">User Age:</span> {user.age}
              <br />
            </p>
          </div>
        ))}


      <table width="100%">
        <tr>
          <td align="left">
            <a href="#" onClick={toggleCollapse}>
              {isCollapsed ? 'Show Table View' : 'Collapse Table view'}
            </a>
          </td>
          <td align="right">
            <CSVLink data={filteredData} filename={"test.csv"} >
              Download as CSV
            </CSVLink>
          </td></tr>
      </table>
      <table className={isCollapsed ? 'my-table collapsed' : 'table table-striped'}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Company Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
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
