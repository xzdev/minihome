import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Resume from '../../components/Resume';
import { selectResume } from '../appSelectors';

class View extends Component {

  static propTypes = {
    fetchResume: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchResume();
  }

  render() {
    return (
      <Resume data={{}} />
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
