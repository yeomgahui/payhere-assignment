import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputBox from '../components/SiteInputBox.tsx';
import SiteList from '../components/SiteList.tsx';
import { MAX_SITES } from '../assets/constants';
import { Site } from '../types';

const SiteRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [siteList, setSiteList] = useState<Site[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const storedData = localStorage.getItem('siteList');
    if (storedData) {
      setSiteList(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    if (siteList.length === 0) return;
    localStorage.setItem('siteList', JSON.stringify(siteList));

    if (!!errorMessage && siteList.length < MAX_SITES) {
      setErrorMessage('');
    }
  }, [siteList, errorMessage]);

  const handleAddSite = (item: Site) => {
    if (siteList.length >= MAX_SITES) {
      const message = `최대 ${MAX_SITES}까지 등록하실 수 있습니다.`;
      setErrorMessage(message);
      return;
    }
    setSiteList((prevSites) => [...prevSites, item]);
  };

  const handleDeleteSite = (id: number) => {
    setSiteList((prevSites) => prevSites.filter((site) => site.id !== id));
  };

  const handleSelectSite = (id: number) => {
    const targetUrl = siteList.find((site) => site.id === id)?.url;
    navigate(`/detail/${id}`, { state: { url: `${targetUrl}` } });
  };

  return (
    <>
      <InputBox onAddSite={handleAddSite} errorMessage={errorMessage} />
      <SiteList
        items={siteList}
        onDeleteSite={handleDeleteSite}
        onSelectSite={handleSelectSite}
      ></SiteList>
    </>
  );
};

export default SiteRegisterPage;
