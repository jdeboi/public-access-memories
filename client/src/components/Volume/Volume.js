
import React from 'react';
import VolumeOff from '@material-ui/icons/VolumeOff';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeDown from '@material-ui/icons/VolumeDown';
import Play from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';


import Slider from '@material-ui/core/Slider';
import './Volume.css';
import Frame from '../Frame/Frame';

import { connect } from 'react-redux';
import { setVolume, toggleVolume } from '../../../store/actions/music';
import { hideVolume } from '../../../store/actions/menuItems';

class Volume extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

    // componentDidUpdate(prevProps) {
    // }

    sliderChange = (event, newValue) => {
        this.props.setVolume(newValue);
    }

    render() {
        const w = 200;
        const { music, ui, setVolume } = this.props;
        const style = { height: 20, width: w - ui.edgeSpacing };

        return (
            <Frame title="volume"
                bounded={true}
                isHidden={this.props.menu.isVolumeHidden}
                onHide={this.props.hideVolume}
                className="VolumeBar"
                windowStyle={{ background: "rgba(0, 0, 0, .9)" }}
                content={
                    <div className="volume-slider">
                        {this.getVolumeButton()}
                        <Slider
                            value={music.isMuted?0:music.masterVolume}
                            onChange={this.sliderChange}
                            orientation="horizontal"
                            style={style}
                            color='primary'
                            aria-labelledby="continuous-slider"
                            step={0.05}
                            min={0.0}
                            max={1.0}
                            defaultValue={music.masterVolume}
                        />
                    </div>
                }
                width={w} height={40} x={ui.width - w - ui.edgeSpacing} y={34 + 30} z={1000}
            />
        );
    }

    getPlayButton = () => {
        const { music, toggleVolume } = this.props;
        if (music.isMuted)
            return (
                <button onClick={toggleVolume} >
                    <Play />
                </button>
            );
        return (
            <button onClick={toggleVolume} >
                <Pause />
            </button>
        );
    }

    getVolumeButton = () => {
        const { music, toggleVolume } = this.props;
        if (music.isMuted)
            return (
                <button onClick={toggleVolume} >
                    <VolumeOff />
                </button>
            );
        return (
            <button onClick={toggleVolume} >
                <VolumeUp />
            </button>
        );
    }

}


const mapStateToProps = (state) => {
    return {
        ui: state.ui,
        music: state.music,
        menu: state.menu
    }
}

const mapDispatchToProps = () => {
    return {
        toggleVolume,
        setVolume,
        hideVolume
    }
}


export default connect(mapStateToProps, mapDispatchToProps())(Volume);
