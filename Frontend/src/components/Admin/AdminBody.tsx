import { Dashboard } from "./AdminNav";
import { TableAd } from "../User/TableAd";

export const AdminBody = () => {

  return (
    <>
      <div>
        <Dashboard />
      </div>
      <div className='mt-9'>
        <TableAd />
    </div>
    </>
  );
};
