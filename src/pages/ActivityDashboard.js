// src/pages/ActivityDashboard.js
import React, { useState, useEffect, useRef } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from 'axios';

const ActivityDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [activityData, setActivityData] = useState({
        dates: ['2023-06-01', '2023-06-02', '2023-06-03'],
        chatCounts: [5, 10, 3]
    });
    const chartRef = useRef(null);

    useEffect(() => {
        axios.get('/api/activity-data').then(response => {
            console.log('API Response:', response.data);  // Debugging: Log API response
            if (response.data && response.data.dates && response.data.chatCounts) {
                setActivityData(response.data);
            }
            setLoading(false);
        }).catch(error => {
            console.error('Error fetching activity data:', error);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        const chart = chartRef.current;

        return () => {
            if (chart) {
                chart.destroy();
            }
        };
    }, [activityData]);

    const data = {
        labels: activityData.dates,
        datasets: [
            {
                label: 'Chat Sessions',
                data: activityData.chatCounts,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    console.log('Chart Data:', data);  // Debugging: Log chart data

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>Activity Dashboard</Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <Bar ref={chartRef} data={data} options={options} />
            )}
        </Box>
    );
};

export default ActivityDashboard;
