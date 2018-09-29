import React, { Component } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import ButtonLink from '../ButtonLink/ButtonLink';
import ScrollLinks from '../ScrollLinks/ScrollLinks';
import ScrollContent from '../ScrollContent/ScrollContent';

class ContentWrapper extends Component {
  constructor() {
    super();
    this.state = {
      activeButton: 'one',
    };

    // init smoothscroll polyfill for browsers like safari & edge
    smoothscroll.polyfill();
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
      const pxFromTop = node.offsetTop;
      const contentHeight = node.clientHeight;
      if (
        activeButton !== node.id &&
        (this.lastScrollPosition >= pxFromTop &&
          this.lastScrollPosition < pxFromTop + contentHeight)
      ) {
        this.setState(prevState => ({ activeButton: node.id }));
      }
    });
    this.ticking = false;
  };

  handleClick = id => {
    // access saved content refs to enable scroll to
    this[`${id}Content`].scrollIntoView({
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
    const {
      children,
      position,
      sideBarStyle,
      contentStyle,
      buttonStyle,
      buttonColor,
      buttonHoverColor,
    } = this.props;
    const appliedStyle = {
      ...(position === 'left' && {
        scroll: {
          flex: 1,
        },
        content: { flex: 2 },
        wrapper: {
          flexDirection: 'row',
        },
      }),
      ...(position === 'right' && {
        scroll: {
          flex: 1,
        },
        content: { flex: 2 },
        wrapper: {
          flexDirection: 'row-reverse',
        },
      }),
      ...(position === 'top' && {
        scroll: {
          flexDirection: 'row',
          minHeight: 50,
        },
        wrapper: {
          flexDirection: 'column',
        },
      }),
      ...(position === 'bottom' && {
        scroll: {
          flexDirection: 'row',
          minHeight: 50,
        },
        wrapper: {
          flexDirection: 'column-reverse',
        },
      }),
    };

    return (
      <section
        style={{
          ...{
            height: '100%',
            width: '100%',
            background: '#FFFCF7',
            display: 'flex',
          },
          ...appliedStyle.wrapper,
        }}
      >
        <ScrollLinks scrollStyle={{ ...appliedStyle.scroll, ...sideBarStyle }}>
          {React.Children.map(children, child => (
            <ButtonLink
              className={child.props.id === activeButton ? 'active' : ''}
              active={child.props.id === activeButton}
              aria-label={child.props.id}
              onClick={() => this.handleClick(child.props.id)}
              buttonStyle={{ ...appliedStyle.buttons, ...buttonStyle }}
              buttonColor={buttonColor}
              buttonHoverColor={buttonHoverColor}
            >
              {child.props.id}
            </ButtonLink>
          ))}
        </ScrollLinks>
        <ScrollContent
          ref={this.scrollContent}
          contentStyle={{ ...appliedStyle.content, ...contentStyle }}
        >
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
