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
      <div className='left-component'><DrugAutocomplete /></div>
      <div className='left-component'>
      <PathwayAutocomplete />
      <PathwayTable /></div>
      <div className='left-component'><GeneList /></div>
      </div>
      <div className='center-components'>
        <Network />
      </div>
    </div>
  );
}
