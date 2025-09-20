import React from "react";
import Frame from "../../../../components/Frame/Frame";
import AvatarMiniMap from "./AvatarMiniMap";

import { IUser, IUsers, IMenu, IWindowUI } from "../../../../interfaces";
import { connect } from "react-redux";
import { RootState } from "../../../../store/store";
import { setOneMenu, hideMap, toggleMap } from "../../../../store/menu";
import { Dispatch } from "@reduxjs/toolkit";

interface OwnProps {
  users: IUsers;
  x: number;
  y: number;
  img?: string;
  backgroundStr?: string;
  gConfig?: any;
  galleryId?: number;
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

class MiniMap extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    const { hasFooter, isMobile } = this.props.window;
    const { toggleMap } = this.props;

    if (!isMobile && !hasFooter) {
      toggleMap();
    }
  }

  onHide = () => {
    this.props.hideMap();
  };

  render() {
    const { menu, users, user, x, y, window } = this.props;

    const isMobileOrFooter = window.isMobile || window.hasFooter;
    const isHidden = isMobileOrFooter
      ? menu.mobile !== "map"
      : menu.map.isHidden;
    const dim = isMobileOrFooter ? 135 : 200;

    // ✅ Optional image with fallback
    const imgSrc =
      this.props.img ??
      "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/gallery/miniMap14.png";

    return (
      <Frame
        title="map"
        isHidden={isHidden}
        onHide={this.onHide}
        unbounded={false}
        windowStyle={{
          background: this.props.backgroundStr || "rgba(255, 255, 255, .9)",
        }}
        content={
          <div className="MiniMap" unselectable="on">
            <img src={imgSrc} width="100%" height="100%" alt="Mini map" />
            <div className="otherAvatarsMiniMap">
              <div className="mini-avatars">
                {users ? this.getUsers(dim) : null}
                <AvatarMiniMap
                  dim={dim}
                  user={user}
                  isUser
                  gConfig={this.props.gConfig}
                  galleryId={this.props.galleryId}
                />
              </div>
            </div>
          </div>
        }
        width={dim}
        height={dim}
        x={x}
        y={y}
        z={1000}
      />
    );
  }

  getUsers = (dim: number) => {
    return this.props.users.map((otherUser: IUser, i: number) => (
      <AvatarMiniMap
        key={i}
        dim={dim}
        isUser={false}
        user={otherUser}
        gConfig={this.props.gConfig}
        galleryId={this.props.galleryId}
      />
    ));
  };
}

const mapStateToProps = (state: RootState) => {
  return {
    window: state.window,
    menu: state.menu,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    hideMap: () => dispatch(hideMap()),
    toggleMap: () => dispatch(toggleMap()),
    setOneMenu: (menu: string) => dispatch(setOneMenu(menu)),
  };
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(MiniMap);
