import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import "animate.css";
import toast, { Toaster } from "react-hot-toast";
import ReactDOM from "react-dom/client";

// Pages
import PreLoader from "./features/preloader/preLoader.jsx";
import FlamesMain from "./features/flamesMain/flamesMain.jsx";
import MobileViewError from "./features/mobileViewError/mobileViewError.jsx";
import NotFound from "./features/notFound/notFound";
import ManualBoard from "./features/manualBoard/manualBoard";
import LobyMain from "./features/lobyMain/lobyMain";

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

function App() {
  if (isMobile) {
    return (
      <div className="App">
        <MobileViewError />
      </div>
    );
  } else {
    return (
      <Router forceRefresh={true}>
        <div className="App">
          <Switch>
            <Route path="/manual" component={ManualBoard} exact />
            <Route path="/flames" component={FlamesMain} exact />
            <Route path="/loby" component={LobyMain} exact />
            <Route path="/" component={PreLoader} exact />
            <Route path="*" component={NotFound} />
          </Switch>
          <Toaster position="top-right" reverseOrder={false} />
        </div>
      </Router>
    );
  }
}

export default App;
