import React, { useState } from 'react';
import PropTypes from 'prop-types'

import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';

const cx = classNames.bind(styles);

function Menu({ children, items = [], hideOnClick = false, onChange = () => {} }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    console.log(current)

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItem
                    data={item}
                    key={index}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    return (
        <Tippy
            delay={[0, 750]}
            offset={[16, 8]}
            placement="bottom-end"
            hideOnClick={hideOnClick}
            interactive
            onHide={() => setHistory((prev) => prev.slice(0, 1))}
            render={(attrs) => (
                <div className={cx('action-menu')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('action-menu-wrapper')}>
                        {history.length > 1 && (
                            <Header
                                title={current.title}
                                onBack={() => setHistory((prev) => prev.slice(0, prev.length - 1))}
                            />
                        )}
                        <div className={cx('menu-scrollable')}>{renderItems()}</div>
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

Menu.prototype = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array.isRequired,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
}

export default Menu;
