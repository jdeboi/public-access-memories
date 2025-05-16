import { ReactP5Wrapper } from "@p5-wrapper/react";
import { connect } from "react-redux";
import { GallerySketchEmrys } from "./GallerySketchEmrys";
import { IUser } from "../../../interfaces";

const GallerySketchWrapper = (props: {
  user: any;
  users: any;
  isClosed: boolean;
  userMove: (x: number, y: number) => void;
  loadingDone: () => void;
  windowUI: any;
  clickedUserChat: (usr: IUser) => void;
  setUserActive: (usr: IUser) => void;
}) => {
  return (
    <ReactP5Wrapper
      sketch={GallerySketchEmrys}
      user={props.user}
      users={props.users}
      windowUI={props.windowUI}
      loadingDone={props.loadingDone}
      userMove={props.userMove}
    />
  );
};
const mapStateToProps = (state: { user: any }) => ({
  user: state.user,
});

interface DispatchProps {}

const mapDispatchToProps = (dispatch: any): DispatchProps => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GallerySketchWrapper);
