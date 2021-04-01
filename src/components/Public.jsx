import React, { useState, useEffect } from "react";

import UserService from "../services/api/user.service";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);
  const client_id = process.env.REACT_APP_CLIENT_ID;
  const api_key = process.env.REACT_APP_API_KEY;
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content.message}</h3>
        Using .env for variables
        <p>Client ID: {client_id}</p>
        <p>API Key: {api_key}</p>
      </header>
    </div>
  );
};

export default Home;
