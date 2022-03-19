import React, { useEffect } from "react";

const Logout = () => {
 useEffect(() => {
  sessionStorage.removeItem('authtoken');
  sessionStorage.removeItem('uname');
}, []);
  return (
    <>
    <p>Hello!</p>
    </>
  );
};
export default Logout;

