import React from 'react';

const WidthContext = React.createContext('100%');

class ResizableContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalWidth: 0,
      percentualIncrement: 0
    };
  }
  componentDidMount() {
    this.setState(() => ({
      totalWidth: this.myRef.current.offsetWidth
    }));
  }
  notifyResize = resizerIndex => increment => {
    this.setState(prevState => ({
      percentualIncrement: increment / prevState.totalWidth,
      resizerIndex
    }));
  };
  getPercentualIncrement = columnIndex => {
    if (columnIndex === this.state.resizerIndex) {
      return this.state.percentualIncrement;
    } else if (columnIndex === this.state.resizerIndex + 1) {
      return -this.state.percentualIncrement;
    }
    return 0;
  };

  getMappedChildren = children => {
    let columnIndex = 0;
    let splitterIndex = 0;
    return React.Children.map(children, child => {
      let clonedChild;
      if (child.displayName === 'ResizableColumn') {
        clonedChild = React.cloneElement(child, {
          percentualIncrement: this.getPercentualIncrement(columnIndex)
        });
        columnIndex++;
      } else if (child.displayName === 'Splitter') {
        clonedChild = React.cloneElement(child, {
          notifyResize: this.notifyResize(splitterIndex)
        });
        splitterIndex++;
      } else {
        clonedChild = child;
      }
      return clonedChild;
    });
  };

  render() {
    const kids = this.getMappedChildren(this.props.children);
    return (
      <div className="container" ref={this.myRef}>
        {kids}
      </div>
    );
  }
}

const ResizableColumnProps = {
  percentualIncrement,
  splitterWidth,
  totalWidth,
  children
};
// default %width, width based on number of cols, onResize event
class ResizableColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percentualWidth: props.width
    };
  }

  getDerivedStateFromProps(props, state) {
    return props.percentualIncrement
      ? {
          percentualWidth: state.percentualWidth + props.percentualIncrement
        }
      : {};
  }

  render() {
    const resizingStyle = this.state.resizing
      ? {
          userSelect: 'none',
          pointerEvents: 'none',
          cursor: 'col-resize'
        }
      : '';
    const style = {
      width: `calc((100% - ${this.props.splitterWidth}) * ${
        this.state.percentualWidth
      })`,
      ...resizingStyle
    };
    return <div style={style}>{this.props.children}</div>;
  }
}

class Resizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mousePositionX: null
    };
  }

  mouseDownHandler = event => {
    const mousePositionX = event.clientX;
    this.setState(() => ({
      mousePositionX
    }));
    window.addEventListener('mousemove', this.resize, false);
    window.addEventListener('mouseup', this.stopResize, false);
  };
  resize = event => {
    const mousePositionX = event.clientX;
    this.props.notifyResize(mousePositionX - this.state.mousePositionX);
    this.setState(prevState => {
      mousePositionX;
    });
  };
  stopResize = event => {
    this.setState(() => ({
      resizing: false
    }));
    window.removeEventListener('mousemove', this.resize, false);
    window.removeEventListener('mouseup', this.stopResize, false);
  };

  render() {
    return <div className="resizer" onMouseDown={this.mouseDownHandler} />;
  }
}
