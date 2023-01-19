import classNames from 'classnames';
import { useState, forwardRef } from 'react';
import images from '~/assests/images';
import styles from './Image.module.scss';

const Image = forwardRef(({ src, alt, classname, fallback: customFallback = images.noImage, ...props }, ref) => {
    const [fallback, setFallback] = useState('');

    const handleError = () => {
        setFallback(customFallback);
    };
    return (
        <img
            ref={ref}
            className={classNames(styles.wrapper, classname)}
            src={fallback || src}
            alt={alt}
            {...props}
            onError={handleError}
        />
    );
});

export default Image;
