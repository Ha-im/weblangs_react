import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Main from './components/Main';
import Create from './components/Create'
import Modify from './components/Modify'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from 'react'

 class App extends Component {
  constructor(props){
    //초기값 설정
    super(props);
    this.state = {//여기에서 디스는 class App을 말한다
      mode:'welcome',
      selected_id:0,
      max_id:3,
      subject:{title:'React', desc:'Single page Application'},
      welcome:{title:'Welcome', desc:'Welcome to React'},
      menus:[ // 누를때마다 변경되어야하니 배열안에 객체형태로 진행한다.
        {id:1,title:"HTML",desc:"Hypertext Markup Language",difficulty:1},
        {id:2,title:"CSS",desc:"CSS is for Design",difficulty:2},
        {id:3,title:"Javascript",desc:"Javascript is for interaction",difficulty:3}
      ]
    }
  }
  getArticles(){
    const {mode} = this.state; // 이해하기
    let _main= null;
    if(mode === 'welcome'){
      _main = <Main data={this.state.welcome} mode={this.state.mode}/>;
    }else if(this.state.mode === 'read'){
      _main = <Main data={this.getReadArticle()} 
      onChangeMode={()=>{
        this.setState({
          mode: 'Modify'
        })
      }}     
        deleteForm={(id)=>{ 
        console.log(id);
        //메뉴 내용 삭제
        if(window.confirm('정말 삭제할까요?')){
          /*
          아이디가 들어오면 메뉴복사본 변수명 _menus 할당
          _menus에서 넘어온 id와 일치하는 요소의 인덱스 번호를 del_id 할당 _menus에서 id번째 요소를 삭제 splice
          */
         
          let _menus = [...this.state.menus]
          let del_id = this.state.menus.findIndex(m => m.id === id);
          //let del_id = this.state.menus.find(m =>m.id === _menus);
          if(del_id){
            _menus.splice(del_id,1);
          }
          this.setState({
            mode:'welcome',
            menus:_menus
          })
  
        }
    }}/>;
      /*
      let i = 0;
      while(i < this.state.menus.length){
        let data = this.state.menus[i];
        if(data.id === this.state.selected_id){
         _title = data.title;
         _desc = data.desc;
        }
        i++
      }
      */
    }else if(mode === 'Create'){
      _main = <Create createForm={(title,desc,difficulty)=>{
          console.log(title,desc,difficulty);
          this.state.max_id = this.state.max_id + 1;
          let _menus = this.state.menus.concat({id:this.state.max_id,title:title,desc:desc,difficulty:difficulty});
          this.setState({
            mode:'welcome',
            menus:_menus
          })
      }}/>;
    }else if(mode === 'Modify'){
      _main = <Modify 
      data={this.getReadArticle()}
      modifyForm={(title,desc,difficulty)=>{
        
        //메뉴 내용 수정 
        let _menus = this.state.menus.map(m =>
           m.id === this.state.selected_id 
           // ? {id: m.id, title: title, desc: desc} 
           ? {...m, title, desc,difficulty} 
           : m
       );
        /*
        let _menus = this.state.menus.map((m)=>{
           if(m.id === this.state.selected_id){
            return{id: m.id, title: title, desc: desc}
          }else{
            return m;
          }
        });
        */
        /*
        let _menus = [...this.state.menus]; // 새롭게 메뉴 에다가 담았다..?
        let i = 0;
        while(i<_menus.length){
          if(_menus[i].id === this.state.selected_id){
            _menus[i] = {id: _menus[i].id, title: title, desc: desc};
            break;
          }
          i++;
        }
        */
        this.setState({
          mode:'read',
          menus:_menus
        })
    }}

    />;
    }
    return _main; // 메인부분을 내보내야함 
  }
  getReadArticle(){
    let data = this.state.menus.find(m =>m.id === this.state.selected_id);
     return data;
  }
  render() {
    console.log('App.js 실행')

    
    return (
      <div className='container'>
        <Header title={this.state.subject.title} desc={this.state.subject.desc} onChangeMode={()=>{
          this.setState({
            mode:'welcome'
          });
        }}/>
        {/* <header>
          <h1 onClick={()=>{
            alert('반갑습니다');
            this.setState({
              mode:'read'
            });
          }}>{this.state.subject.title}</h1>
          <p>{this.state.subject.desc}</p>
        </header> */}
        <Nav data={this.state.menus} onChangeMode={(id)=>{
          console.log(id);
          this.setState({
            mode:'read',
            selected_id:id
          });
        }}/>
        {this. getArticles()}
        <hr/>
        <div className = 'd-flex justify-content-end'>
        <Button variant="primary" onClick={()=>{
            this.setState({
              mode:'Create'
            });
          }}>Create</Button>
        </div>
      </div>
    )
  }
}
export default App;
/*
function App() {
  return (
      <>
        <header>
        <h1>React</h1>
        <p>Single page Application</p>
      </header>
      <nav>
        <ul>
          <li><a href="">HTML</a></li>
          <li><a href="">CSS</a></li>
          <li><a href="">Javasctipt</a></li>
        </ul>
      </nav>
      <main>
        <article>
          <h2>HTML</h2>
          <p>Hypertext Markup Language</p>
        </article>
      </main>
    </>
  );
}

export default App;
*/