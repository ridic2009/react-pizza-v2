import React from "react";
import ContentLoader from "react-content-loader";

export default function Loader() {
  return (
    <ContentLoader
      speed={2}
      width={280}
      height={466}
      viewBox="0 0 280 466"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="256" rx="12" ry="12" width="280" height="27" />
      <rect x="0" y="308" rx="12" ry="12" width="280" height="88" />
      <circle cx="141" cy="120" r="120" />
      <rect x="0" y="419" rx="12" ry="12" width="120" height="45" />
      <rect x="161" y="419" rx="18" ry="18" width="115" height="45" />
    </ContentLoader>
  );
}
