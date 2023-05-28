import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SiteDetailList from '../components/SiteDetailList';

interface WaybackAPIResult {
  timestamp: string;
  url: string;
}

const SiteDetailPage: React.FC = () => {
  const location = useLocation();
  const [urlList, setUrlList] = useState<WaybackAPIResult[]>([]);

  useEffect(() => {
    const fetchURLs = async () => {
      try {
        const response = await fetch(
          `https://archive.org/wayback/available?url=${location.state.url}`,
        );
        const data = await response.json();
        setUrlList([data?.archived_snapshots?.closest] || []);
      } catch (error) {
        console.error('Error fetching URLs from Wayback API:', error);
      }
    };

    fetchURLs();
  }, []);

  const handleUrlClick = () => {
    console.log('handleUrlClick');
  };

  return (
    <>
      <div>Site Detail 페이지입니다.</div>
      {urlList.length > 0 ? <SiteDetailList items={urlList} /> : <p>No URLs found.</p>}
    </>
  );
};

export default SiteDetailPage;
