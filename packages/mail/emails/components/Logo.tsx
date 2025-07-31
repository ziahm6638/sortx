import { Img } from "@react-email/components";
import React from "react";

export function Logo() {
  // Using PNG image for better email client compatibility
  // The image must be served from a public URL


  return (

    <Img
      src='https://www.sortx.co.uk/images/sortx-logo-mini.png'
      alt="SortX Logo"
    />

  );
}
