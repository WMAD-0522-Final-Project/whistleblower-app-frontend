import React from 'react';
import { Outlet } from 'react-router-dom';
import AvatarIcon from './AvatarIcon';
import Header from '../Header';

type Props = {};

const AdminLayout = (props: Props) => {
  return (
    <>
      <Header hasMenu={true} />
      <AvatarIcon />
      <Outlet />
    </>
  );
};

export default AdminLayout;
