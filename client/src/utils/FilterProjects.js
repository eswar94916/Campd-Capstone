import React from 'react'
import { connect } from 'react-redux';
import { filterProjects } from '../actions/index';
import {Button, Form} from 'react-bootstrap'
import '../components/layout/Style.scss';

class FilterProjects extends React.Component {
    state = {
        filters: [],

    }

    handleFilter = (e) => {
        if(e.target.checked) {
            this.setState({
                filters: [...this.state.filters, e.target.id]
            })
        } else{
            const i = this.state.filters.indexOf(e.target.id)
            this.setState({
                filters: this.state.filters.filter((_, index) => index != i)
            })
        }
    }

    componentDidUpdate(){
        this.props.onFilter(this.state.filters)
    }


    handleReset = (e) => {
        this.setState({
            filters: []
        })
        this.refs["activeCheckbox"].checked = false
        this.refs["completeCheckbox"].checked = false
        this.refs["pendingCheckbox"].checked = false
    }


    render() {
        return(
            <div className="filter-projects">
                <h5>Filter Projects: </h5>
                <Form>
                    <Form.Check onChange={this.handleFilter} type="checkbox" id="active" ref="activeCheckbox" label="Active"/>
                    <Form.Check onChange={this.handleFilter} type="checkbox" id="complete" ref="completeCheckbox" label="Complete"/>
                    <Form.Check onChange={this.handleFilter} type="checkbox" id="pending" ref="pendingCheckbox" label="Pending"/>
                    <Button variant="dark" onClick={this.handleReset} type="button" value="">Reset</Button>
                </Form>
            </div>
        )
    }
}

function mapStateToProps({projects}) {
    return {value: projects.value};
  }

function mapDispatchToProps(dispatch) {
    return {
        onFilter: value => {
            dispatch(filterProjects(value));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterProjects);