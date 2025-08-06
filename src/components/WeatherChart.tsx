import React, { useContext } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Legend,
  ChartOptions,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Context } from 'chartjs-plugin-datalabels';
import { Line } from 'react-chartjs-2';
import { HourlyForecast } from '../api/weather';
import { WeatherContext } from '../contexts/WeatherContext';
import celsiusToFahrenheit from '../utils/celsiusToFahrenheit';
import formatTimeIntl from '../utils/formatTimeIntl';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartDataLabels,
  Filler,
  Legend
);

interface WeatherChartProps {
  selectedTime: string;
  hourlyData: HourlyForecast;
  onClick: (time: string) => void;
}

const WeatherChart: React.FC<WeatherChartProps> = ({
  selectedTime,
  hourlyData,
  onClick,
}) => {
  const weatherCtx = useContext(WeatherContext);

  if (!weatherCtx) {
    throw new Error('WeatherContext must be used within a WeatherProvider');
  }

  const {
    locale,
    temperatureUnit,
  } = weatherCtx;

  const selectedDateIndex = hourlyData.findIndex(({ time }) => {
    return new Date(time).getDate() === new Date(selectedTime).getDate();
  });

  const selectedTimeIndex = hourlyData.findIndex(({ time }) => {
    return time === selectedTime;
  });

  const labels = hourlyData
    .slice(selectedDateIndex, selectedDateIndex + 8)
    .map(({ time }) => formatTimeIntl(time, locale));

  const temperatureData = hourlyData
    .slice(selectedDateIndex, selectedDateIndex + 8)
    .map(({ temperature }) => temperatureUnit === 'C' ? Math.round(temperature) : celsiusToFahrenheit(temperature));

  const data = {
    labels,
    datasets: [
      {
        data: temperatureData,
        borderColor: '#ffcc02',
        backgroundColor: '#fff5d7',
        fill: true,
        yAxisID: 'y',
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 10,
      },
    },
    plugins: {
      legend: { display: false },
      datalabels: {
        align: 'end',
        anchor: 'end',
        offset: 2,
        color: (context: Context) => {
          return selectedDateIndex + context.dataIndex === selectedTimeIndex ? 'black' : '#b5b5b5';
        },
        font: {
          size: 10,
          weight: 'bold',
        },
        listeners: {
          click: function(context: Context) {
            onClick(hourlyData[selectedDateIndex + (context as { dataIndex: number }).dataIndex].time);
          }
        }
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: '#707579',
          font: { size: 10 },
        },
      },
      y: {
        display: false,
        grace: '10%',
      },
      y1: { display: false },
    },
  };

  return (
    <div className='h-[120px]'>
      <Line
        data={data}
        options={options}
      />
    </div>
  );
};

export default WeatherChart;