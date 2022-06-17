import { Link } from 'react-router-dom'
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
    faArrowRightFromBracket,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { faSun, faUser } from '@fortawesome/free-regular-svg-icons';
import 'tippy.js/dist/tippy.css';

import Tippy from '@tippyjs/react';

import 'tippy.js/dist/tippy.css'

import Search from '../Search'
import { MenuPopper } from '~/components/Popper';
import images from '~/assets/images';
import Button from '~/components/Button';
import { MessageIcon } from '~/components/Icons/Icons';
import Image from '~/components/Image'
import config from '~/config'

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia}></FontAwesomeIcon>,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                }
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion}></FontAwesomeIcon>,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard}></FontAwesomeIcon>,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    
    const handleChange = (item) => {
        switch (item.type) {
            case 'language':
                console.log(item);
                break;

            default:
        }
    };

    const currentUser = true;

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>,
            title: 'View profile',
            to: '/profile',
        },
        {
            icon: <FontAwesomeIcon icon={faSun}></FontAwesomeIcon>,
            title: 'Settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faArrowRightFromBracket}></FontAwesomeIcon>,
            title: 'Sign out',
            to: "/logout",
            separate: true
        }
    ]

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo')}>
                    <img src={images.logo} alt="logo" />
                </Link>
                
        {/* Search here */}

                <Search />

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy content="Upload video" placement="bottom" delay={[0, 200]}>
                                <Button leftIcon={<FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon>} outline >Upload</Button>
                            </Tippy>
                            <Tippy content="Message" placement="bottom" delay={[0, 200]} >
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text>Register</Button>
                            <Button rounded primary>
                                Login
                            </Button>
                        </>
                    )}
                    <MenuPopper items={currentUser ? userMenu : MENU_ITEMS} onChange={handleChange}>
                        {currentUser ? (
                            <Image
                                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/84cb15bc509cfe2084425b7c8478d7cb~c5_100x100.jpeg?x-expires=1655024400&x-signature=9WSxtfM2%2BPrBtVr3g3eusAUxZHY%3D"
                                alt="useravatar"
                                className={cx('user_avatar')}
                            />
                        ) : (
                            <button className={cx('more-button')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </MenuPopper>
                </div>
            </div>
        </header>
    );
}

export default Header;
