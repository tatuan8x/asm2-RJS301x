import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
  // khai báo state ban đầu
  const [isScroll, setIsScroll] = useState(false);

  // bắt sự kiện scroll của window
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    // thêm event listener cho window khi scroll
    window.addEventListener("scroll", handleScroll);

    // xóa event listener khi unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // biến đổi màu background
  const navbarClassName = isScroll
    ? `${"navbarContainer"} 
       ${"navbarBlack"}`
    : "navbarContainer";

  return (
    <div className={navbarClassName}>
      <Link to="/" className="navbarAppName">
        Movie App
      </Link>
      <Link to="/search">
        <FontAwesomeIcon className="searchIcon" icon={faSearch} />
      </Link>
    </div>
  );
}

export default Navbar;
