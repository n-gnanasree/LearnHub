import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from "react";

import "./App.css";
import Home from "./components/common/Home";
import Login from "./components/common/Login";
import Register from "./components/common/Register";
import Dashboard from "./components/common/Dashboard";
import CourseContent from "./components/user/student/CourseContent";
import About from "./components/common/About";
import AdminHome from "./components/admin/AdminHome";
import AllCourses from "./components/admin/AllCourses";
import AllUsers from "./components/admin/AllUsers";

export const UserContext = createContext();

function App() {
  const date = new Date().getFullYear();
  const [userData, setUserData] = useState();
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const getData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user !== undefined) {
        setUserData(user);
        setUserLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, userLoggedIn }}>
      <div className="App">
        <Router>
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {userLoggedIn && (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route
                    path="/courseSection/:courseId/:courseTitle"
                    element={<CourseContent />}
                  />

                  {/* Admin-only routes */}
                  {userData?.type === "admin" && (
                    <>
                      <Route path="/admin" element={<AdminHome />} />
                      <Route
                        path="/admin/all-courses"
                        element={<AllCourses />}
                      />
                      <Route path="/admin/all-users" element={<AllUsers />} />
                    </>
                  )}
                </>
              )}
            </Routes>
          </div>

          <footer className="bg-light text-center text-lg-start">
            <div className="text-center p-3">© {date} Copyright: Study App</div>
          </footer>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
