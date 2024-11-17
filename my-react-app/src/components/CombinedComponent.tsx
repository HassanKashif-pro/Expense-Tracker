import React from "react";

import Header from "@/components/Header";
import IloveBalls from "./side-Items";

export default function CombinedComponent() {
  return (
    <>
      <IloveBalls />
      <div style={{ marginLeft: "320px" }}>
        <Header />
      </div>
    </>
  );
}
