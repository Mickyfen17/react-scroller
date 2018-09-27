import React, { Component } from 'react';
import ContentWrapper from '../ContentWrapper/ContentWrapper';
import './App.scss';

class App extends Component {
  render() {
    return (
      <ContentWrapper position="right">
        <section id="one" style={{ height: 300, background: '#7180B9' }}>
          <h1>One</h1>
        </section>
        <section id="two" style={{ height: 300, background: '#3423A6' }}>
          <h1>Two</h1>
        </section>
        <section id="three" style={{ height: 300, background: '#2E1760' }}>
          <h1>Three</h1>
        </section>
        <section id="four" style={{ height: 300, background: '#171738' }}>
          <h1>Four</h1>
        </section>
      </ContentWrapper>
    );
  }
}

export default App;
