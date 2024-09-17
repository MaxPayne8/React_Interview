import React from "react";

// Higher-Order Component
const withAuth = (WrappedComponent) => {
  return function EnhancedComponent(props) {
    const isAuthenticated = true; // Replace with real authentication logic

    if (!isAuthenticated) {
      return <div>Access Denied</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
