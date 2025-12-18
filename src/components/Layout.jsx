import Header from "./Header.jsx";
import Snowfall from "react-snowfall";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-black to-black relative">
      <Snowfall color="white" snowflakeCount={230} />
      <Header />
      {children}
    </div>
  );
};

export default Layout;
