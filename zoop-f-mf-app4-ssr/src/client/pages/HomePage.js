import React from "react";

function HomePage() {
  return (
    <div>
      <div>I'm the home Test component</div>
      <button onClick={() => console.log("Hi")}>Press me</button>
    </div>
  );
}

export default {
  component: HomePage,
};
