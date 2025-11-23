'use client';
import { useState, useEffect, useCallback} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SkeletonLoader from "../app/loading"
import StatsOverview from './components/Main/StatsOverview';
import PerformanceMetrics from './components/Main/PerformanceMetrics';
import TopProduct from './components/Main/TopProduct';
import RecentOrder from './components/Main/RecentOrder';
import RenueOverview from './components/Main/RenueOverview';

export default function EcommerceDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      try {
        setIsMobile(window.innerWidth < 1024);
        if (window.innerWidth >= 1024) {
          setIsSidebarOpen(true);
        } else {
          setIsSidebarOpen(false);
        }
      } catch (error) {
        console.error('Error checking mobile view:', error);
        setIsMobile(false);
      }
    };
    checkIsMobile();
    

    try {
      AOS.init({ 
        duration: 800, 
        easing: 'ease-in-out', 
        once: true,
        offset: 50
      });
    } catch (error) {
      console.error('AOS initialization failed:', error);
    }

    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    window.addEventListener('resize', checkIsMobile);
    return () => {
      window.removeEventListener('resize', checkIsMobile);
      clearTimeout(timer);
    };
  }, []);

  const refreshData = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  }, []);





  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <SkeletonLoader />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 flex flex-col  p-4 md:p-6">
        <StatsOverview/>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <RenueOverview/>
            <RecentOrder/>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <TopProduct/>
            <PerformanceMetrics/>
          </div>
      </div>
    </div>
  );
}