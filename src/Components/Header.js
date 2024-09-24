import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-slate-800 text-slate-200 p-2">
      <ul className="flex gap-10 mx-2">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/timers">
          <li>Timers</li>
        </Link>
        <Link to="/todo">
          <li>Todo-List</li>
        </Link>
        <Link to="/todo-redux">
          <li>Todo-Redux</li>
        </Link>
        <Link to="/custom-form">
          <li>Custom Hook Form</li>
        </Link>
        <Link to="/carousel">
          <li>Carousel</li>
        </Link>
        <Link to="/practice">
          <li>Practice</li>
        </Link>
        <Link to="/hoc-comp-dashboard">
          <li>HOC_AUTH</li>
        </Link>
      </ul>
    </div>
  );
};

export default Header;
