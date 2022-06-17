import { useState, useRef, useEffect } from 'react';
import { useDebouce } from '~/hooks';

import * as searchServices from '~/apiServices/searchServices';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const searchInputRef = useRef();

    const debouced = useDebouce(searchValue, 500);

    const handleChangeSearch = e => {
        const searchValue = e.target.value
        if(!searchValue.startsWith(' ')) {
            setSearchValue(searchValue)
        } 
    }

    useEffect(() => {
        if (!debouced.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const result = await searchServices.search(debouced);
            setSearchResult(result);

            setLoading(false);
        };

        fetchApi();
    }, [debouced]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        searchInputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
        <HeadlessTippy
            visible={showResult && searchResult.length > 0}
            interactive
            appendTo={() => document.body}
            onClickOutside={handleHideResult}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Accounts</h4>
                        {searchResult.map((result) => (
                            <AccountItem key={result.id} data={result} />
                        ))}
                    </PopperWrapper>
                </div>
            )}
        >
            <div className={cx('search')}>
                <input
                    value={searchValue}
                    type="text"
                    ref={searchInputRef}
                    placeholder="Search accounts and videos"
                    spellCheck={false}
                    onChange={(e) => handleChangeSearch(e)}
                    onFocus={() => setShowResult(true)}
                />
                {!loading && !!searchValue && (
                    <button className={cx('clear')} onClick={(e) => handleClear()}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                <button className={cx('search-btn')} onMouseDown={e => e.preventDefault()}>
                    <FontAwesomeIcon className={cx('')} icon={faMagnifyingGlass} />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
