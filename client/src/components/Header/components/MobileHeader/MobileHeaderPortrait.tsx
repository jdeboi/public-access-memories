


import ArrowLi from '../menuItems/ArrowLi';

import MainMenu from '../menuItems/MainMenu';
import Hamburger from '../menuItems/Hamburger';
import { IMainMenu } from '../../../../interfaces';

interface IMBP extends IMainMenu {
  avatarClicked: () => void
}

const MobileHeaderPortrait = (props: IMBP) => {


  const headerClass = "Header menuTheme mobile";

  return (
    <header className={headerClass}>
      <ul className="left">
        <ArrowLi />
        <MainMenu isClosed={props.isClosed} isMenuOn={props.isMenuOn} />
      </ul>
      <ul className="right">
        <Hamburger />
      </ul>
    </header>
  )


}

export default MobileHeaderPortrait;