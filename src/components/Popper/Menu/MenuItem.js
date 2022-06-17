import React from 'react'
import PropTypes from 'prop-types'
import Button from '~/components/Button'

import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
  const className = cx("menu-item", {
    separate: data.separate
  })

  return (
    <Button leftIcon={data.icon} to={data.to} onClick={onClick} className={className} >{data.title}</Button>
  )
}

MenuItem.prototype = {
  data: PropTypes.object.isRequired,
  onclick: PropTypes.func.isRequired
}

export default MenuItem