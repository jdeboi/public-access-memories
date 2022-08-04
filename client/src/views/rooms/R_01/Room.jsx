import React, {useRef, useEffect} from 'react';

// store
import { useSelector } from 'react-redux';
import { selectWindow } from '../../../store/store';


const Room = () => {
    let lURL = "/christina";
    if (process.env.NODE_ENV === "development") {
        lURL = "http://localhost:3001/christina"
    }

    return (
        <div className="Room R_03 Sketch">
            <iframe 
            src={lURL}
            width={"100%"}
             height={"100%"}
             / >
        </div>
    )
};

export default Room;

// import React, { useState, useEffect, useRef } from 'react';
// import './Christina.css';

// const Room = () => {
//     const lastDiv = useRef();
//     const [scrollPosition, setScrollPosition] = useState(0);

//     const handleScroll = () => {
//         // const position = window.pageYOffset;
//         const y = lastDiv.current.offsetTop;
//         console.log(y);
//         setScrollPosition(y);
//     };

//     // useEffect(() => {
//     //     window.addEventListener('scroll', handleScroll, { passive: true });

//     //     return () => {
//     //         window.removeEventListener('scroll', handleScroll);
//     //     };
//     // }, []);

   
//     // useEffect(() => {
//     //     const y = lastDiv.current.scrollPosition;
//     //     console.log(y);
//     // }, [window.offsetTop])

//     const pointerClass = true ? "goPointers" : "noPointers";

//     return (
//         <div className="Room Sketch">
//             <div className="Christina" onWheel={(e) => handleScroll(e)}>
//                 <div className="below">
//                     <img src="https://live.staticflickr.com/65535/52210892799_f244154d36_k_d.jpg" />
//                     <img src="https://live.staticflickr.com/65535/52211109455_9c690c6574_k_d.jpg" />
//                     <img src="https://live.staticflickr.com/65535/52211109430_83f8a27fa6_k_d.jpg" />
//                     <img src="https://live.staticflickr.com/65535/52210642823_985fabc84d_k_d.jpg" />
//                     <img src="https://live.staticflickr.com/65535/52210893084_ec9070db0b_k_d.jpg" />
//                     <img src="https://live.staticflickr.com/65535/52210893109_5dde6db6d8_k_d.jpg" />
//                     <img src="https://live.staticflickr.com/65535/52210643163_1de927d220_k_d.jpg" />
//                     <img src="https://live.staticflickr.com/65535/52210620391_0df01cc1d3_k_d.jpg" />
//                     <img src="https://live.staticflickr.com/65535/52211109700_c6a5d028ec_k_d.jpg" />
//                 </div>
//                 <div className={`pageoverlay style1 ${pointerClass}`} >
//                     <div className="overlay-content scrolling-element-inside">
//                         <img className="left shift turnup style2" src="https://live.staticflickr.com/65535/52210943494_9f5212a485_w_d.jpg" />

//                         flatbed___
//                         <img className="right shiftdown style3"
//                             src="https://live.staticflickr.com/65535/52210670671_c7c7be935a_w_d.jpg" />
//                         <img className="left opacity-effect turnup style4"
//                             src="https://live.staticflickr.com/65535/52210944174_0298ba10d0_c_d.jpg" />
//                         <img className="right blur-effect turnup style5"
//                             src="https://live.staticflickr.com/65535/52209667687_45f8ff1021_c_d.jpg" />
//                         <img className="left blur-reverse turnup style6"
//                             src="https://live.staticflickr.com/65535/52211160880_556d91be6c_w_d.jpg" />
//                         <img className="right rotate style7"
//                             src="https://live.staticflickr.com/65535/52210694633_3caf1ce6eb_w_d.jpg" />
//                         <img className="right shrink-effect turnup style8"
//                             src="https://live.staticflickr.com/65535/52210944954_12e6ce1b44_w_d.jpg" />
//                         <img className="left disappear turnup style9"
//                             src="https://live.staticflickr.com/65535/52209669082_137bf814d7_c_d.jpg" />
//                         <div id="lastID" ref={lastDiv} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// };

// export default Room;
