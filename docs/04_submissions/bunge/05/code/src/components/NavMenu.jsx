import React from "react";
import { useSearchParams } from "react-router-dom";
import videoData from "./DataCollection";
import "./NavMenu.css";

const uniqueCategories = ["Alle", ...new Set(videoData.flatMap(video => video.category))];

const NavMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilter = (category) => {
    if (category === "Alle") {
      setSearchParams({});
    } else {
      setSearchParams({category});
    }
  };

  return (
    <div className="nav-container">
      {uniqueCategories.map((category, index) => (
        <div 
          key={index} 
          className="nav-item" 
          onClick={() => handleFilter(category)}
          style={{cursor:"pointer"}}
        >
          <h2>{category}</h2>
        </div>
      ))}
    </div>
  );
};

export default NavMenu;
