
import { METHOD_GET, METHOD_POST , NDEX_SERVER_URL} from './apiConstants'



const getPathwaysFromNetwork = (networkUUID, ids) => {

  const url =  NDEX_SERVER_URL + 'v2/search/network/' + networkUUID +'/interconnectquery';

  const downloadProps = {
    "searchString": ids.join(" "),
    "searchDepth":1,
    "edgeLimit":50000,
    "errorWhenLimitIsOver":true
  };

  return fetch(url, {
    method: METHOD_POST, 
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(downloadProps)
  })
}



export { getPathwaysFromNetwork }