import { useState, useEffect } from 'react';
// store
import { useSelector } from 'react-redux';
import { selectWindow } from '../../../store/store';
import { ShowConfig } from '../../../data/CurrentShow/ShowConfig';

export default function DetailsTour() {
    const windowUI = useSelector(selectWindow);

    const targetDate = new Date('2023-11-01T18:00:00-07:00'); // PST, UTC-8
    const [isShowTime, setIsShowTime] = useState(false);
    const [timeTillTour, setTimeTillTour] = useState("");

    let fontsBig = [40, 20, 14, 12, 10];
    let fontsSmall = [30, 18, 14, 12, 10];
    let fontsXSmall = [28, 16, 12, 12, 10];
    let fonts = fontsBig;
    windowUI.width < 350 ? fonts = fontsXSmall : (windowUI.width < 500 ? fonts = fontsSmall : fonts = fontsBig);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentDate = new Date();

            if (currentDate.getTime() >= targetDate.getTime()) {
                setIsShowTime(true);
            }

            else {
                const timeDiff = targetDate.getTime() - currentDate.getTime();

                const totalSeconds = Math.floor(timeDiff / 1000);
                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = totalSeconds % 60;

                setTimeTillTour(`${hours}h : ${minutes}m : ${seconds}s`)
            }

        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);


    return (
        <>
            {
                isShowTime ?
                    <div className="Welcome-Details">
                        <div className="Details closed" >
                            <div className="Details-txt">
                            <div> <img src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/assets/PAM_logos/logo_black_lg.png" width={100} /></div>

                               <div><img src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/assets/LOGO-BLACK_small.png" width={250} /></div>
                               
                                {/* <div><a href="/opencall">open call</a></div> */}
                                {/* {ShowConfig.showOpens.time !== "" ? <div style={{ fontSize: fonts[1], paddingBottom: "10px" }}>{ShowConfig.showOpens.time}</div> : null} */}
                            </div>
                        </div>

                    </div>
                    :
                    <div className="Welcome-Details">
                        <div className="Details closed" >
                            <div className="Details-txt">
                                <div style={{ fontSize: fonts[2], paddingBottom: "30px" }}>Join us for the</div>
                                <div style={{ fontSize: fonts[0], paddingBottom: "30px" }}>GALLERY TOUR</div>
                                <div style={{ fontSize: fonts[2], paddingBottom: "10px" }}>Going live in:</div>
                                <div style={{ fontSize: fonts[1], paddingBottom: "5px", color: "red"}}>{timeTillTour}</div>
                                {/* <div><a href="/opencall">open call</a></div> */}
                                {/* {ShowConfig.showOpens.time !== "" ? <div style={{ fontSize: fonts[1], paddingBottom: "10px" }}>{ShowConfig.showOpens.time}</div> : null} */}
                            </div>
                        </div>

                    </div>
            }
        </>
    )
}
