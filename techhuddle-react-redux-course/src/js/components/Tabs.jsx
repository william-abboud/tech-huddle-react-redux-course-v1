import React, { Component } from 'react';
import { bool, func } from 'prop-types';

export class Tab extends Component {
  render() {
    return (
      <div className="tab">
        { this.props.children }
      </div>
    );
  }
}

Tab.propTypes = {
  current: bool
};

class TabHeader extends Component {
  constructor(props) {
    super(props);

    this.switchToTab = this.switchToTab.bind(this);
    this.state = {
      currentTabIdx: this.props.currentTabIdx || 0
    };
  }

  switchToTab({ target }) {
    const tabIdx = parseInt(target.dataset.forTab, 10);

    this.props.onTabSwitch(tabIdx);
  }

  render() {
    const { children } = this.props;
    return (
      <div className="tab-header">
        <ul>
          { children.map((heading, i) => (
            <li key={i}>
              <button onClick={this.switchToTab} data-for-tab={i}>
                { heading }
              </button>
            </li>
          )) }
        </ul>
      </div>
    );
  }
}

TabHeader.propTypes = {
  onTabSwitch: func.isRequired
};

function TabBody({ children }) {
  return (
    <div className="tab-body">
      {
        React.Children.map(children, (tab) => {
          if (!tab.props.current) {
            return null;
          }

          return tab;
        })
      }
    </div>
  );
}

export class TabContainer extends Component {
  constructor(props) {
    super(props);

    this.changeCurrentTab = this.changeCurrentTab.bind(this);
    this.renderTabs = this.renderTabs.bind(this);
    this._getCurrentTabIdx = this._getCurrentTabIdx.bind(this);

    this.state = {
      currentTabIdx: this._getCurrentTabIdx(this.props.children)
    };
  }

  _getCurrentTabIdx(children) {
    let current = 0;

    React.Children.forEach(children, (child, i) => {
      if (child && child.props.hasOwnProperty("current") && child.props.current) {
        current = i;
      }
    })

    return current;
  }

  changeCurrentTab(nextTabIdx) {
    this.setState({ currentTabIdx: nextTabIdx });
  }

  renderTabs() {
    const { children } = this.props;
    const { currentTabIdx } = this.state;
    const _map = React.Children.map;
    const _clone = React.cloneElement;

    const clearedTabs = _map(children, child => child ? _clone(child, { current: false }) : null);

    return _map(clearedTabs, (tab, i) =>
      (i === currentTabIdx)
        ? _clone(tab, { current: true })
        : tab
    );
  }

  render() {
    const { currentTabIdx } = this.state;
    const tabs = this.props.children;

    return (
      <div className="tab-container">
        <TabHeader current={currentTabIdx} onTabSwitch={this.changeCurrentTab}>
          { tabs.map(tab => tab && tab.props.label) }
        </TabHeader>
        <TabBody>
          { this.renderTabs() }
        </TabBody>
      </div>
    );
  }
}
