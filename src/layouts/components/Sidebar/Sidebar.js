import React from 'react';

import Menu, { MenuItem } from './Menu';
import config from '~/config'

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For Your" to={config.routes.home} icon={<></>} />
                <MenuItem title="Following" to={config.routes.following} icon={<></>} />
                <MenuItem title="LIVE" to={config.routes.live} icon={<></>} />
            </Menu>
        </aside>
    );
}

export default Sidebar;
