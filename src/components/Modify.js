import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react'

 class Modify extends Component {
  constructor(props){
    //초기값 설정
    super(props);
    this.state = {
      title:this.props.data.title,
      desc:this.props.data.desc,
      difficulty:this.props.data.difficulty
    }
  }
  inputFormHandler = (e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }
   render() {
    console.log('Create.js 실행')
    return (
      <div className="shadow p-3 mb-5 bg-body-tertiary rounded">
        <h2>Modify Article</h2>
        <Form action="#" onSubmit={(e)=>{
           e.preventDefault();
          this.props.modifyForm(e.target.title.value,e.target.desc.value,e.target.difficulty.value);
        }}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="제목을 입력하세요." 
            name="title"  
            value={this.state.title}
            onChange={this.inputFormHandler}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="desc">
            <Form.Label>Description</Form.Label>
            <Form.Control 
            as="textarea" 
            rows={3} 
            name="desc" 
            value={this.state.desc}
            onChange={this.inputFormHandler}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="difficulty">
            <Form.Label>Difficulty</Form.Label>
            <Form.Control 
            type="number" 
            name="difficulty" 
            value={this.state.difficulty}
            min={0}
            max={5}
            required
            onChange={this.inputFormHandler}/>
          </Form.Group>
          <Button type="submit" variant="secondary">입력</Button>
        </Form>
      </div>
    )
  }
}
export default Modify;