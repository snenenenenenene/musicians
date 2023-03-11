import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import Container from '../components/common.components/container.component';
import { Loader } from '../components/common.components/loader.component';
import { TitleWithGoBack } from '../constants/Layout';
import { getUserAnalytics } from '../services/api-calls';
import { GlobalContext } from '../services/store';
import { Error } from './erorr.page';

export default function Analytics() {
  const { user } = useContext(GlobalContext);

  const { data, error, status }: any = useQuery(['users', user], () => getUserAnalytics(user?.id), {
    onSuccess: (data: any) => {
      console.log(data);
    },
  });

  // const Entry = ({ title, number }: any) => {
  //   return (
  //     <FlexCol>
  //       {title}
  //       <div className="font-bold">{number}</div>
  //     </FlexCol>
  //   );
  // };

  // const showDateRange = () => {
  //   switch (dateRange) {
  //     case 'Last Day':
  //       return (
  //         <FlexCol>
  //           <Entry number={10} title="Visitors" />
  //           <Entry number={8} title="Fans" />
  //           <Entry number={4} title="Groupies" />
  //           <Entry number={18} title="Shares" />
  //         </FlexCol>
  //       );
  //     case 'Last Week':
  //       return (
  //         <FlexCol>
  //           <Entry number={901} title="Visitors" />
  //           <Entry number={78} title="Fans" />
  //           <Entry number={17} title="Groupies" />
  //           <Entry number={43} title="Shares" />
  //         </FlexCol>
  //       );
  //     case 'Last Month':
  //       return (
  //         <FlexCol>
  //           <Entry number={'1.8k'} title="Visitors" />
  //           <Entry number={900} title="Fans" />
  //           <Entry number={139} title="Groupies" />
  //           <Entry number={76} title="Shares" />
  //         </FlexCol>
  //       );
  //     default:
  //       break;
  //   }
  // };
  const month_names = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const labels = data?.monthlyAnalyics?.map(
    (month: { month: any; amount: number }) => month_names[month.month]
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Earnings',
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Earnings €',
        data: data?.monthlyAnalyics?.map((month: { month: any; amount: number }) => month.amount),
        backgroundColor: '#ff3c00',
      },
    ],
  };

  return (
    <Container>
      <TitleWithGoBack title="Analytics" />
      {status === 'loading' ? (
        <Loader />
      ) : status === 'error' ? (
        <Error message={error.message} />
      ) : data ? (
        <>
          <div className="w-full h-40 mt-4 grid grid-cols-3 shadow rounded-xl">
            <div className="w-full p-4 h-32 border-r my-auto border-main-dark-2 bg-main-1 dark:bg-main-dark-2 flex flex-col">
              <p className="font-medium text-base text-main-important-text">Total Earned</p>
              <p className="mb-8 text-2xl font-semibold">{data?.totalEarned}</p>
            </div>
            {data.monthlyAnalyics && (
              <>
                <div className="w-full p-4 h-32 border-r my-auto border-main-dark-2 bg-main-1 dark:bg-main-dark-2 flex flex-col">
                  <p className="font-medium text-base text-main-important-text">New Fans</p>
                  <p className="mb-8 text-2xl font-semibold">
                    {data?.monthlyAnalyics[4]?.amount * 2}
                  </p>
                </div>
                <div className="w-full p-4 h-32  my-auto bg-main-1 dark:bg-main-dark-2 flex flex-col">
                  <p className="font-medium text-base text-main-important-text">New Groupies</p>
                  <p className="mb-8 text-2xl font-semibold">{data?.monthlyAnalyics[4]?.amount}</p>
                </div>
              </>
            )}
          </div>
          {data?.monthlyAnalyics && data.monthlyAnalyics?.length !== 0 && (
            <Bar options={options} data={chartData} />
          )}
        </>
      ) : (
        <p className="mt-7 font-medium text-lg">Not Enough Data</p>
      )}
      {/* <Select
        onChange={(e: any) => {
          setDateRange(e.target.value);
        }}>
        <option>Last Day</option>
        <option>Last Week</option>
        <option>Last Month</option>
      </Select>
      <div className="py-3">{showDateRange()}</div> */}
    </Container>
  );
}
