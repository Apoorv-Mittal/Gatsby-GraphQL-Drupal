import PropTypes from "prop-types"
import React, { Component } from "react"
import "../sass/styles.scss"
import { Sidebar, Segment, Menu } from 'semantic-ui-react'
import { Row, Col } from 'reactstrap'
import Headroom from 'react-headroom'

const UmdTopBar = () => (
  <section className="red-bg top-bar">
    <div>
      <p className="white uppercase no-marg-b center">
        <a className="white crimson" href="https://umd.edu/">University of Maryland</a>
      </p>
    </div>
  </section>
)
class HeaderSite extends Component {
  state = {
    visible: false,
    weatherData: [],
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })


  render() {
    const { visible } = this.state
    return (
      <Sidebar.Pushable as={Segment}>
        <Headroom>
          <UmdTopBar />
          <div className="header clearfix">
            <Row className="align-items-center ">
              <Col>
                <a href="/" className="brand">
                  <img src={require('../img/QTCLogo.png')} width="400" alt="QTC UMD Logo" />
                </a>
              </Col>

              <Col>
                <div className="hamburger-menu">
                  <div id="menuToggle" onClick={this.toggleVisibility}>
                    <input type="checkbox" id="menuCheckbox" />

                    <span></span>
                    <span></span>
                    <span></span>

                  </div>
                </div>
                {/* <div>
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Search</span>
                          </div>
                          <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" />
                        </div>
                      </div> */}
              </Col>
            </Row>
          </div>
          <div className="sub-header-container">
            <div className="sub-header container">
              <Row>
                <Col>
                  <ul className="nav nav-fill">
                    <li className="nav-item">
                      <a className="nav-link active" href="/About">About</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/Research">Research</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/News">News</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/Events">Events</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/tags/people">People</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/Publication">Publication</a>
                    </li>
                  </ul>
                </Col>
              </Row>
            </div>
          </div>
        </Headroom>
        <Sidebar as={Menu} animation='overlay' visible={visible} icon='labeled' vertical inverted className="sidenav">
          <a href="/" className="brand">
            <div className="brand-container">

              <div className="hamburger-menu close">
                <div id="menuToggle" onClick={this.toggleVisibility}>
                  <input type="checkbox" id="menuCheckbox" />

                  <span></span>
                  <span></span>
                  <span></span>

                </div>
              </div>
              <img src={require('../img/QTCLogo.png')} width="400" alt="QTC UMD Logo" />
            </div>
          </a>
          <div className="sidebar-contents">
            <Menu.Item>
              <a href="/About">About</a>
            </Menu.Item>
            <Menu.Item>
              <a href="/News">News</a>
            </Menu.Item>
            <Menu.Item>
              <a href="/Events">Events</a>
            </Menu.Item>
            <Menu.Item>
              <a href="/tags/people">People</a>
            </Menu.Item>
            <Menu.Item>
              <a href="/tags/people">People</a>
            </Menu.Item>
            <Menu.Item>
              <a href="/Publication">Publication</a>
            </Menu.Item>
          </div>
        </Sidebar>
      </Sidebar.Pushable>

    )
  }

}

HeaderSite.propTypes = {
  siteTitle: PropTypes.string,
}

HeaderSite.defaultProps = {
  siteTitle: ``,
}

export default HeaderSite