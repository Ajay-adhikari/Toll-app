import React from "react";
import "./navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import TollIcon from "@mui/icons-material/Toll";

const Navbar = () => {
  return (
    <div className="new_nav">
      <div className="nav_data">
        <div className="not">
          <p style={{ fontSize: "35px" }}>
            <TollIcon /> Toll Calculator{" "}
          </p>
        </div>
        <div className="left_data">
          {/* <p style={{fontSize: "35px"}}><TollIcon/> Toll Calculator </p> */}

          <p>Developers Detail</p>
          <p>community</p>
        </div>
        <div className="right_data">
          <p>
            <input type="search" name="" id="" placeholder="Any help" />{" "}
            <SearchIcon />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
