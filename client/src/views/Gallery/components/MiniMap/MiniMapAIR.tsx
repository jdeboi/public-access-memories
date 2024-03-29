import React from 'react';
import Frame from '../../../../components/Frame/Frame';
import AvatarMiniMap from './AvatarMiniMapAIR';

import { IUser, IUsers, IMenu, IWindowUI } from '../../../../interfaces';
import { connect } from 'react-redux';
import { RootState } from '../../../../store/store';
import { setOneMenu, hideMap, toggleMap } from '../../../../store/menu';
import { Dispatch } from '@reduxjs/toolkit';


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

interface Props extends StateProps, DispatchProps, OwnProps { }

class MiniMapAIR extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    const { hasFooter, isMobile } = this.props.window;
    const { toggleMap } = this.props;

    // ????
    if (!isMobile && !hasFooter) {
      toggleMap();
    }
  }

  onHide = () => {
    this.props.hideMap();
  }

  render() {
    const { menu, users, user, x, y, window } = this.props;

    // const wine0 = { ...wineLocation[0] };
    // wine0.room = "gallery";
    // const wine1 = { ...wineLocation[1] };
    // wine1.room = "gallery";

    let isHidden = (window.isMobile || window.hasFooter) ? menu.mobile !== "map" : menu.map.isHidden;
    const dim = (window.isMobile || window.hasFooter) ? 135 : 200;

    return (
      <Frame
        title="map"
        isHidden={isHidden}
        onHide={this.onHide}
        unbounded={false}
        windowStyle={{ background: "rgba(30, 37, 42, .9)" }}
        content={
          /*<video width={dimW-2} height={dimH} muted loop autoPlay><source src={videoDimURL} type="video/mp4"></source></video>*/
          <div className="MiniMap" unselectable="on">
            <img src={"https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/gallery/map_AIR.png"} width="100%" height="100%" />
            <div className="otherAvatarsMiniMap">
              <div className="mini-avatars">
                {users ? this.getUsers(dim) : null}
                <AvatarMiniMap
                  dim={dim}
                  user={user}
                  isUser={true}
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

    )

  }

  getUsers = (dim: number) => {
    return (
      this.props.users.map((otherUser: IUser, i: number) => {
        return (
          <AvatarMiniMap
            key={i}
            dim={dim}
            isUser={false}
            user={otherUser}
          />
        )
      })
    )
  }

}

const mapStateToProps = (state: RootState) => {
  return {
    window: state.window,
    menu: state.menu,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    hideMap: () => dispatch(hideMap()),
    toggleMap: () => dispatch(toggleMap()),
    setOneMenu: (menu: string) => dispatch(setOneMenu(menu)),
  }
}

export default connect<StateProps, DispatchProps, OwnProps, RootState>(mapStateToProps, mapDispatchToProps)(MiniMapAIR);

