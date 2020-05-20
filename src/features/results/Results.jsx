import React, { useEffect } from 'react';
import { Network } from './network/Network';

import { PathwayAutocomplete } from '../pathway/PathwayAutocomplete';
import { DrugAutocomplete } from '../drugs/DrugAutocomplete';

import { GeneList } from '../genes/GeneList';

export function Results() {

  return (
    <div>
      <DrugAutocomplete />
      <PathwayAutocomplete />
      <GeneList />
      <Network />
    </div>
  );
}
