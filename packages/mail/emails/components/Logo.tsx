import { Img } from "@react-email/components";
import React from "react";

export function Logo() {
  // Using PNG image for better email client compatibility
  // The image must be served from a public URL
  const baseUrl = process.env.PUBLIC_SITE_URL || 'http://localhost:5173';
  const logoUrl = `${baseUrl}/images/sortx-logo-mini.png`;

  return (
    <div style={{
      marginBottom: '20px',
      textAlign: 'center'
    }}>
      <Img
        src={logoUrl}
        alt="SortX Logo"
        width="150"
        height="75"
        style={{
          display: 'block',
          margin: '0 auto'
        }}
      />
    </div>
  );
}
