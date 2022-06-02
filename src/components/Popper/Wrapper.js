import React from 'react';

import classNames from 'classnames/bind';
import styles from './Popper.module.scss';

const cx = classNames.bind(styles);

function Wrapper({ children, className }) {
    return <div class={cx('wrapper', className)}>{children}</div>;
}

export default Wrapper;
