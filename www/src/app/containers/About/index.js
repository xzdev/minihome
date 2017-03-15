import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Resume from '../../components/Resume';
import { selectResume } from '../appSelectors';

class View extends Component {

  static propTypes = {
    resume: PropTypes.object,
    fetchResume: PropTypes.func.isRequired,
  }

  static defaultProps = {
    resume: {},
  }

  componentWillMount() {
    this.props.fetchResume();
  }

  render() {
    const data = this.props.resume;
    return (
      <Resume data={data} />
    );
  }
}

const mapStateToProps = state => ({
  resume: selectResume(state),
});

const mapActionToProps = dispatch => ({
  fetchResume: () => {
    dispatch({
      type: 'REQUEST_RESUME',
    });
  },
});

export default connect(mapStateToProps, mapActionToProps)(View);
