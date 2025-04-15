import KpiCards from "../../Components/KpiCards";
import { MdEmojiEvents } from "react-icons/md";
import { FaUserGroup, FaBuilding } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

import BarChart from '../../Components/ChartsComponents/BarChart';
import DoughnutChart from '../../Components/ChartsComponents/DoughnutChart';

const OrganiserDashboard = () => {
  return (
    <>
      <div className="kpi-cards-div w-full rounded-md py-2 flex justify-between gap-x-4">
        <KpiCards
          title="Total Events Done"
          description="23"
          icon={<MdEmojiEvents />}
        />
        <KpiCards
          title="Total Members"
          description="17"
          icon={<FaUserGroup />}
        />
        <KpiCards
          title="Department"
          description="Computer"
          icon={<FaBuilding />}
        />
        <KpiCards
          title="Club Coordinator"
          description="Mr X"
          icon={<FaUser/>}
        />
      </div>

      <div className="chartdiv w-full rounded-md flex gap-x-4 mt-2">
        <BarChart />
        <DoughnutChart />
      </div>
    </>
  );
};

export default OrganiserDashboard;
