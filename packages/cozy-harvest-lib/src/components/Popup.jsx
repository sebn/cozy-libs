import { PureComponent } from 'react'
import PropTypes from 'prop-types'

/**
 * customized function to center a popup window
 * @param  {string} url
 * @param  {string} title
 * @param  {string|number} w
 * @param  {string|number} h
 * @return {Window}       Popup window
 */
// source https://stackoverflow.com/a/16861050
export function popupCenter(w, h) {
  /* global screen */
  // Fixes dual-screen position
  //                      Most browsers      Firefox
  var dualScreenLeft = window.screenLeft || screen.left
  var dualScreenTop = window.screenTop || screen.top

  var width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : screen.width
  var height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : screen.height

  var left = width / 2 - w / 2 + dualScreenLeft
  var top = height / 2 - h / 2 + dualScreenTop
  // need to be set here to get from the OAuth opener
  return {
    w,
    h,
    top,
    left
  }
}

/**
 * Renders a popup and listen to popup events
 */
export class Popup extends PureComponent {
  constructor(props, context) {
    super(props, context)
    this.handleMessage = this.handleMessage.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
    this.showPopup()
  }

  componentWillUnmount() {
    this.killPopup()
  }

  addListeners() {
    window.addEventListener('message', this.handleMessage)
  }

  handleMessage(messageEvent) {
    // const { popup } = this.state
    const { onMessage } = this.props
    console.log('this.newWindow', this.newWindow)
    this.newWindow.close()
    onMessage(messageEvent)
    /*  const isFromPopup = popup.location.origin === messageEvent.origin
    if (isFromPopup && typeof onMessage === 'function') onMessage(messageEvent) */
  }

  handleClose(popup) {
    this.removeListeners(popup)

    const { onClose } = this.props
    if (typeof onClose === 'function') onClose(popup)
  }

  killPopup() {
    this.removeListeners()
    this.stopMonitoringClosing()
  }

  monitorClosing(popup) {
    if (popup.closed) {
      this.stopMonitoringClosing()
      return this.handleClose(popup)
    }
  }

  /**
   * Check if window is closing every 500ms
   * @param  {Window} window
   */
  startMonitoringClosing(popup) {
    this.checkClosedInterval = setInterval(
      () => this.monitorClosing(popup),
      500
    )
  }

  stopMonitoringClosing() {
    clearTimeout(this.checkClosedTimeout)
  }

  removeListeners() {
    window.removeEventListener('message', this.handleMessage)
  }

  handleUrlChange = event => {
    const { url } = event
    const urlParsed = new URL(url)
    const account = urlParsed.searchParams.get('account')
    const state = urlParsed.searchParams.get('state')
    if (account && state) {
      const data = {
        key: account,
        oAuthStateKey: state
      }
      this.handleMessage({ data })
    }
  }

  showPopup() {
    const { height, width, title, url } = this.props
    const { w, h, top, left } = popupCenter(width, height)
    /**
     * ATM we also use window.open on Native App in order to open
     * InAppBrowser. But some provider (Google for instance) will
     * block us. We need to use a SafariViewController or Chrome Custom Tab.
     * So
     */
    this.newWindow = window.open(
      url,
      title,
      `scrollbars=yes, width=${w}, height=${h}, top=${top}, left=${left}`
    )
    // Puts focus on the newWindow

    this.newWindow.addEventListener('loadstart', this.handleUrlChange)

    if (this.newWindow.focus) {
      this.newWindow.focus()
    }

    this.addListeners(this.newWindow)
    this.startMonitoringClosing(this.newWindow)
    //this.setState({ newWindow })
  }

  render() {
    return null
  }
}

Popup.propTypes = {
  // Dimensions
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string,
  url: PropTypes.string.isRequired,
  // Callbacks
  onClose: PropTypes.func,
  onMessage: PropTypes.func
}

Popup.defaultProps = {
  title: ''
}

export default Popup
