import { Dashboard } from "./Dashboard";
import { TableAd } from "./TableAd";

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
