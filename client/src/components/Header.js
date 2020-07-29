import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header">
      <h1 className="title">
        <Link to="/">Graphql App</Link>
      </h1>
      <div className="links">
        <Link to="/add">Add Product</Link>
        <Link to="/">Products List</Link>
      </div>
    </div>
  );
};

export default Header;
