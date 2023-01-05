import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { IMontlhyApplications } from "../features/job/allJobSlice";

const BarChartComponent = ({ data }: { data: IMontlhyApplications[] }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="10 10 " />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#5bbba9" barSize={75} />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default BarChartComponent;