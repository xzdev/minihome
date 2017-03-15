import React, { PropTypes } from 'react';

import ResumeHeader from './header';
import ResumeSections from './sections';

import styles from './styles.css';

const View = ({ data }) => (
  <div className={styles.resumeBlock}>
    <ResumeHeader data={data.header} />
    <ResumeSections data={data.sections} />
  </div>
);

View.propTypes = {
  data: PropTypes.object.isRequired,
};

export default View;
