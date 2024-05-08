import { Dashboard } from "./Dashboard";
import { TableAd } from "./TableAd";
import { Provider } from "react-redux";
import appStore from "../Redux/appStore";

export const AdminBody = () => {

  return (
    <>
    <Provider store={appStore}>
      <div>
        <Dashboard />
      </div>
      <div className='mt-9'>
        <TableAd />
    </div>
    </Provider>
    </>
  );
};
