import AsideEmployee from "../../components/Employee/AsideEmployee";
import BodyDashboard from "../../components/Employee/BodyDashboard";
import ProfileEmployee from "../../components/Employee/ProfileEmployee";
import useUser from "../../store/loggin";

import React from 'react';
import { ResponsiveBar } from '@nivo/bar';


const data = [
    {
        "country": "AD",
        "hot dog": 29,
        "hot dogColor": "hsl(355, 70%, 50%)",
        "burger": 136,
        "burgerColor": "hsl(137, 70%, 50%)",
        "sandwich": 153,
        "sandwichColor": "hsl(230, 70%, 50%)",
        "kebab": 113,
        "kebabColor": "hsl(270, 70%, 50%)",
        "fries": 27,
        "friesColor": "hsl(278, 70%, 50%)",
        "donut": 79,
        "donutColor": "hsl(348, 70%, 50%)"
    },
    // más datos...
];

const BarChart: React.FC = () => (
    <div style={{ height: '500px' }}>
        <ResponsiveBar
            data={data}
            keys={['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']}
            indexBy="country"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'country',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'food',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            animate={true}
            motionConfig="stiff"
        />
    </div>
);


function DashboardEmployee() {
    const { user } = useUser();
    return (
        <main className="w-full h-full bg-gray-300 gap-24 ">
            <header className="w-full flex items-center justify-end p-3 bg-[#f8f4f3]">
                {user && <ProfileEmployee username={user?.username} />}
            </header>
            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            <AsideEmployee />
            <BodyDashboard/>
            <BarChart/>
        </main>
    );
}

export default DashboardEmployee;