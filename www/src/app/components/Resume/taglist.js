import React, { PropTypes } from 'react';
import { forEach } from 'lodash';

import styles from './styles.css';

const getTags = (tags, withComma) => {
  const ws = [];
  const len = (tags && tags.length) || 0;

  forEach(tags, (v, i) => {
    ws.push(
      <div className={styles.tag} key={`div${i}`}>{v}</div>,
    );
    if (withComma && i < len - 1) {
      ws.push(<span key={`span${i}`}>,</span>);
    }
  });

  return ws;
};

const TagList = ({ data, withComma }) => (
  <div className={styles.taglist}>
    { getTags(data, withComma) }
  </div>
);

TagList.propTypes = {
  data: PropTypes.array,
  withComma: PropTypes.bool.isRequired,
};

TagList.defaultProps = {
  data: [],
};

export default TagList;
