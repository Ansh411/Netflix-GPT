import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./store/appStore.js";
import AuthListener from "./auth/AuthListener.jsx";
import DesktopOnly from "./components/DesktopOnly.jsx";

const App = () => {
  return (
    <Provider store={appStore}>
      <DesktopOnly>
      <AuthListener />
      <Body />
      </DesktopOnly>
    </Provider>
  );
};

export default App;
