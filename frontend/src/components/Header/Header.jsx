import { useEffect, useRef , useContext} from "react";
import logo from "../../assets/images/logo.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../../context/AuthContext";
const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Find a Doctor",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
const {user, role, token}  = useContext(authContext)
  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky_header");
      } else {
        headerRef.current.classList.remove("sticky_header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("show_menu");

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container flex items-center justify-between">
        {/* ==== logo === */}
        <div>
          <img src={logo} alt="Logo" className="w-16 h-16" />
        </div>

        {/*=== menu === */}
        <div
          className="navigation flex-grow text-center"
          ref={menuRef}
          onClick={toggleMenu}
        >
          <ul className="menu flex items-center justify-center gap-[2.7rem]">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  className={(navClass) =>
                    navClass.isActive
                      ? "text-primaryColor text-[16px] leading-7 font-[600]"
                      : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                  }
                >
                  {link.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/*=== nav right=== */}
        <div className="flex items-center gap-4">
        {
          token && user ? (
            <div>
          <Link 
          to={`${
            role === "doctor" 
            ? "/doctor/profile/me" 
            : "users/profile/me"
          } `}>
          
              <figure className="w-12 h-12 rounded-full cursor-pointer">
                <img
                  src={user?.photo}
                  alt="User"
                  className="w-full rounded-full"
                />
              </figure>
             
                   </Link>
            </div>
          ) : ( 
            <Link to="/login">
            <button className="bg-primaryColor py-2 px-5 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
              Login
            </button>
          </Link>
          )}
        
            
          

          

          <span className="md:hidden" onClick={toggleMenu}>
            <BiMenu className="w-6 h-6 cursor-pointer" />
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
