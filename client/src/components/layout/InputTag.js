import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-regular-svg-icons'
import './Style.scss'

class InputTag extends React.Component {
    constructor() {
        super();

        this.state = { 
            tags: ['this', 'is', 'a tag']
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

            this.setState({ tags: [...this.state.tags, val] })
            this.tagInput.value = null
        } else if (e.key === 'Backspace' && !val) {
            this.removeTag(this.state.tags.length - 1)
        }
    }

    //probably will have to change this
    //or maybe not since we will submit the list of tags after they are done editing 
    removeTag = (i) => {
        const newTags = [...this.state.tags]
        newTags.splice(i, 1)
        this.setState({tags: newTags})
    }
    

    render() {
        return(
            <div className="input-tag">
                <ul className='d-flex flex-wrap'>
                    {this.state.tags.map((tag, i)=> {
                       return (
                        <li key={tag} className='tag-item rounded-pill'>
                            {tag}
                            <button className='my-auto' type="button" onClick={()=>{this.removeTag(i)}}>
                                <FontAwesomeIcon icon={faTimesCircle} />
                            </button>
                        </li>
                        )
                    })}
                </ul>
                <input type="text" onKeyDown={this.inputKeyDown} ref={c=>{this.tagInput = c}} />
            </div>
        )
    }
}

export default InputTag