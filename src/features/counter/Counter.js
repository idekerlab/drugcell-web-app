import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setElements,
  importFromURL,
  selectElements,
} from './counterSlice';
import styles from './Counter.module.css';
import Cytoscape from 'cytoscape'
import Dagre from 'cytoscape-dagre';
import CytoscapeComponent from 'react-cytoscapejs';

Cytoscape.use(Dagre);

export function Counter() {

  const elements = useSelector(selectElements);
  const dispatch = useDispatch();
  
  return (
    <div>
    <CytoscapeComponent elements={JSON.parse(JSON.stringify(elements))} style={ { width: '1200px', height: '400px' }} layout={{ name:'dagre' }}  />
    <button
          aria-label="Load Pathway"
          className={styles.button}
          onClick={() => {
            console.log("Load URL from button");
            console.log(elements);
            //dispatch(setElements([]));
            dispatch(importFromURL('http://localhost:3000/data/GO_0000038.json'));
            }
          }
        >LOAD</button>
        </div>
    /*
    <div>
     
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
      </div>
    </div>
    */
  );
}
