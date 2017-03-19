import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

import styles from './styles.css';

const defaultGithubConfig = {
  name: 'xzdev',
  link: 'https://github.com/xzdev',
  projects: [{
    name: 'minihome',
    link: 'https://github.com/xzdev/minihome',
    description: 'A repo to help you build you home site using golang and React',
    languages: ['JavaScript', 'Golang'],
  }, {
    name: 'UserfulTips',
    link: 'https://github.com/xzdev/UsefulTips',
    description: 'A collection of useful tips for developers',
    languages: ['JavaScript', 'Golang'],
  }, {
    name: 'JSPractise',
    link: 'https://github.com/xzdev/JSPractise',
    description: 'Some JavaScript programs for fun',
    languages: ['JavaScript'],
  }, {
    name: 'wechat-article-parser',
    link: 'https://github.com/xzdev/wechat-article-parser',
    description: 'A golang library to parse the wechat blog',
    languages: ['Golang'],
  }],
  tags: ['Full stack engineer', 'JavaScript hacker', 'ReactJS developer', 'Golang lover'],
};

const View = ({ config = defaultGithubConfig }) => (
  <div className={styles.githubSection}>
    <div className={[styles.githubBlock, styles.flexRow].join(' ')}>
      <a href={config.link}>
        <FontAwesome
          className={styles.githubIcon}
          name="github"
          size="2x"
          style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
        />
      </a>
      <a href={config.link}>
        <div className={styles.name}>{config.name}</div>
      </a>
    </div>
    <div className={styles.githubBlock}>
      {
        config.tags.map(tag => (
          <div className={styles.tag}>{tag}</div>
        ))
      }
    </div>
    <div className={styles.githubBlock}>
      <div className={styles.projectTitle}>Projects</div>
      {
        config.projects.map(project => (
          <div className={styles.project}>
            <div className={styles.projectName}><a href={project.link}>{project.name}</a></div>
            <div className={styles.projectDescription}>{project.description}</div>
            <div className={styles.projectLanguages}>{project.languages.join(' ')}</div>
          </div>
        ))
      }
    </div>
  </div>
);

View.propTypes = {
  config: PropTypes.object,
};

View.defaultProps = {
  config: defaultGithubConfig,
};

export default View;
