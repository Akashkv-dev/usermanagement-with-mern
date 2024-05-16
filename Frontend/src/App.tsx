import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminRoute from "./Routes/AdminRoute";
import UserRoute from "./Routes/UserRoute";
import appStore from "./Redux/appStore";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<UserRoute />} />
            <Route path="/admin/*" element={<AdminRoute />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
