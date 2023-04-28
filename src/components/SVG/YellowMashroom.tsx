import * as React from 'react';
import { Component } from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../RTK/companySlice';
type Props = {};
const YellowMashroom = React.forwardRef(
  ({}: Props, ref: React.Ref<HTMLDivElement>) => {
    const { companyData } = useSelector(selectCompanyData);
    return (
      <>
        <div ref={ref}>
          <svg
            width="1381"
            height="1551"
            viewBox="0 0 1381 1551"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M961.959 963.406C1314.14 681.869 1475.69 298.585 1322.79 107.319C1169.88 -83.9477 760.435 -10.7689 408.255 270.768C185.379 448.939 38.8501 667.858 0.0507664 853.072C282.646 656.105 589.944 613.996 710.314 764.569C840.368 927.256 702.959 1253.27 403.404 1492.74C403.301 1492.82 403.197 1492.9 403.094 1492.98C601.283 1616.47 826.766 1583.78 961.959 963.406Z"
              fill={companyData.themeColors.secondary}
            />
          </svg>
        </div>
      </>
    );
  }
);

export default motion(YellowMashroom);
