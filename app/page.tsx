'use client';
import { useState, useEffect, useCallback} from 'react';
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
          <main className="flex-1 overflow-y-auto p-1 md:p-2">
            <SkeletonLoader />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <StatsOverview/>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
            <RenueOverview/>
            <RecentOrder/>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 ">
            <TopProduct/>
            <PerformanceMetrics/>
          </div>
      </div>
    </div>
  );
}