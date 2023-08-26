import "./preLoader.scss";
import $ from "jquery";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";
import AnimatedFlames from "../../reusables/animatedFlames/animatedFlames";

function hidePreloaders() {
  $("#container").addClass("animate__animated animate__zoomOut");
  $("#copyright").addClass("animate__animated animate__backOutLeft");
  $("#version").addClass("animate__animated animate__backOutRight");
}

function PreLoader() {
  const history = useHistory();

  setTimeout(() => {
    hidePreloaders();
  }, 3500);

  setTimeout(() => {
    $("#preloader").css("animation", "zoomOut 1s forwards");
  }, 3800);

  setTimeout(() => {
    history.push("/loby");
  }, 4500);

  return (
    <div className="preloader" id="preloader">
      <div id="container" className="animate__animated">
        <AnimatedFlames />
      </div>
      <div className="cp-text animate__animated" id="copyright">
        © Copyright 2022 OS Labs.
      </div>
      <div className="ve-text animate__animated" id="version">
        Version 1.10
      </div>
    </div>
  );
}

export default withRouter(PreLoader);
