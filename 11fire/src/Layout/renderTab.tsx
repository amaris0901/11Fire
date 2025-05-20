import React from 'react';
import FilesTabContent from '../Pages/FileTabContent';
import ProfileTabContent from '../Pages/ProfileTabContent';
import HomeTabContent from '../Pages/HomeTabContent';

const renderTabContent = (selectedTab: string) => {
  switch (selectedTab) {
    case 'home':
      return <HomeTabContent />;
    case 'files':
      return <FilesTabContent />;
    case 'profile':
      return <ProfileTabContent />;
    default:
      return null;
  }
};

export default renderTabContent;
