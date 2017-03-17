import React, { PropTypes } from 'react';
import styles from './styles.css';

const ResumeHeader = ({ data }) => (
  <div className={styles.resumeHeader}>
    <div className={styles.resumeName}>{data.name}</div>
    <div className={styles.cell}>{data.cell}</div>
    <div className={styles.email}>{data.email}</div>
    <div className={styles.home}>{data.home}</div>
    <div className={styles.address}>{data.address}</div>
  </div>
);

ResumeHeader.propTypes = {
  data: PropTypes.object,
};

ResumeHeader.defaultProps = {
  data: {},
};

export default ResumeHeader;
