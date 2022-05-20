import { NavLink } from 'react-router-dom';

const styles = {
  display: 'flex',
  justifyContent: 'space-around',
};

const activeStyle = ({ isActive }) => {
  return { color: isActive ? 'Red' : 'Green' };
};

const NavBar = () => {
  return (
    <>
      <div style={styles}>
        <NavLink to="/" style={activeStyle}>
          Home
        </NavLink>
        <NavLink to="books" style={activeStyle}>
          Books
        </NavLink>
        <NavLink to="addbook" style={activeStyle}>
          Add a Book
        </NavLink>
      </div>
      <hr />
    </>
  );
};
export default NavBar;
