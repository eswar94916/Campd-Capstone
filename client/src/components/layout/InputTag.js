import React from 'react'
import './Style.scss'

class InputTag extends React.Component {
    constructor() {
        super();

        this.state = { 
            tags: []
         }
    }

    inputKeyDown = (e) => {
        const val = e.target.value;
        if(e.key === 'Enter' && val){
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
                <ul>
                    {this.state.tags.map((tag, i)=> {
                       return (
                        <li key={tag} className='tag-item rounded-pill'>
                            {tag}
                            <button className='rounded-circle' type="button" onClick={()=>{this.removeTag(i)}}>x</button>
                        </li>
                        )
                    })}
                    

                    <li className="input-tag__input">
                        <input type="text" onKeyDown={this.inputKeyDown} ref={c=>{this.tagInput = c}} />
                    </li>
                </ul>
            </div>
        )
    }
}

export default InputTag