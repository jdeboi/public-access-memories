import React from "react";
import Frame from "../../../../components/Frame/Frame";
import AvatarMiniMap from "./AvatarMiniMapResidency2026";

import { IUser, IUsers, IMenu, IWindowUI } from "../../../../interfaces";
import { connect } from "react-redux";
import { RootState } from "../../../../store/store";
import { setOneMenu, hideMap, toggleMap } from "../../../../store/menu";
import { Dispatch } from "@reduxjs/toolkit";

// Replace with the hosted URL once the map image is ready
const MINIMAP_IMG_URL =
  "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/residency/assets/2026/minimap_res2026.jpg";

interface OwnProps {
  users: IUsers;
  x: number;
  y: number;
}

interface DispatchProps {
  toggleMap: () => void;
  hideMap: () => void;
  setOneMenu: (menu: string) => void;
}

interface StateProps {
  menu: IMenu;
  user: IUser;
  window: IWindowUI;
}

interface Props extends StateProps, DispatchProps, OwnProps {}

class MiniMapResidency2026 extends React.Component<Props> {
  componentDidMount() {
    const { hasFooter, isMobile } = this.props.window;
    if (!isMobile && !hasFooter) {
      this.props.toggleMap();
    }
  }

  onHide = () => {
    this.props.hideMap();
  };

  getUsers = (miniW: number, miniH: number) => {
    return this.props.users.map((otherUser: IUser, i: number) => (
      <AvatarMiniMap
        key={i}
        miniW={miniW}
        miniH={miniH}
        isUser={false}
        user={otherUser}
      />
    ));
  };

  render() {
    const { menu, users, user, x, y, window } = this.props;
    const isMobileView = window.isMobile || window.hasFooter;
    const isHidden = isMobileView ? menu.mobile !== "map" : menu.map.isHidden;

    // 4:3 to match world dimensions (32 wide × 24 tall)
    const miniW = isMobileView ? 180 : 240;
    const miniH = isMobileView ? 135 : 180;

    return (
      <Frame
        title="map"
        isHidden={isHidden}
        onHide={this.onHide}
        unbounded={false}
        windowStyle={{ background: "rgba(255, 255, 255, .9)" }}
        content={
          <div className="MiniMap" unselectable="on">
            {MINIMAP_IMG_URL && (
              <img src={MINIMAP_IMG_URL} width="101%" height="100%" />
            )}
            <div className="otherAvatarsMiniMap">
              <div className="mini-avatars">
                {users ? this.getUsers(miniW, miniH) : null}
                <AvatarMiniMap
                  miniW={miniW}
                  miniH={miniH}
                  user={user}
                  isUser={true}
                />
              </div>
            </div>
          </div>
        }
        width={miniW}
        height={miniH}
        x={x}
        y={y}
        z={1000}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  window: state.window,
  menu: state.menu,
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  hideMap: () => dispatch(hideMap()),
  toggleMap: () => dispatch(toggleMap()),
  setOneMenu: (menu: string) => dispatch(setOneMenu(menu)),
});

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(MiniMapResidency2026);
