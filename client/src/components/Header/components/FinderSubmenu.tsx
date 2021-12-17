import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectWindow } from '../../../store/store';

import { IListItem } from '../../../interfaces';
import ListItem from './ListItem';


interface IFinderSubmenu {
    title: string,
    listItems: IListItem[],
    icon?: JSX.Element;
    specialClass?: string,
    ulSpecialClass?: string,
}

const FinderSubmenu = (props: IFinderSubmenu) => {
    const windowUI = useSelector(selectWindow);
    const [isHidden, setIsHidden] = useState(true);
    const [classN, setClassN] = useState("");
    const [ulSpecialClass, setUlSpecialClass] = useState("");

    const wrapper = useRef<HTMLLIElement>(null);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])

    useEffect(() => {
        const setClass = () => {
            const specialClass = props.specialClass ? props.specialClass : "";
            let ulSpecialClass = props.ulSpecialClass ? props.ulSpecialClass : "";
            if (windowUI.isMobile || windowUI.hasFooter)
                ulSpecialClass += " mobile";

            let classN = specialClass ? (" " + specialClass) : "";
            if (!(windowUI.isMobile || windowUI.hasFooter)) {
                classN += " expandable";
                classN += isHidden ? '' : ' selected';
            }
            // if (this.props.title === "losing my dimension" && this.isXXSmall())
            //   classN += " xxsmall";
            setUlSpecialClass(ulSpecialClass)
            setClassN(classN);
        }
        setClass();
    }, [isHidden, windowUI.isMobile, windowUI.hasFooter])


    const handleClickOutside = (event: MouseEvent) => {
        if (wrapper.current && !wrapper.current.contains(event.target as Node)) {
            setIsHidden(true);
        }
    }

    const toggleHidden = () => {
        setIsHidden(isH => !isH);
    }

    const getPageTitle = () => {
        if (props.icon !== undefined) {
            return props.icon;
        }
        return <span id="pageTitle">{props.title}</span>
    }




    return (
        <li className={classN} onClick={toggleHidden} ref={wrapper}>{getPageTitle()}
            <div className={`submenu ${isHidden ? '' : 'visible'}`}>
                <ul className={ulSpecialClass}>
                    {props.listItems.map((item: IListItem, i: number) => {
                        let classLN = item.classN ? item.classN : "";
                        return (
                            <ListItem
                                key={i}
                                shortcut={item.shortcut}
                                title={item.title}
                                link={item.link}
                                classN={classLN}
                            />)
                    })}
                </ul>
            </div>
        </li>
    );
}

export default FinderSubmenu
