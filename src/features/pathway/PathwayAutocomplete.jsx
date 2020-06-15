import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListSubheader from '@material-ui/core/ListSubheader';
import Chip from '@material-ui/core/Chip';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { VariableSizeList } from 'react-window';
import Tooltip from '@material-ui/core/Tooltip';
import { Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAvailablePathways,
  setSelectedPathways,
  selectSelectedPathways,
} from '../results/pathwaySlice';

import {
  selectSelectedDrug
} from '../results/drugSlice';

import {
  setElementsFromURLs
} from '../results/network/networkSlice';

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING,
    },
  });
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child) => {
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.node,
};

const useStyles = makeStyles({
  listbox: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});

export function PathwayAutocomplete() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pathways = useSelector(selectAvailablePathways);
  const selectedPathways = useSelector(selectSelectedPathways);
  const selectedDrugUUID = useSelector(selectSelectedDrug);

  return (
    <Tooltip title={
      Object.keys(pathways).length == 0
        ? 'Select a drug to display available pathways'
        : selectedPathways.length == 0
          ? 'Start typing a pathway name, or click on the drop down to scroll through all avaialable pathways sorted by RLIPP score'
          : ''
    } placement='right'>
      <Autocomplete
        multiple
        style={{ width: 300 , 'padding-top': '12px' }}
        disableListWrap
        classes={classes}
        disabled={Object.keys(pathways).length == 0}
        ListboxComponent={ListboxComponent}
        value={selectedPathways}
        getOptionLabel={ option => option.replace(/_/g, ' ') }
        options={Object.keys(pathways).sort((a, b) => pathways[b].rlipp - pathways[a].rlipp)}
        renderInput={(params) => <TextField {...params} variant="outlined" label="Pathways" />}
        renderOption={(option) => <Typography noWrap>{pathways[option].rlipp.toFixed(2)} {option.replace(/_/g, ' ')}</Typography>}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Tooltip title={option.replace(/_/g, ' ') + ' RLIPP Score: ' + pathways[option].rlipp} placement='right'>
              <Chip variant="outlined" label={option.replace(/_/g, ' ')} {...getTagProps({ index })} />
            </Tooltip>
          ))
        }
        onChange={(event, value) => {
          const selectedPathways = value;
          console.log("event.shiftKey=" + event.shiftKey );
          dispatch(setSelectedPathways(selectedPathways));
          const pathwayIds = value.map(entry => pathways[entry]['shared-name']);
          console.log('pathwayIds: ' + JSON.stringify(pathwayIds));
          console.log('selected drug: ' + selectedDrugUUID);
          dispatch(setElementsFromURLs({ uuid: selectedDrugUUID, selectedPathways: pathwayIds }));
        }}
      />
    </Tooltip>
  );
}