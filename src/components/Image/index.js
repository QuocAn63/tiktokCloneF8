import { forwardRef, useState } from 'react';
import images from '~/assets/images';

import styles from './Image.module.scss';

import classNames from 'classnames';

const Image = forwardRef(({ src, alt, fallback: customFallback = images.defaultImage, className, ...props }, ref) => {
    const [fallback, setFallback] = useState('');

    const handleError = () => {
        setFallback(customFallback);
    };

    return (
        <img
            ref={ref}
            src={fallback || src}
            className={classNames(styles.wrapper, className)}
            onError={handleError}
            alt={alt}
            {...props}
        />
    );
});

export default Image;
