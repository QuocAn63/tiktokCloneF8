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

function Menu({ children, items = [], hideOnClick = false, onChange = () => { } }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

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

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1))
    }

    const renderResult = (attrs) => (
        <div className={cx('action-menu')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('action-menu-wrapper')}>
                {history.length > 1 && (
                    <Header
                        title={current.title}
                        onBack={handleBack}
                    />
                )}
                <div className={cx('menu-scrollable')}>{renderItems()}</div>
            </PopperWrapper>
        </div>
    )

    const handleResetMenu = () => {
        setHistory((prev) => prev.slice(0, 1))
    }

    return (
        <Tippy
            delay={[0, 750]}
            offset={[16, 8]}
            placement="bottom-end"
            hideOnClick={hideOnClick}
            interactive
            onHide={handleResetMenu}
            render={renderResult}
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
