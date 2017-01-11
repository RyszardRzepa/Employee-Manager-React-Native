import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View } from 'react-native';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';
import { Spinner } from  './common'

class EmployeeList extends Component {

  componentWillMount() {

    this.props.employeesFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
  }

  createDataSource({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(employees);
  }

  renderRow(employee) {
    return <ListItem employee={employee} />;
  }


  render() {

    if(this.props.loading) {
      return <Spinner size="large"/>
    }

    return (
        <View>
          <ListView
              enableEmptySections
              dataSource={this.dataSource}
              renderRow={this.renderRow}
          />
        </View>
    );
  }
}

const mapStateToProps = state => {
  const employees = _.map(state.employees.fetchEmployee, (val, uid) => {
    return { ...val, uid };
  });

  return { employees, loading: state.employees.loading };
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);
