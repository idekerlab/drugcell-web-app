import React from 'react';
import { Typography } from '@material-ui/core';

const AUC = () => {


  return (
    <div>
      <Typography variant="h6">
        Area Under the dose-response Curve (AUC)
        </Typography>
      <p>
        <Typography>
          In our study, the drug response was measured using the Area Under the dose-response Curve (AUC). The cell viability (luminescence) values were background corrected (media only), normalized to vehicle treatment (DMSO) at each concentration, and replicate values averaged. Curves were created by connecting individual response points in a piecewise linear fashion. The AUC was then calcuated and normalized such that AUC = 0 represents complete cell killing, AUC = 1 represents no effect, and AUC &gt;  1 represents a treatment granting a growth advantage to the cells.
        </Typography>
      </p>
    </div>
  );
}

export default AUC;

