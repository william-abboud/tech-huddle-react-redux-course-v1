import React, { Component } from 'react';
import { TabContainer, Tab } from '../components/Tabs';

class HomeView extends Component {
  constructor(props) {
    super(props);

    this.changeFoo = this.changeFoo.bind(this);

    this.state = {
      foo: false
    };
  }

  changeFoo() {
    this.setState({ foo: true });
  }

  componentDidMount() {
    setTimeout(this.changeFoo, 5000);
  }

  render() {
    return (
      <section className="home-view">
        <h2>This is the Homepage</h2>
        <TabContainer>
          <Tab label="Tab one" current>This is the first tab</Tab>
          <Tab label="Tab two">This is the second tab</Tab>
          <Tab label="Tab three">This is the third tab</Tab>

          {
            this.state.foo ? <Tab label="Hello there">new one</Tab> : null
          }
        </TabContainer>
      </section>
    );
  }
}

export default HomeView;
