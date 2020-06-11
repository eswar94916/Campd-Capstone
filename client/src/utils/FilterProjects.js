import React from 'react'

class FilterProject extends React.Component {
    state= {
        filter: ""
    }


    render() {
        return(
            <div>
                <ul>
                    <li>Active</li>
                    <li>Completed</li>
                    <li>Pending</li>
                </ul>
            </div>
        )
    }
}

export default FilterProject