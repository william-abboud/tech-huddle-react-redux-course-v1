import React, { Component } from 'react';
import { TabContainer, Tab } from '../components/Tabs';
import PostList from '../components/PostList';

function SampleTabs() {
  return (
    <TabContainer>
      <Tab label="Tab one" current>This is the first tab</Tab>
      <Tab label="Tab two">This is the second tab</Tab>
      <Tab label="Tab three">This is the third tab</Tab>
    </TabContainer>
  );
}

class HomeView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="home-view">
        <PostList />
      </section>
    );
  }
}

export default HomeView;
