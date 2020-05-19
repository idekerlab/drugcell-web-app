import React, { useEffect } from 'react';
import { Network } from './network/Network';

import { PathwayAutocomplete } from '../pathway/PathwayAutocomplete';
import { DrugAutocomplete } from '../drugs/DrugAutocomplete';


export function Results() {

  return (
    <div>
      <DrugAutocomplete />
      <PathwayAutocomplete />
      <Network />
    </div>
  );
}
