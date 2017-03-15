import React, { PropTypes } from 'react';
import { forEach } from 'lodash';

import ResumeSection from './section';

import styles from './styles.css';

const getSections = (sections) => {
  const ws = [];
  forEach(sections, (v, i) => {
    ws.push(<ResumeSection data={v} key={i} />);
  });
  return ws;
};

const ResumeSections = ({ data }) => (
  <div className={styles.resumeSections}>
    {getSections(data)}
  </div>
);

ResumeSections.propTypes = {
  data: PropTypes.array,
};

ResumeSections.defaultProps = {
  data: [],
};

export default ResumeSections;
