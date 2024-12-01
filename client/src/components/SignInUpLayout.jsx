import React from "react";

const SignInOutLayout = ({ children }) => {
  return (
    <div className="signinuplayout-container min-h-screen flex items-center justify-center bg-transparent overflow-hidden">
      <div className="layout-container m-8 max-w-2xl w-full bg-gradient-to-b from-[#2F81AE33] to-[#00000033] p-8 rounded-badge shadow-lg overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default SignInOutLayout;
