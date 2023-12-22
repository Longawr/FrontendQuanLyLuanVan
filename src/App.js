import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import "./styles/sb-admin-2.min.css";

import { PrivateRoutes, AdminRoutes, NotFound } from "./components";
import { Login } from "./pages/Login";
import {
  Student,
  Group,
  GroupDetails,
  Info,
  Plagiarism,
} from "./pages/Student";
import {
  AddStudent,
  AddTeacher,
  Admin,
  AdStudent,
  AdTeacher,
  EditStudent,
  EditTeacher,
} from "./pages/Admin";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* User path */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Student />}>
            <Route path="info" element={<Info />} />
            <Route path="group">
              <Route index element={<Group />} />
              <Route path=":groupID">
                <Route index element={<GroupDetails />} />
                <Route path="file/:fileID" element={<Plagiarism />} />
              </Route>
            </Route>
            {/* Catch all unknown paths */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

        {/* Admin path */}
        <Route element={<AdminRoutes />}>
          <Route path="/admin" element={<Admin />}>
            <Route path="student">
              <Route index element={<AdStudent />} />
              <Route path="add" element={<AddStudent />} />
              <Route path="edit/:stdId" element={<EditStudent />} />
            </Route>
            <Route path="teacher">
              <Route index element={<AdTeacher />} />
              <Route path="add" element={<AddTeacher />} />
              <Route path="edit/:tchId" element={<EditTeacher />} />
            </Route>
            {/* Catch all unknown paths */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

        {/* Catch all unknown paths at the top level */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
