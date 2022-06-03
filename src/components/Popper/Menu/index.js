import React, { useState } from 'react'

import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper'
import MenuItem from './MenuItem';
import Header from './Header';

const cx = classNames.bind(styles);

function Menu({ children, items = [], onChange = () => {} }) {
    const [history, setHistory] = useState([{ data: items}])
    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children
            
            return (
                <MenuItem data={item} key={index} onClick={() => {
                    if(isParent) {
                        setHistory(prev => [...prev, item.children])
                    } else {
                        onChange(item)
                    }
                }}/>
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
                        {history.length > 1 && <Header title="Language" onBack={() => setHistory(prev => prev.slice(0, prev.length - 1))} />}
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