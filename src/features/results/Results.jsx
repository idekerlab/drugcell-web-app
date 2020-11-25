import React, { useEffect } from 'react';
import { Network } from './network/Network';

import { PathwayAutocomplete } from '../pathway/PathwayAutocomplete';
import { PathwayTable } from '../pathway/PathwayTable';

import { DrugAutocomplete } from '../drugs/DrugAutocomplete';

import { GeneList } from './genes/GeneList';

import './style.css';

export function Results() {

  return (
    <div className='container'>
      <div className='left-components'>
        <DrugAutocomplete />
        <PathwayAutocomplete />
        <PathwayTable />
        <GeneList />
      </div>
      <div className='center-components'>
        <Network />
      </div>
    </div>
  );
}
