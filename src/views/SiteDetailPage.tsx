import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SiteDetailList from '../components/SiteDetailList';
import { getFormattedDate, getYear, convertStringToFormattedDate } from '../assets/utils';
import { MAX_YEAR_AGO } from '../assets/constants';
import { SiteDetailItem } from '../types';
import styled from 'styled-components';

const Message = styled.h3`
  text-align: center;
`;

const getSiteInfosForDateRange = async (
  url: string,
  fromDate: Date,
  toDate: Date,
): Promise<SiteDetailItem[]> => {
  const urls: SiteDetailItem[] = [];

  while (fromDate <= toDate) {
    const formattedDate = getFormattedDate(fromDate, 'YYYY0101');
    const response = await fetch(
      `https://archive.org/wayback/available?url=${url}&timestamp=${formattedDate}`,
    );
    const { archived_snapshots } = await response.json();
    const urlHistoryInfo = archived_snapshots?.closest;
    const isAlreadyExist = urls.some(
      (url) => urlHistoryInfo && url.timestamp === urlHistoryInfo.timestamp,
    );

    if (urlHistoryInfo && !isAlreadyExist) {
      const snapshots: SiteDetailItem = {
        url: urlHistoryInfo.url,
        timestamp: urlHistoryInfo.timestamp,
        formattedDate: convertStringToFormattedDate(urlHistoryInfo.timestamp) || '',
      };
      urls.push(snapshots);
    }

    fromDate.setFullYear(fromDate.getFullYear() + 1);
  }

  return urls;
};

const SiteDetailPage: React.FC = () => {
  const location = useLocation();
  const [urlList, setUrlList] = useState<SiteDetailItem[]>([]);

  useEffect(() => {
    const fetchURLs = async () => {
      try {
        const fromDate = getYear('subtract', MAX_YEAR_AGO);
        const toDate = getYear();
        const urls = await getSiteInfosForDateRange(location.state.url, fromDate, toDate);

        setUrlList(urls);
      } catch (error) {
        console.error('Error fetching URLs from Wayback API:', error);
      }
    };

    fetchURLs();
  }, []);

  const handleUrlClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <>
      {urlList.length > 0 ? (
        <>
          <Message>{location.state.url}의 최근 10년치 과거 URL 주소입니다.</Message>
          <SiteDetailList items={urlList} onSelectItem={handleUrlClick} />
        </>
      ) : (
        <Message>{location.state.url}에 대한 과거 URL 이력이 존재하지 않습니다.</Message>
      )}
    </>
  );
};

export default SiteDetailPage;
