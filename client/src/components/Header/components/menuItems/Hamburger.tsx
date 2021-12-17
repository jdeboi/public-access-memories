

import FinderSubmenu from '../FinderSubmenu';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { PageConfig } from '../../../../views/pages/PageConfig';

const Hamburger = () => {
    return (
        <FinderSubmenu
            title=""
            icon={<FontAwesomeIcon icon={faBars} />}
            specialClass="apple"
            listItems={PageConfig}
        />
    )

}

export default Hamburger;