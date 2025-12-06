import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <h2>Header</h2>
      <nav>
        <Link to="/">Home |</Link>
        <Link to="signin">Sign In |</Link>
        <Link to="signup">Sign Up | </Link>
        <Link to="addEvent">Add Event |</Link>
      </nav>
    </div>
  );
};

export default Header;
