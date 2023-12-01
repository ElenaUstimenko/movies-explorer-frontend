import React from "react";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ children, condition, to }) => {
  return (
    <Route>
      {
        () => condition ? children : <Navigate to={to}/>
      }
    </Route>
  );
};

export { ProtectedRoute };