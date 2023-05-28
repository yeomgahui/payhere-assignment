import React, { useState, useEffect } from 'react';
import InputBox from './SiteInputBox.tsx';
import SiteList from './SiteList.tsx';
import { Site } from '../types/Site.ts';
import { MAX_SITES } from '../assets/constants';
import { useNavigate } from 'react-router-dom';

const SiteRegistration = () => {
  const navigate = useNavigate();
  const [siteList, setSiteList] = useState<Site[]>([]);
  const [error, setError] = useState<boolean>(false);
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

    if (error && siteList.length < MAX_SITES) {
      setError(false);
      setErrorMessage('');
    }
  }, [siteList, error]);

  const onAddSite = (item: Site) => {
    if (siteList.length >= MAX_SITES) {
      const message = `최대 ${MAX_SITES}까지 등록하실 수 있습니다.`;
      setError(true);
      setErrorMessage(message);
      return;
    }
    setSiteList((prevSites) => [...prevSites, item]);
  };

  const handleDeleteItem = (id: number) => {
    setSiteList((prevSites) => prevSites.filter((site) => site.id !== id));
  };

  const moveDetailPage = (id: number) => {
    navigate(`/detail/${id}`);
  };

  return (
    <>
      <InputBox onAddItem={onAddSite} error={error} errorMessage={errorMessage} />
      <SiteList
        items={siteList}
        onDeleteItem={handleDeleteItem}
        onSelectItem={moveDetailPage}
      ></SiteList>
    </>
  );
};

export default SiteRegistration;
