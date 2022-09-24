import Auth from '../../components/Routes/AuthRoutes'
import Dashboard from '@/components/Templates/Layouts/Dashboard';
import React, { useState, useEffect } from 'react';

const Operations: React.FC = () => {

  return (
    <Dashboard
      title="Alunos"
      description={
        <p>Aqui você terá acesso à todos os alunos do nosso banco de dados</p>
      }
    >
      <Auth />
    </Dashboard>
  );
};

export default Operations;
