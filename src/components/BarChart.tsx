import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { spendingData } from '../pages/SpendingData';
import { SetBackgroundColour, SetHoverBackgroundColour } from '@/BackgroundColours';
import { externalTooltipHandler } from '../ToolTip';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
);

ChartJS.defaults.font.size = 18;

export const BarChart = () => {

  const options = {
    responsive: true,
    scales: {
      x: {

        grid: {
          display: false
        }
      },
      y: {
        display: false,
        grid: {
          display: false
        }
      }
    },
    plugins: {
      tooltip: {
        enabled: false,
        external: externalTooltipHandler,
      }
    }
  };
  const data = {
    labels: spendingData.map(row => row.day),
    datasets: [
      {
        label: '$',
        data: spendingData.map(row => row.amount),
        backgroundColor: SetBackgroundColour(),
        borderRadius: 5,
        hoverBackgroundColor: SetHoverBackgroundColour(),
      }
    ],
  };

  return <Bar options={options} data={data} />;
}