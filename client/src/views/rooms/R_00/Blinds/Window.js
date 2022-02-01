import React from 'react';
import Frame from '../../shared/Frame/Frame';
import {getRandomNum} from '../../shared/Helpers/Helpers';


class Window extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

    // // const w = 180;
    // // const h = w;
    // const spacing = 20;

    this.state = {
      currentImg: 1,
      isClosed: false,
      randVal0: Math.random(),
      randVal1: Math.random(),
      position: {x: this.props.ogPos.x, y: this.props.ogPos.y}
    }
  }


  componentDidMount() {
    // this.interval = setInterval(this.changeImg, Math.random()*3000+1500);

    this.interval = setInterval(this.changeImg, 30);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  changeImg = () => {}

  changeMode = () => {
    // if (Math.random() > .5) this.setState({currentImg: 0,randVal0: Math.random(), randVal1: Math.random()});
    // else this.setState({currentImg: 1, randVal0: Math.random(), randVal1: Math.random()});

    var mode = this.props.mode;
    const WAVE = 0;
    const SEESAWX = 1;
    const SEESAWY = 2;
    const ALL = 3;
    const RANDOM = 4;
    var isClosed = false;
    switch(mode) {
      case WAVE:
      var dt = this.props.ogPos.x + this.props.ogPos.y*window.innerWidth;
      isClosed = Math.sin(new Date()/1000 + dt/1400) < 0?true: false;
      break;

      case SEESAWX:
      var open = Math.sin(new Date()/1000) < 0?true: false;
      isClosed = this.props.ogPos.x < window.innerWidth/2?open:!open;
      break;

      case SEESAWY:
      var open = Math.sin(new Date()/1000) < 0?true: false;
      isClosed = this.props.ogPos.y < window.innerHeight/2?open:!open;
      break;

      case ALL:
      // var open = Math.sin(new Date()/1000) < 0?true: false;
      isClosed = Math.sin(new Date()/1000) < 0?true: false;
      break;

      case RANDOM:
      var r = getRandomNum(this.props.id);
      var open = Math.sin(new Date()/1000 + r*2) < 0?true: false;
      isClosed = r>.5?open:!open;
      break;
    }

    this.setState({isClosed});
  }

  onDrag = (pos) => {
    const position = {...this.state.position};
    position.x = pos.x;
    position.y = pos.y;
    this.setState({position});
  }

  render() {
    const {z, ogPos, w, h, imgW, imgH, startX, startY, id, title, newFrameToTop, onDblClick} = this.props;
    const pos = this.state.position;
    // const x = pos.x + ogPos.x;
    // const y = pos.y + ogPos.y;
    const x = pos.x;
    const y = pos.y;


    var frameImg = window.AWS+ "/blinds/blinds.png";
    const styWind = {backgroundPosition: `${-x+startX}px ${-y+startY}px`, backgroundSize: `${imgW}px ${imgH}px`}; //, backgroundImage: `url(${img})`
    // const styWind = {backgroundImage: `url(${img})`, backgroundSize: "100% 100%"};
    // onDrag={(position) => this.onDrag(i, position)}

    const dx = this.props.mx - x;
    // if (this.props.id == 0) console.log(pos, ogPos);
    const dy = this.props.my - y;
    const dis = Math.sqrt(dx* dx + dy*dy);
    const isClosed = dis < 300?false:true;

    return(

      <Frame title={title} x={ogPos.x} y={ogPos.y} width={w} height={h} windowStyle={{background: "transparent"}} onDrag={this.onDrag} content={
          <div className="windowDiv">
            <div className="background1 background" style={styWind}></div>
            <div className="windowFrame" style={{backgroundImage: `url(${frameImg})`, height: isClosed?0:200}}></div>
          </div>
        }

        z={z} newFrameToTop={() => newFrameToTop(id)} onDblClick={() => onDblClick(id)}
        />
    );

  }
}



export default Window;
