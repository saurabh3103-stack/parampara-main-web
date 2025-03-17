import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const CartLink = () => {
  const location = useLocation(); // Get the current route
  const isEStore = location.pathname.includes("e-store"); // Check if "e-store" is in the path

  return (
    <Link to={isEStore ? "/e-store/cart" : "/cart"}>
      <i className="fa fa-cart-shopping"></i>
    </Link>
  );
};

export default CartLink;
