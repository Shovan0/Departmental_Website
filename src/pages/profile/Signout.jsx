import React, { useEffect } from "react";

function Signout() {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="p-6 text-center text-xl font-bold">
      You have been signed out.
    </div>
  );
}

export default Signout;
