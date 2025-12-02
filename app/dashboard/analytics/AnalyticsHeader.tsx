'use client';

import { useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FiShoppingCart, FiUsers, FiTrendingUp, FiPieChart, FiCalendar, FiDownload, FiRefreshCw,FiDollarSign} from 'react-icons/fi';
import { BsImage } from 'react-icons/bs';
import {  Chart as ChartJS,  CategoryScale,  LinearScale,  PointElement,  LineElement,  BarElement,  ArcElement,  Title,  Tooltip,  Legend,} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

export default function AnalyticsHeader(){
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dateRange, setDateRange] = useState('30d');
  const [activeMetric, setActiveMetric] = useState('revenue');
  const [isLoading, setIsLoading] = useState(false);
    return(
        <>
        </>
    )
}