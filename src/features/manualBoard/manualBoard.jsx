import "./manualBoard.scss";
import { useEffect, useState, createRef } from "react";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import Lottie from "react-lottie";
import Footer from "../../reusables/footer/footer";
import animationData from "../../assets/duster.json";
import animationData1 from "../../assets/download.json";
import { useScreenshot } from "use-react-screenshot";
import TextField from "@mui/material/TextField";
import reactNotify from "../../utils/notifyFunctions";
import {
  BsBoxArrowDownLeft,
  BsBoxArrowUpRight,
  BsEraser,
} from "react-icons/bs";
import ToggleButton from "@mui/material/ToggleButton";
import { MdOutlineEdit, MdOutlineEditOff } from "react-icons/md";
import Popover from "@mui/material/Popover";

import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";

const defaultOptions = {
  loop: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const downloadOptions = {
  loop: true,
  animationData: animationData1,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function chalkboard() {
  $("#chalkboard").remove();
  $(".chalk").remove();
  $("#chalkBoard__canvas").prepend('<canvas id="chalkboard"></canvas>');
  $("#chalkBoard__canvas").prepend('<div className="chalk"></div>');
  $(".panel").css("display", "none");

  var canvas = document.getElementById("chalkboard");
  canvas.width = $(window).width();
  canvas.height = $(window).height();
  var ctx = canvas.getContext("2d");

  var width = canvas.width;
  var height = canvas.height;
  var mouseX = 0;
  var mouseY = 0;
  var mouseD = false;
  var eraser = false;
  var xLast = 0;
  var yLast = 0;
  var brushDiameter = 7;
  var eraserWidth = 50;
  var eraserHeight = 100;

  $("#chalkboard").css("cursor", "none");
  document.onselectstart = function () {
    return false;
  };
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.strokeStyle = "rgba(255,255,255,0.5)";
  ctx.lineWidth = brushDiameter;
  ctx.lineCap = "round";

  document.addEventListener(
    "touchmove",
    function (evt) {
      var touch = evt.touches[0];
      mouseX = touch.pageX;
      mouseY = touch.pageY;
      if (mouseY < height && mouseX < width) {
        evt.preventDefault();
        $(".chalk").css("left", mouseX + "px");
        $(".chalk").css("top", mouseY + "px");
        //$('.chalk').css('display', 'none');
        if (mouseD) {
          draw(mouseX, mouseY);
        }
      }
    },
    false
  );
  document.addEventListener(
    "touchstart",
    function (evt) {
      //evt.preventDefault();
      var touch = evt.touches[0];
      mouseD = true;
      mouseX = touch.pageX;
      mouseY = touch.pageY;
      xLast = mouseX;
      yLast = mouseY;
      draw(mouseX + 1, mouseY + 1);
    },
    false
  );
  document.addEventListener(
    "touchend",
    function (evt) {
      mouseD = false;
    },
    false
  );
  $("#chalkboard").css("cursor", "none");
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.strokeStyle = "rgba(255,255,255,0.5)";
  ctx.lineWidth = brushDiameter;
  ctx.lineCap = "round";

  $(document).on("mousemove", function (evt) {
    mouseX = evt.pageX;
    mouseY = evt.pageY;
    if (mouseY < height && mouseX < width) {
      $(".chalk").css("left", mouseX + 1.5 * brushDiameter + "px");
      $(".chalk").css("top", mouseY - 0.5 * brushDiameter + "px");
      if (mouseD) {
        if (eraser) {
          erase(mouseX, mouseY);
        } else {
          draw(mouseX, mouseY);
        }
      }
    } else {
      $(".chalk").css("top", height - 10);
    }
  });

  $(document).on("mousedown", function (evt) {
    mouseD = true;
    xLast = mouseX;
    yLast = mouseY;
    if (evt.button == 2) {
      erase(mouseX, mouseY);
      eraser = true;
      $(".chalk").addClass("eraser");
    } else {
      if (!$(".panel:hover").length === 0) {
        draw(mouseX + 1, mouseY + 1);
      }
    }
  });

  $(document).on("mouseup", function (evt) {
    mouseD = false;
    if (evt.button == 2) {
      eraser = false;
      $(".chalk").removeClass("eraser");
    }
  });

  $(document).on("keyup", function (evt) {
    if (evt.key == "space") {
      ctx.clearRect(0, 0, width, height);
      layPattern();
    }
  });

  $(document).on("keyup", function (evt) {
    if (evt.keyCode == 83) {
      // changeLink();
    }
  });

  document.oncontextmenu = function () {
    return false;
  };

  function draw(x, y) {
    ctx.strokeStyle = "rgba(255,255,255," + (0.4 + Math.random() * 0.2) + ")";
    ctx.beginPath();
    ctx.moveTo(xLast, yLast);
    ctx.lineTo(x, y);
    ctx.stroke();

    // Chalk Effect
    var length = Math.round(
      Math.sqrt(Math.pow(x - xLast, 2) + Math.pow(y - yLast, 2)) /
        (5 / brushDiameter)
    );
    var xUnit = (x - xLast) / length;
    var yUnit = (y - yLast) / length;
    for (var i = 0; i < length; i++) {
      var xCurrent = xLast + i * xUnit;
      var yCurrent = yLast + i * yUnit;
      var xRandom = xCurrent + (Math.random() - 0.5) * brushDiameter * 1.2;
      var yRandom = yCurrent + (Math.random() - 0.5) * brushDiameter * 1.2;
      ctx.clearRect(xRandom, yRandom, Math.random() * 2 + 2, Math.random() + 1);
    }

    xLast = x;
    yLast = y;
  }

  function erase(x, y) {
    ctx.clearRect(
      x - 0.5 * eraserWidth,
      y - 0.5 * eraserHeight,
      eraserWidth,
      eraserHeight
    );
  }

  function IEsave(ctximage) {
    setTimeout(function () {
      var win = window.open();
      $(win.document.body).html(
        '<img src="' + ctximage + '" name="chalkboard.png">'
      );
    }, 500);
  }

  $(window).on("resize", function () {
    // chalkboard();
  });
}

export default function ManualBoard() {
  const ref = createRef(null);
  const [viewBoardBg, setViewBoardBg] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [currentDay, setCurrentDay] = useState(0);
  const [isDusterPaused, setIsDusterPaused] = useState(true);
  const [isDusterStopped, setIsDusterStopped] = useState(true);
  const [isDownloadPaused, setIsDownloadPaused] = useState(true);
  const [isDownloadStopped, setIsDownloadStopped] = useState(true);
  const [isToolsVisible, setIsToolsVisible] = useState(false);
  const [person1Name, setPerson1Name] = useState("");
  const [person2Name, setPerson2Name] = useState("");
  const [person1NameError, setPerson1NameError] = useState(false);
  const [person2NameError, setPerson2NameError] = useState(false);
  const [person1NameValid, setPerson1NameValid] = useState(false);
  const [person2NameValid, setPerson2NameValid] = useState(false);
  const [name1edit, setName1edit] = useState(false);
  const [name2edit, setName2edit] = useState(false);
  const [hideAll, setHideAll] = useState(false);

  const [dvcInfoAnchorEl, setDvcInfoAnchorEl] = useState(null);
  const setAnchorNull = () => setDvcInfoAnchorEl(null);

  setTimeout(() => {
    setViewBoardBg(true);
  }, 1000);

  useEffect(() => {
    setCurrentDay(weekday[new Date().getDay()]);
    setCurrentDate(new Date().toLocaleDateString("en-IN"));
    setTimeout(() => {
      chalkboard();
    }, 1500);
  }, []);

  const downloadImage = () => {
    $("#tools").hide();
    $(".chalk").css("display", "none");
    htmlToImage
      .toCanvas(document.getElementById("schoolBg"))
      .then(function (canvas) {
        var img = canvas
          .toDataURL("image/png", 1.0)
          .replace("image/png", "image/octet-stream");
        var link = document.createElement("a");
        link.download = "flames-result.png";
        link.href = img;
        link.click();
      })
      .then(() => {
        setIsDownloadPaused(true);
        setIsDownloadStopped(true);
        $(".chalk").css("display", "block");
        $("#tools").show();
        setTimeout(() => {
          handleToolsVisible();
        }, 1000);
      });
  };

  const handleClearAll = () => {
    setIsDusterPaused(false);
    setIsDusterStopped(false);
    $(".chalk").css("display", "none");
    $("#chalkBoard__canvas").addClass("animate__wobble");
    setTimeout(() => {
      var canvas = document.getElementById("chalkboard");
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setTimeout(() => {
        $("#chalkBoard__canvas").removeClass("animate__wobble");
        $(".chalk").css("display", "block");
        setIsDusterPaused(true);
        setIsDusterStopped(true);
        handleToolsVisible();
      }, 1000);
    }, 700);
  };

  const handleToolsVisible = () => {
    if (isToolsVisible) {
      setIsToolsVisible(false);
      $(".chalk").css("display", "block");
    } else {
      setIsToolsVisible(true);
      $(".chalk").css("display", "none");
    }
  };

  const notifyNameError = (caseNo) => {
    var message = "";
    if (caseNo === 1) {
      message = "Name must be atleast 3 characters";
    } else if (caseNo === 2) {
      message = "Name must be alphanumeric";
    }
    reactNotify({
      type: "error",
      message: message,
      options: {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        position: "top-center",
      },
    });
  };

  const notifyNameSuccess = () => {
    reactNotify({
      type: "success",
      message: "Name is Vaild",
      options: {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        position: "top-center",
      },
    });
  };

  const handleNameChange = (e) => {
    let input = e.target.closest(".flames__input");
    if (input.id === "manualInput1") {
      setPerson1Name(e.target.value);
    } else if (input.id === "manualInput2") {
      setPerson2Name(e.target.value);
    }
  };

  const handleNameBlur = (e) => {
    let input = e.target.closest(".flames__input");
    if (input.id === "manualInput1") {
      if (person1Name.length < 3) {
        notifyNameError(1);
        setPerson1NameError(true);
      } else if (person1Name.match(/^[A-Za-z0-9]*$/) === null) {
        notifyNameError(2);
        setPerson1NameError(true);
        setPerson1NameValid(false);
      } else {
        setName1edit(false);
        setPerson1NameValid(true);
        notifyNameSuccess();
        setPerson1NameError(false);
      }
    } else if (input.id === "manualInput2") {
      if (person2Name.length < 3) {
        notifyNameError(1);
        setPerson2NameError(true);
      } else if (person2Name.match(/^[A-Za-z0-9]*$/) === null) {
        notifyNameError(2);
        setPerson2NameError(true);
        setPerson2NameValid(false);
      } else {
        setName2edit(false);
        setPerson2NameValid(true);
        notifyNameSuccess();
        setPerson2NameError(false);
      }
    }
  };

  const handleNameFocus = (e) => {
    let input = e.target.closest(".flames__input");
    if (input.id === "manualInput1") {
      setPerson1NameError(false);
    } else if (input.id === "manualInput2") {
      setPerson2NameError(false);
    }
  };

  const handleEditToggle = (e) => {
    let input = e.target.closest(".flames__input");
    if (input.id === "manualInput1") {
      setName1edit(!name1edit);
      if (name1edit) $("#person1_input").trigger("focus");
    } else if (input.id === "manualInput2") {
      setName2edit(!name2edit);
      if (name2edit) $("#person2_input").trigger("focus");
    }
  };

  const handleMouseEnterInput = (e) => {
    if (!name1edit || !name2edit) return;
    $(".chalk").hide();
  };

  const handleMouseLeaveInput = (e) => {
    $(".chalk").show();
  };

  const handleToggleBoard = (e) => {
    console.log("toggle", e.target.checked);
  };

  return (
    <>
      <div className="manualBoard__container" id="schoolBg" ref={ref}>
        {/* {viewBgCanvas && <div id="canvas-shapes"></div>} */}
        {viewBoardBg && (
          <div
            className="manualBoard__container__canvas animate__animated"
            id="chalkBoard__canvas"
          ></div>
        )}
        <div className="date__day__container">
          <div className="manualBoard__date__container">
            Date : {currentDate}
          </div>
          <div className="manualBoard__day__container">Day : {currentDay}</div>
        </div>
        <div className="falmes__text__container">
          <span className="flames__text">F</span>
          <span className="flames__text">L</span>
          <span className="flames__text">A</span>
          <span className="flames__text">M</span>
          <span className="flames__text">E</span>
          <span className="flames__text">S</span>
        </div>
        <div className="manualBoard__right__container"></div>
        <div
          className="downArrow"
          id="tools"
          onClick={handleToolsVisible}
          onMouseEnter={(e) => {
            $(".chalk").css("display", "none");
            setDvcInfoAnchorEl(e.currentTarget);
          }}
          onMouseLeave={() => {
            $(".chalk").css("display", "block");
            setAnchorNull();
          }}
        >
          {isToolsVisible ? (
            <BsBoxArrowUpRight size={20} />
          ) : (
            <BsBoxArrowDownLeft size={20} />
          )}
          {isToolsVisible && (
            <Popover
              className="manualBoard__right__container"
              id="simple-popover"
              open={!!dvcInfoAnchorEl}
              anchorEl={dvcInfoAnchorEl}
              onClose={setAnchorNull}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <div
                className="clean_all_icon"
                id="dusterIcon"
                onMouseEnter={() => {
                  setIsDusterPaused(false);
                  setIsDusterStopped(false);
                  $(".chalk").css("display", "none");
                }}
                onMouseLeave={() => {
                  setIsDusterPaused(true);
                  setIsDusterStopped(true);
                  $(".chalk").css("display", "block");
                }}
                onClick={handleClearAll}
              >
                <Lottie
                  options={defaultOptions}
                  height={100}
                  width={100}
                  isStopped={isDusterStopped}
                  isPaused={isDusterPaused}
                ></Lottie>
              </div>
              <div
                className="download_icon"
                id="downloadIcon"
                onMouseEnter={() => {
                  setIsDownloadPaused(false);
                  setIsDownloadStopped(false);
                  $(".chalk").css("display", "none");
                }}
                onMouseLeave={() => {
                  setIsDownloadPaused(true);
                  setIsDownloadStopped(true);
                  $(".chalk").css("display", "block");
                }}
                onClick={() => {
                  setIsDownloadPaused(false);
                  setIsDownloadStopped(false);
                  $(".chalk").css("display", "none");
                  setTimeout(() => {
                    downloadImage();
                  }, 1300);
                }}
              >
                <Lottie
                  options={downloadOptions}
                  height={100}
                  width={100}
                  isStopped={isDownloadStopped}
                  isPaused={isDownloadPaused}
                ></Lottie>
              </div>
              <div className="toggle__board">
                <ToggleButton
                  value="check"
                  selected={hideAll}
                  onChange={() => {
                    setHideAll(!selected);
                  }}
                />
              </div>
            </Popover>
          )}
        </div>
        <div className="flames__input__container">
          <div
            className={
              "flames__input" + ` ${person1NameValid ? "editInputOn" : ""}`
            }
            id="manualInput1"
            onMouseEnter={handleMouseEnterInput}
            onMouseLeave={handleMouseLeaveInput}
          >
            <div className="input__tools">
              {name1edit ? (
                <MdOutlineEdit
                  size={30}
                  className="input__edit__icon edit_on"
                  onClick={handleEditToggle}
                />
              ) : (
                <MdOutlineEditOff
                  size={30}
                  className="input__edit__icon"
                  onClick={handleEditToggle}
                />
              )}
              <BsEraser
                size={30}
                className="input__erase__icon"
                onClick={() => {
                  setPerson1Name("");
                  setPerson1NameValid(false);
                }}
              />
            </div>
            <TextField
              id="person1_input"
              className={
                "input__textField" +
                ` ${person1NameError ? "input_error" : ""} ${
                  person1NameValid ? "editInputOn" : ""
                }`
              }
              onDoubleClick={() => setName1edit(true)}
              value={person1Name || ""}
              label="Name 1"
              variant="standard"
              error={person1NameError}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              onFocus={handleNameFocus}
              disabled={!name1edit}
            />
          </div>
          <div
            className={
              "flames__input" + ` ${person2NameValid ? "editInputOn" : ""}`
            }
            id="manualInput2"
            onMouseEnter={handleMouseEnterInput}
            onMouseLeave={handleMouseLeaveInput}
          >
            <div className="input__tools">
              {name2edit ? (
                <MdOutlineEdit
                  size={30}
                  className="input__edit__icon edit_on"
                  onClick={handleEditToggle}
                />
              ) : (
                <MdOutlineEditOff
                  size={30}
                  className="input__edit__icon"
                  onClick={handleEditToggle}
                />
              )}
              <BsEraser
                size={30}
                className="input__erase__icon"
                onClick={() => {
                  setPerson2Name("");
                  setPerson2NameValid(false);
                }}
              />
            </div>
            <TextField
              id="person2_input"
              className={
                "input__textField" +
                ` ${person2NameError ? "input_error" : ""}${
                  person2NameValid ? "editInputOn" : ""
                }`
              }
              onDoubleClick={() => setName2edit(true)}
              value={person2Name || ""}
              label="Name 2"
              variant="standard"
              error={person2NameError}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              onFocus={handleNameFocus}
              disabled={!name2edit}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
