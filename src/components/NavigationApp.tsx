import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  const links = [{ url: '/errandsList', label: 'Lista de Recados' }];

  return (
    <>
      {links.map(item => {
        // eslint-disable-next-line react/jsx-key
        return <Link to={item.url}>{item.label}</Link>;
      })}
    </>
  );
};

export default Navigation;
