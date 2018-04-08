import React from 'react';

export default function withMediaQuery(Component) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.getViewPortFromWidth = this.getViewPortFromWidth.bind(this);
      this.changeViewPort = this.changeViewPort.bind(this);
      this.shouldChangeViewPort = this.shouldChangeViewPort.bind(this);

      this.state = {
        viewport: ""
      };

      this.viewportDimensions = {
        "mobile": [0, 599],
        "tablet-portrait": [600, 899],
        "tablet-landscape": [900, 1199],
        "desktop": [1200, 1799],
        "large-desktop": [1800, 2399]
      };
    }

    getViewPortFromWidth(width) {
      let foundViewport = "";

      Object.keys(this.viewportDimensions)
        .forEach(viewport => {
          const lowerEnd = this.viewportDimensions[viewport][0];
          const higherEnd = this.viewportDimensions[viewport][1];

          if (width >= lowerEnd && width <= higherEnd) {
            foundViewport = viewport;
            return;
          }
        });

      return foundViewport;
    }

    changeViewPort(viewport) {
      this.setState({ viewport });
    }

    shouldChangeViewPort(viewport) {
      return this.state.viewport !== viewport;
    }

    componentDidMount() {
      const _this = this;
      const viewport = this.getViewPortFromWidth(window.innerWidth);

      this.changeViewPort(viewport);

      window.onresize = function() {
        const viewport = _this.getViewPortFromWidth(window.innerWidth);

        if (_this.shouldChangeViewPort(viewport)) {
          _this.changeViewPort(viewport);
        }
      };
    }

    render() {
      return <Component viewport={this.state.viewport} />;
    }
  }
}
