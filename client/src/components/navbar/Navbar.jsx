import React, { useEffect, useState } from "react";
import { FaShoppingBasket, FaHome, FaBoxOpen, FaEnvelope, FaUserCircle, FaTachometerAlt } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminOnlyLink } from "../adminRoute/AdminRoute";
// firebase
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { removeActiveUser, setActiveUser } from "../../redux/slice/authSlice";
import { calculateSubtotal, calculateTotalQuantity } from "../../redux/slice/cartSlice";
import { formatPrice } from "../../utils/formatPrice";

const Navbar = () => {
  const { isUserLoggedIn, userName } = useSelector((store) => store.auth);
  const { totalAmount, totalQuantity, cartItems } = useSelector((store) => store.cart);
  const [displayName, setDisplayName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //* Monitor currently signed USER
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (displayName == null) {
          setDisplayName(user.email.split("@")[0]);
        }
        dispatch(
          setActiveUser({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userId: user.uid,
          })
        );
      } else {
        setDisplayName("");
        dispatch(removeActiveUser());
      }
    });
  }, []);

  function logOutUser() {
    signOut(auth)
      .then(() => {
        toast.success("User Signed Out ");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.code, error.message);
      });
  }
  
  const activeStyle = {
    borderBottom: "2px solid #FFD700",
    color: "#FFD700",
  };

  useEffect(() => {
    dispatch(calculateTotalQuantity());
    dispatch(calculateSubtotal());
  }, [dispatch, cartItems]);

  return (
    <>
      <nav className="h-[8vh] bg-gradient-to-r from-blue-800 to-blue-900 shadow-xl">
        <div className="navbar w-full md:w-9/12 mx-auto flex items-center justify-between">
          <section className="md:gap-4">
            <Link to="/" className="btn btn-ghost">
              <h1 className="logo text-white text-lg md:text-3xl font-bold">
                <span className="text-yellow-300">Home</span>Appliance
              </h1>
            </Link>
          </section>
          <div>
            <ul className="flex items-center gap-x-8">
              <li className="hidden lg:block text-white text-xs md:text-lg hover:text-yellow-300 transition-colors duration-200">
                <NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : null)} end>
                  <div className="flex items-center gap-2">
                    <FaHome /> Home
                  </div>
                </NavLink>
              </li>
              <li className="hidden lg:block text-white text-xs md:text-lg hover:text-yellow-300 transition-colors duration-200">
                <NavLink to="/all" style={({ isActive }) => (isActive ? activeStyle : null)}>
                  <div className="flex items-center gap-2">
                    <FaBoxOpen /> All Appliances
                  </div>
                </NavLink>
              </li>
              <li className="hidden lg:block text-white text-xs md:text-lg hover:text-yellow-300 transition-colors duration-200">
                <NavLink to="/contact" style={({ isActive }) => (isActive ? activeStyle : null)}>
                  <div className="flex items-center gap-2">
                    <FaEnvelope /> Contact Us
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-3">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle bg-blue-700 hover:bg-blue-600 transition-colors duration-200">
                <div className="indicator">
                  <FaShoppingBasket size={22} color="white" />
                  <span className="badge badge-md badge-warning text-black font-semibold indicator-item">{totalQuantity}</span>
                </div>
              </label>
              <div
                tabIndex={0}
                className="mt-3 card card-compact dropdown-content w-64 bg-white rounded-lg shadow-2xl border border-gray-200"
              >
                <div className="card-body">
                  <span className="font-bold text-lg text-blue-800">{totalQuantity} Items</span>
                  <span className="text-gray-700">Subtotal: <span className="font-semibold text-blue-800">{formatPrice(totalAmount)}</span></span>
                  <div className="card-actions mt-2">
                    <Link to="/cart" className="btn bg-blue-700 hover:bg-blue-600 text-white btn-block">
                      View cart
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle bg-blue-700 hover:bg-blue-600 transition-colors duration-200">
                <div className="rounded-full">
                  <FaUserCircle size={22} color="white" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow-2xl bg-white rounded-lg border border-gray-200 w-56"
              >
                {userName && (
                  <li className="bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-t-lg">
                    <p className="block py-2">
                      Welcome, <span className="font-bold">{userName}</span>
                    </p>
                  </li>
                )}
                <div className="block lg:hidden">
                  <li>
                    <Link to="/" className="text-gray-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2">
                      <FaHome size={16} /> Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/all" className="text-gray-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2">
                      <FaBoxOpen size={16} /> All Appliances
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-gray-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2">
                      <FaEnvelope size={16} /> Contact Us
                    </Link>
                  </li>
                </div>

                {isUserLoggedIn ? (
                  <div>
                    <li>
                      <Link to="/my-orders" className="text-gray-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        My Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="text-red-600 hover:bg-red-50 flex items-center gap-2"
                        onClick={logOutUser}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </Link>
                    </li>
                  </div>
                ) : (
                  <li>
                    <label htmlFor="my-modal-4" className="modal-button text-blue-700 hover:bg-blue-50 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Login
                    </label>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <AdminOnlyLink>
        <div className="bg-gradient-to-r from-indigo-800 to-indigo-900 text-white py-2 px-4 flex items-center justify-center shadow-md">
          <div className="flex items-center">
            <span className="font-semibold mr-2">ADMIN MODE</span>
            <div className="h-4 w-4 rounded-full bg-green-400 animate-pulse"></div>
          </div>
          <Link to="/admin/home" className="ml-6 bg-indigo-600 hover:bg-indigo-500 text-white py-1 px-4 rounded-md shadow flex items-center gap-2 transition-all duration-200 hover:shadow-lg">
            <FaTachometerAlt size={14} />
            DASHBOARD
          </Link>
        </div>
      </AdminOnlyLink>
    </>
  );
};

export default Navbar;