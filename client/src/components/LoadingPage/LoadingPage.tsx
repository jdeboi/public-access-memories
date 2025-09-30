import "./LoadingPage.css";

import { ShowConfig } from "../../data/CurrentShow/ShowConfig";

export default function LoadingPage(props: { progress?: number }) {
  // const windowUI = useSelector(selectWindow);
  const sty = { fontSize: window.innerWidth < 400 ? 30 : 50 };

  return (
    <div className="backgroundCover">
      <div className="LoadingPage">
        <div className="title" style={sty}>
          <div>{ShowConfig.galleryTitle}</div>
          <p>a wrong biennale pavilion</p>
          {/* <p><a href="/opencall">open call</a></p> */}

          {props.progress ? <p>{props.progress}%</p> : null}
        </div>
      </div>
    </div>
  );
}
