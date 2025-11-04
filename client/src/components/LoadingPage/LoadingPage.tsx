import "./LoadingPage.css";

import { ShowConfig } from "../../data/CurrentShow/ShowConfig";

export default function LoadingPage(props: { progress?: number }) {
  // const windowUI = useSelector(selectWindow);
  const sty = { fontSize: window.innerWidth < 400 ? 30 : 50 };

  return (
    <div className="backgroundCover">
      <div className="LoadingPage">
        <div className="title" style={sty}>
          <div className="font-['geoFont'] text-8xl  mb-6">
            {ShowConfig.showTitle}
          </div>
          <div className="font-mono text-xs text-slate-300">
            The Wrong Biennale pavilion
          </div>
          <p>Public Access Memories</p>
          <div className="text-xs text-green-500">Loading...</div>

          {props.progress ? <p>{props.progress}%</p> : null}
        </div>
      </div>
    </div>
  );
}
