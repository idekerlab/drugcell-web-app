
import { METHOD_GET } from './apiConstants'

const DRUG_CELL_URL = 'http://localhost';
const DRUG_CELL_PORT = '80';
const DRUG_CELL_ROOT = 'data'

const getURL = (path) => {
    return DRUG_CELL_URL + ':' + DRUG_CELL_PORT + '/'+ DRUG_CELL_ROOT + path;
} 

  const getDrugs = () => {
    const url = getURL('/drug-index.json');
      return fetch(url, {
      method: METHOD_GET,
      mode: 'no-cors'
    })
  }

  const getPathways = (drugUUID) => {
    const url = getURL('/paths/' + drugUUID + '/index.json');
      return fetch(url, {
      method: METHOD_GET,
      mode: 'no-cors'
    })
  }

  const getPathway = (drugUUID, pathwayID) => {
    const url = getURL('/paths/' + drugUUID + '/' + pathwayID + '.json');
    
      return fetch(url, {
      method: METHOD_GET,
      mode: 'no-cors'
    })
  }

  export { getDrugs , getPathways, getPathway }