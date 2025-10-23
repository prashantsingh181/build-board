import React from "react";
import Ping from "@/components/Ping";

async function View() {
  const totalViews = 5;
  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">
          {totalViews} {totalViews > 1 ? "views" : "view"}
        </span>
      </p>
    </div>
  );
}

export default View;
