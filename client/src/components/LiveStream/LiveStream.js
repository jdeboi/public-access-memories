
import React from 'react';
import './LiveStream.css';
import Frame from '../Frame/Frame';

import { connect } from 'react-redux';
import { hideLiveStream } from '../../../store/actions/menuItems';

class YouTube extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

    // componentDidUpdate(prevProps) {
    // }

    onHide = () => {

    }

    render() {
        const fraction = 200 / 315;
        const w = Math.floor(560 * fraction);
        const h = Math.floor(315 * fraction);
        const spaceBottom = 60;
        const { music, ui, setVolume } = this.props;
        const style = { height: 20, width: w - ui.edgeSpacing };

        return (
            <Frame title="zoom"
                bounded={true}
                isHidden={this.props.menu.liveStream.isHidden}
                onHide={() => { dispatch(hideLiveStream()) }}
                className="Live-Stream"
                windowStyle={{ background: "rgba(0, 0, 0, .9)" }}
                content={
                    <React.Fragment>
                        <iframe width={w}
                            height={h}
                            src="https://www.youtube.com/embed/jogQMOumsWs"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>

                        </iframe>
                        <div className="join-zoom">
                            <a href="https://tulane.zoom.us/j/96008889892" target="_blank" rel="noopener noreferrer"><button className="standardButton secondary">join zoom!</button></a>
                        </div>
                    </React.Fragment>

                }
                width={w} height={h + spaceBottom} x={ui.edgeSpacing} y={ui.contentH - h - spaceBottom - ui.edgeSpacing} z={1000}
            />
        );
    }


}


const mapStateToProps = (state) => {
    return {
        ui: state.ui,
        menu: state.menu
    }
}

const mapDispatchToProps = () => {
    return {
        hideLiveStream
    }
}


export default connect(mapStateToProps, mapDispatchToProps())(YouTube);

