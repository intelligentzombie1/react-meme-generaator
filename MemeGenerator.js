import React, {Component} from 'react'

class MemeGenerator extends Component{
    constructor(){
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({ [name]: value })
        }
    handleSubmit = (event) => {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({ randomImage: randMemeImg })
    }    

        componentDidMount(){
            fetch("https://api.imgflip.com/get_memes")
                .then(response => response.json())
                .then(response => {
                    const {memes} = response.data
                    this.setState({allMemeImgs : memes})
                })
    }
    render(){
        return(
            <div>
                <form className = "meme-form" onSubmit={this.handleSubmit}>
                    <input 
                    type="text" 
                    name= "topText"
                    placeholder="Toptext"
                    className="space"
                    value={this.state.topText}
                    onChange={this.handleChange}
                    />
                    <input 
                    type="text" 
                    name= "bottomText"
                    placeholder="Bottomtext"
                    className="space1"
                    value={this.state.bottomText}
                    onChange={this.handleChange}
                    />
                    <button>Gen</button>
                </form>
                <div className="meme">
                    <img src = {this.state.randomImage} alt=""/>
                    <h2 className = "top">{this.state.topText}</h2>
                    <h2 className = "bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator