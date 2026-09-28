import LineChart from '../charts/LineChart';

export default function BalanceHistory({ data }) {
  return (
    <div className="panel h-full">
      <LineChart
        data={data.map((d) => ({ label: d.month, value: d.value }))}
        max={800}
        ticks={[0, 200, 400, 600, 800]}
        area
        verticalGrid
        format={(v) => `$${v}`}
        tickFormat={(v) => v}
      />
    </div>
  );
}
