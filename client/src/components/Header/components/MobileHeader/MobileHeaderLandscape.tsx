





import ArrowLi from '../menuItems/ArrowLi';

import MainMenu from '../menuItems/MainMenu';
import Hamburger from '../menuItems/Hamburger';
import { IMainMenu } from '../../../../interfaces';

const MobileHeaderLandscape = (props: IMainMenu) => {


  const headerClass = "Header menuTheme mobile";

  return (
    <header className={headerClass}>
      <ul className="left">
        {/* <ArrowLi /> */}
        <Hamburger />
        <MainMenu isClosed={props.isClosed} isMenuOn={props.isMenuOn} />
      </ul>
    </header>
  )


}

export default MobileHeaderLandscape;

