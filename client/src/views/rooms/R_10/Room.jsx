import React, { useEffect, useState } from 'react';

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectWindow } from '../../../store/store';

import { getCenterModalDim } from '../../../components/CenterModal/helpers';

import './RoomNathan.css';
import { positions } from '@mui/system';

const Room = () => {
    const windowUI = useSelector(selectWindow);
    const dispatch = useDispatch();
    const [w, setW] = useState(getCenterModalDim(windowUI, false, 789, 789).w)
    const [mouseText, setMouseText] = useState(0);

    useEffect(() => {
        setW(getCenterModalDim(windowUI, false, 789, 789).w)

    }, [windowUI.contentW, windowUI.contentH]);

    const onHover = (id) => {
        setMouseText(id);
        if (id === 0) {
            // setMouseText("");
        }
        else if (id === 1) {
            // setMouseText("Spawn Point I (Overworld) [.25 edit]");
        }
        else if (id === 2) {
            // setMouseText("Spawn Point II (Nether) [.25 edit]");
        }
        else {
            // setMouseText("Spawn Point III (End) [.25 edit]");
        }
    }

    return (
        <div className="Room RoomNathan Sketch">
            <div className="NathanImages">
                <div className="responsive" >
                    <div className="spawnPoint" onMouseEnter={() => setMouseText(1)}
                        onMouseLeave={() => setMouseText(0)} >
                        <div className="spawnPointImg" id="spawnPoint1"></div>
                    </div>
                    <div className="label" style={{ display: "block" }}>
                    {/* (mouseText == 1 ? "block" : "none") */}
                        <div><span className="title">Spawn Point I (Overworld)</span> [.25 edit]</div>
                        <div>2021</div>
                        <div>Altered bitmap image rendered from the 2b2t.org anarchy Minecraft server.</div>
                        <div>945 x 945px</div>
                    </div>
                </div>
                <div className="responsive">
                    <div className="spawnPoint" onMouseEnter={() => setMouseText(2)}
                        onMouseLeave={() => setMouseText(0)}>
                        <div className="spawnPointImg" id="spawnPoint2"></div>
                    </div>
                    <div className="label" >
                        <div><span className="title">Spawn Point II (Nether)</span> [.25 edit]</div>
                        <div>2021</div>
                        <div>Altered bitmap image rendered from the 2b2t.org anarchy Minecraft server.</div>
                        <div>945 x 945px</div>
                    </div>
                </div>
                <div className="responsive">
                    <div className="spawnPoint" onMouseEnter={() => setMouseText(3)}
                        onMouseLeave={() => setMouseText(0)}>
                        <div className="spawnPointImg" id="spawnPoint3"></div>
                    </div>
                    <div className="label" >
                        <div><span className="title">Spawn Point III (End)</span> [.25 edit]</div>
                        <div>2021</div>
                        <div>Altered bitmap image rendered from the 2b2t.org anarchy Minecraft server.</div>
                        <div>945 x 945px</div>
                    </div>
                </div>
                {/* <div className="mouseTip" style={{left: position.x, }}>{mouseText}</div> */}
            </div>

        </div>
    )
};

export default Room;