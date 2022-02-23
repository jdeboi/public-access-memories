import React, { useEffect, useState } from 'react';
import LoadingPage from '../../../components/LoadingPage/LoadingPage';
import { Carousel } from 'react-carousel-minimal';
import './RoomStefani.css';

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectWindow } from '../../../store/store';
import { doneLoadingApp } from '../../../store/window';

import ReactPlayer from 'react-player';

const Room = () => {
    const windowUI = useSelector(selectWindow);
    const dispatch = useDispatch();
    const [isPlaying, setIsPlaying] = useState(false);
    const [dim, setDim] = useState({w: 1200, h: 800});

    useEffect(() => {
        setIsPlaying(true);
    }, windowUI.compositionStarted)

    useEffect(() => {
        let w = Math.min(windowUI.contentW*.8, 1920/2);
        let h = w * (1080/1920);
        setDim({w, h});
    }, [windowUI.contentW, windowUI.contentH])

    const data = [
        {
            image: "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/stefani/lidar.jpg",
            caption: ``
        },
        {
            image: "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/stefani/bed.jpg",
            caption: ""
        },
        {
            image: "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/stefani/texture.jpg",
            caption: ""
        },

        {
            image: "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/stefani/birds.jpg",
            caption: ""
        },
        {
            image: "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/stefani/wire.jpg",
            caption: ""
        },
        {
            image: "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/stefani/wire2.jpg",
            caption: ""
        }
    ];

    const captionStyle = {
        display: 'none',
        // fontSize: '2em',
        // fontWeight: 'bold',
    }
    const slideNumberStyle = {
        display: 'none',
        // fontSize: '20px',
        // fontWeight: 'bold',
    }

    return (
        <div className="Room RoomStefani Sketch">
            <div className="Carousel-Box" style={{paddingBottom: 50}}>
                <Carousel
                    data={data}
                    time={8000}
                    width="850px"
                    height="500px"
                    captionStyle={captionStyle}
                    radius="10px"
                    slideNumber={true}
                    slideNumberStyle={slideNumberStyle}
                    captionPosition="bottom"
                    automatic={false}
                    dots={false}
                    pauseIconColor="white"
                    pauseIconSize="40px"
                    slideBackgroundColor="white"
                    slideImageFit="cover"
                    thumbnails={true}
                    thumbnailWidth="100px"
                    style={{
                        textAlign: "center",
                        maxWidth: windowUI.contentW - 20,
                        maxHeight: "500px",
                        margin: "40px auto",
                    }}
                />
            </div>
            <div className="info">
                <h2>domicile</h2>
                <p>Home is most often seen as a refuge, a place of respite, a destination, and a goal. Domestic spaces are some of the most familiar places we inhabit, but rarely are they deemed worthy of meticulous consideration. This work utilizes my own domestic life as source material for an intimate visual study of form and space using 3D scanning technology. domicile explores how the pandemic and the need to quarantine has changed our collective relationship to home, shifting it from a refuge to also that of a confine. The boundary of the home is one that protects, but also restricts. This work embraces the creative challenges and limitations of confinement by using an emerging form of technology for the hyper-documentation of what is seen everyday but rarely noticed.</p>
                <p>This project was created using 3D scanning technology called LIDAR, a type of laser scanning that creates point clouds and mesh maps of surfaces or objects. Until recently, this technology was cost prohibitive for general use and reserved for commercial processes like architectural or landscape surveying. These tools have only recently been integrated into the next generation of smartphones and tablets, putting LIDAR into the mainstream. As an artist, I am interested in using these tools for archiving the commonplace while conceptually exploring the experience of stasis during a global crisis. These scans are intentionally abstracted and record the formal qualities of space and volume, as well as absence and presence. There is also an unexpected vulnerability in virtually allowing others inside of my home. This work shifts a space, my personal space, from one that was necessarily private and inaccessible to one that can be publicly viewed and explored.</p>
            </div>

            <div className="player" style={{ width: dim.w, height: dim.h }}>
                <ReactPlayer
                    url='https://vimeo.com/503711045'
                    muted={true}
                    loop={true}
                    playsinline={true}
                    playing={isPlaying}
                    width='100%'
                    height='100%'
                />
            </div>
        </div>
    )


};

export default Room;