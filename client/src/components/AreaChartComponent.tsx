import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { IMontlhyApplications } from "../features/job/allJobSlice";

const AreaChartComponent = ({ data }: { data: IMontlhyApplications[] }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type="monotone" dataKey="count" stroke="#81a0d3" fill="#81a0d3" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default AreaChartComponent;
