import React, { Component } from 'react';
import ScrollLinks from '../ScrollLinks/ScrollLinks';
import ScrollContent from '../ScrollContent/ScrollContent';

class ContentWrapper extends Component {
  constructor() {
    super();
    this.state = {
      activeButton: 'one',
    };

    this.scrollContent = React.createRef();
    this.renderedContent = [];
  }

  componentDidMount() {
    this.scrollContent.current.addEventListener('scroll', this.onScroll);
  }

  onScroll = e => {
    const {
      target: { scrollTop, scrollHeight, offsetHeight },
    } = e;
    this.lastScrollPosition = scrollTop;
    this.offsetHeight = offsetHeight;
    this.totalScrollHeight = scrollHeight;
    this.requestTick();
  };

  requestTick = () => {
    if (!this.ticking) {
      requestAnimationFrame(this.handleScrollEvent);
      this.ticking = true;
    }
  };

  handleScrollEvent = () => {
    const { activeButton } = this.state;

    this.renderedContent.forEach(node => {
      if (
        activeButton !== node.id &&
        (this.lastScrollPosition >= node.offsetTop &&
          this.lastScrollPosition < node.offsetTop + node.clientHeight)
      ) {
        this.setState(prevState => ({ activeButton: node.id }));
      }
    });
    this.ticking = false;
  };

  handleClick = scrollToId => {
    document.getElementById(scrollToId).scrollIntoView({
      block: 'start',
      inline: 'nearest',
      behavior: 'smooth',
    });
  };

  setRef = ref => {
    const { id } = ref;
    this[`${id}Content`] = ref;
    this.renderedContent.push(this[`${id}Content`]);
  };

  render() {
    const { activeButton } = this.state;
    const { children } = this.props;

    return (
      <section
        style={{
          height: '100%',
          width: '100%',
          background: '#DFF3E4',
          display: 'flex',
        }}
      >
        <ScrollLinks>
          {React.Children.map(children, child => {
            return React.createElement(
              'button',
              {
                onClick: () => this.handleClick(child.props.id),
                type: 'button',
                className: child.props.id === activeButton ? 'active' : '',
              },
              child.props.name || child.props.id
            );
          })}
        </ScrollLinks>
        <ScrollContent ref={this.scrollContent}>
          {React.Children.map(children, (child, i) => {
            return React.cloneElement(child, {
              style: {
                ...child.props.style,
                ...(i === children.length - 1 && {
                  // alter height of final content to be full height of screen
                  height: window.innerHeight,
                }),
              },
              ref: this.setRef,
            });
          })}
        </ScrollContent>
      </section>
    );
  }
}

export default ContentWrapper;
