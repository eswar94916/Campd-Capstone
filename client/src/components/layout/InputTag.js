import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-regular-svg-icons'
import {Form} from 'react-bootstrap'
import './Style.scss'

class InputTag extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            tags: this.props.tags
         }
    }

    inputKeyDown = (e) => {
        const val = e.target.value;
        if(e.key === 'Enter' && val){
            e.preventDefault()
            //check if tag is alredy there
            if(this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())){
                // need to add some kind of feed back here
                return;
            }

            this.setState({ tags: [...this.state.tags, val] }) //only adds to this component
            this.props.addTag(val) //add to server
            this.tagInput.value = null
        } else if (e.key === 'Backspace' && !val) {
            this.props.removeTag(this.state.tags.length - 1) //remove from server
            this.removeTag(this.state.tags.length - 1) //only removes in this component
        }
    }
 
    removeTag = (i) => {
        const newTags = [...this.state.tags]
        newTags.splice(i, 1)
        this.setState({tags: newTags})
        this.props.removeTag(i)
    }
    

    render() {
        return(
            <div className="input-tag">
                <ul className='d-flex flex-wrap'>
                    {this.state.tags.map((tag, i)=> {
                       return (
                        <li key={tag} className='tag-item'>
                            {tag}
                            <button className='my-auto' type="button" onClick={()=>{this.removeTag(i)}}>
                                <FontAwesomeIcon icon={faTimesCircle} />
                            </button>
                        </li>
                        )
                    })}
                </ul>
                <Form.Control type="text" placeholder={this.props.placeholder} onKeyDown={this.inputKeyDown} ref={c=>{this.tagInput = c}} />
            </div>
        )
    }
}

export default InputTag