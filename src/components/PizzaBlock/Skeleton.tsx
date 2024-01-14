import * as React from "react";
import ContentLoader from "react-content-loader";

const Sceleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={1.9}
    width={280}
    height={430}
    viewBox="0 0 280 430"
    backgroundColor="#d9d9d9"
    foregroundColor="#a8a8a8">
    <circle cx="145" cy="120" r="110" />
    <rect x="27" y="258" rx="6" ry="6" width="233" height="22" />
    <rect x="27" y="298" rx="6" ry="6" width="233" height="63" />
    <rect x="27" y="380" rx="6" ry="6" width="72" height="29" />
    <rect x="140" y="380" rx="22" ry="22" width="120" height="29" />
  </ContentLoader>
);

export default Sceleton;
