import React from 'react'

import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faEarthAsia, faKeyboard } from '@fortawesome/free-solid-svg-icons'
import MenuItem from './MenuItem';
import Header from './Header';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    { 
        icon: <FontAwesomeIcon icon={faEarthAsia}></FontAwesomeIcon>,
        title: "English"
    },
    { 
        icon: <FontAwesomeIcon icon={faCircleQuestion}></FontAwesomeIcon>,
        title: "Feedback and help",
        to: "/feedback"
    },
    { 
        icon: <FontAwesomeIcon icon={faKeyboard}></FontAwesomeIcon>,
        title: "Keyboard shortcuts"
    }
]

function Menu({ children }) {

    const renderItems = () => {
        return MENU_ITEMS.map((item, index) => {
            return (
                <MenuItem data={item} key={index} />
            )
        })
    }

    return (
        <Tippy
            visible
            delay={[0, 750]}
            placement='bottom-end'
            interactive
            render={(attrs) => (
                <div className={cx('action-menu')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx("action-menu-wrapper")}>
                        <Header title="Language" />
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    )
}

export default Menu