import BarChart, { Legend } from '../charts/BarChart';

export default function WeeklyActivity({ data }) {
  const series = [
    { name: 'Deposit', color: '#1814F3', values: data.deposit },
    { name: 'Withdraw', color: '#16DBCC', values: data.withdraw },
  ];
  return (
    <div className="panel space-y-4">
      <Legend items={series} />
      <BarChart labels={data.days} series={series} max={500} ticks={[0, 100, 200, 300, 400, 500]} format={(v) => `$${v}`} />
    </div>
  );
}
