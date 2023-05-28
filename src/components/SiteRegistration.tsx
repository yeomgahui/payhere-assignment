import React, { useState, useEffect } from 'react';
import InputBox from './SiteInputBox.tsx';
import SiteList from './SiteList.tsx';
import { Site } from '../types/Site.ts';
import { MAX_SITES } from '../assets/constants/index.ts';

const SiteRegistration = () => {
  const [siteList, setSiteList] = useState<Site[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem('siteList');
    if (storedData) {
      setSiteList(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    if (siteList.length === 0) return;
    localStorage.setItem('siteList', JSON.stringify(siteList));
  }, [siteList]);

  const onAddSite = (item: Site) => {
    if (siteList.length >= MAX_SITES) {
      console.log(`최대 ${MAX_SITES}까지 등록하실 수 있습니다.`);
      return;
    }
    setSiteList((prevSites) => [...prevSites, item]);
  };

  const handleDeleteItem = (id: number) => {
    setSiteList((prevSites) => prevSites.filter((site) => site.id !== id));
  };

  const moveDetailPage = () => {
    console.log('moveDetailPage');
  };

  return (
    <>
      <InputBox onAddItem={onAddSite} />
      <SiteList
        items={siteList}
        onDeleteItem={handleDeleteItem}
        onSelectItem={moveDetailPage}
      ></SiteList>
    </>
  );
};

export default SiteRegistration;
