import React, { Component } from 'react';
import './App.css';
import Map from './container/Map';
import { connect } from 'react-redux';
import * as tracksActions from './store/action/index';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

class App extends Component {
    componentDidMount() {
        let date = new Date('2020-07-01T17:15:00Z');
        this.props.fetchTracks(date);
        this.timer = setInterval(()=> {
            if(!this.props.errorMessage) {
                // date.setDate(date.getDate()+1); // Can uncomment this code to increment date by one
                this.props.fetchTracks(date)
            } else {
                clearInterval(this.timer);
            }
        },
        2000);
    }

    shouldComponentUpdate(nextProps) {
        if(this.props.tracks && this.props.tracks.length > 0 && nextProps.tracks.length === 0) {
            clearInterval(this.timer);
            return false;
        }
        return true;
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
      let template;
      if(this.props.errorMessage) {
          template = (
              <div className="center">
                  <h1>{this.props.errorMessage}</h1>
              </div>
          )
      } else if(!this.props.errorMessage && this.props.tracks && this.props.tracks.length) {
          template = (
              <Map tracks={this.props.tracks}></Map>
          )
      } else if(!this.props.errorMessage && !this.props.tracks) {
          template = (
              <div className="center">
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
              <div className="center">
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
        fetchTracks: (date) => disptach(tracksActions.fetchTracks(date))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
