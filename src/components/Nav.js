import React, { Component } from 'react'



 class Nav extends Component {
  shouldComponentUpdate(nextProps, nextState){
    console.log(
      'shouldCompinentUpdate 작동',
      nextProps.data, 
      // 변경된값 
      this.props.data 
      // 변경전의 값
      );
      if(nextProps.data === this.props.data){
          return false; // 뒤에있는 render()를 실행하지 않는다 즉, 메뉴를 다시 출력하지 않는다.
      }
    return true; // 뒤에있는 render()를 실행, 메뉴 다시 출력
  }
  render() {
    console.log('Nav.js 실행')
    let lists = [];
    let data = this.props.data
    console.log(data); // 리턴안에서는 자바스크립트 사용 불가
    /*
    let i = 0;
    while(i < data.length){
      lists.push(<li><a>{data[i].title}</a></li>);
      i++;
    }
    */
    data.forEach(item=>{
      lists.push(
      <li key={item.id} onClick={(e)=>{
        e.preventDefault();
        this.props.onChangeMode(item.id);
      }}><a href="/">{item.title}</a></li>
    )
    })
    return (
      <>
      <nav>
        <ul>
          {lists}
        </ul>
      </nav>
    </>
    )
  }
}

export default Nav;