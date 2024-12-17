import React from "react";

const SignInOutLayout = ({ children }) => {
  return (
    <div className="signinuplayout-container min-h-screen flex items-center justify-center bg-transparent overflow-hidden">
      <div className="layout-container m-6 max-w-xl w-full bg-gradient-to-b from-[#2F81AE33] to-[#00000033] p-8 rounded-badge shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default SignInOutLayout;
