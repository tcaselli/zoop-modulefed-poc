import React from "react";

function NotFoundPage({ staticContext = {} }) {
  // Default because it does not exist on the browser
  staticContext.notFound = true;
  return (
    <div>
      <div>404 Not Found</div>
    </div>
  );
}

export default {
  component: NotFoundPage,
};
