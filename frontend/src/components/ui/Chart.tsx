import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useTranslation } from 'react-i18next';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartProps {
  data: {
    labels: string[];
    datasets: { label: string; data: number[]; backgroundColor: string }[];
  };
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: t('chart.title') },
          },
        }}
      />
    </div>
  );
};

export default Chart;