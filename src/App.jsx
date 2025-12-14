import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./store/appStore.js";
import AuthListener from "./auth/AuthListener.jsx";

const App = () => {
  return (
    <Provider store={appStore}>
      <AuthListener />
      <Body />
    </Provider>
  );
};

export default App;
