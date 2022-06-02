import React from 'react';

import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/84cb15bc509cfe2084425b7c8478d7cb~c5_100x100.jpeg?x-expires=1654250400&x-signature=PH3uVgjZBmOXlP5JbG1NsOmBYeA%3D"
                alt="Hoaa"
            />
            <div className={cx('info')}>
                <p className={cx('name')}>Vo Ngoc Tran</p>
                <span className={cx('username')}>vox.ngoc.traan</span>
            </div>
        </div>
    );
}

export default AccountItem;
