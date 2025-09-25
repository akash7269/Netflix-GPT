import { Provider } from "react-redux";
import BodyA from "./components/BodyA";
import appStore from "./utills/appStore";


function App() {
    return(<Provider store={appStore}><BodyA/></Provider>);
}

export default App;