import classNames from 'classnames/bind';
import { forEach } from 'lodash';
import React, { PropTypes } from 'react';
import TagList from './taglist';
import styles from './styles.css';

const cx = classNames.bind(styles);

const SECTION_KEYS = {
  CONTENT: 'content',
  LIST: 'list',
  BLOCKS: 'blocks',
};

let lineBreakKey = 0;
const lineBreaks = description => (
  description.split('\n').map((str) => {
    lineBreakKey += 1;
    return <div key={`linebreak${lineBreakKey}`}>{str}</div>;
  })
);

const getSectionWidget = (section) => {
  const ws = [];

  forEach(section, (v, k) => {
    if (k === SECTION_KEYS.CONTENT) {
      ws.push(<div className={styles.content} key={`content${k}`}>{v}</div>);
    } else if (k === SECTION_KEYS.LIST) {
      forEach(v, (li, key) => {
        const classes = cx('listlist', {
          hide: !li.name,
        });
        ws.push(
          <div className={styles.listitem} key={`list${k}${key}`}>
            <div className={classes}>
              <div className={styles.name}>{li.name}:</div>
              <TagList data={li.items} withComma />
            </div>
            <div className={styles.description}>{li.description}</div>
          </div>,
        );
      });
    } else if (k === SECTION_KEYS.BLOCKS) {
      forEach(v, (bo, key) => {
        const classes = cx('item-text', 'strong');
        ws.push(
          <div className={styles.block} key={`block${k}${key}`}>
            <div className={styles.headerline}>
              <div className={styles.item}>
                <span className="strong">{bo.role},</span>
                <span className={classes}>{bo.summary}</span>
              </div>
              <div className={styles.item}>
                <span className={styles.itemText}>{bo.company}</span>
                <span className={styles.itemText}>{bo.duration}</span>
              </div>
            </div>
            <div className={styles.description}>{lineBreaks(bo.description)}</div>
          </div>,
          );
      });
    }
  });
  // section.content
  return ws;
};

const ResumeSection = ({ data }) => (
  <div className="x-resume-section">
    <div className="x-title">{data.title}</div>
    { getSectionWidget(data) }
  </div>
);

ResumeSection.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ResumeSection;
