import React, { Component } from 'react';
import './App.css';
import Map from './container/Map';
import { connect } from 'react-redux';
import * as tracksActions from './store/action/index';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

class App extends Component {
    componentDidMount() {
        this.props.fetchTracks();
        this.timer = setInterval(()=> {
            if(!this.props.errorMessage && this.props.tracks && this.props.tracks.length > 0) {
                this.props.fetchTracks()
            } else {
                clearInterval(this.timer);
            }
        },
        2000);
    }

    componentWillUnmount() {
        this.timer = null;
    }

    render() {
      let template;
      if(this.props.errorMessage) {
          template = (
              <div class="loader">
                  <h1>{this.props.errorMessage}</h1>
              </div>
          )
      } else if(!this.props.errorMessage && this.props.tracks && this.props.tracks.length) {
          template = (
              <Map tracks={this.props.tracks}></Map>
          )
      } else if(!this.props.errorMessage && !this.props.tracks) {
          template = (
              <div className="loader">
                  <Loader
                      type="TailSpin"
                      color="#00BFFF"
                      height={100}
                      width={100}
                  />
              </div>
          )
      } else {
          template = (
              <div className="loader">
                  <h1>No Data to Track</h1>
              </div>
          )
      }
      return (
          <div className="App">
              {template}
          </div>
      )
  }
}

const mapStateToProps = state => {
    return {
        tracks: state.tracks.tracks,
        errorMessage: state.tracks.errorMessage,
    }
}
const mapDispatchToProps = disptach => {
    return {
        fetchTracks: () => disptach(tracksActions.fetchTracks())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
