import { PureComponent } from 'react';

/** @deprecated Use the useEventListener hook instead. */
class EventListener extends PureComponent {
  componentDidMount() {
    this.attachListener();
  }
  componentDidUpdate({
    passive,
    ...detachProps
  }) {
    this.detachListener(detachProps);
    this.attachListener();
  }
  componentWillUnmount() {
    this.detachListener();
  }
  render() {
    return null;
  }
  attachListener() {
    const {
      event,
      handler,
      capture,
      passive,
      window: customWindow
    } = this.props;
    const window = customWindow || globalThis.window;
    window.addEventListener(event, handler, {
      capture,
      passive
    });
  }
  detachListener(prevProps) {
    const {
      event,
      handler,
      capture,
      window: customWindow
    } = prevProps || this.props;
    const window = customWindow || globalThis.window;
    window.removeEventListener(event, handler, capture);
  }
}

export { EventListener };
