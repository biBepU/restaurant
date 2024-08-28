import React from 'react';

export default function StarRating({ stars, size = 18 }) {
    const styles = {
        width: size + 'px',
        height: size + 'px',
        marginRight: size / 6 + 'px',
    };

    function Star({ number }) {
        const halfNumber = number - 0.5;

        let src;
        let alt;

        if (stars >= number) {
            src = '/star-full.svg';
            alt = 'Full star';
        } else if (stars > halfNumber) {
            src = '/star-half.svg';
            alt = 'Half star';
        } else {
            src = '/star-empty.svg';
            alt = 'Empty star';
        }

        return <img src={src} style={styles} alt={alt} />;
    }

    return (
        <div className="flex flex-nowrap">
            {[1, 2, 3, 4, 5].map(number => (
                <Star key={number} number={number} />
            ))}
        </div>
    );
}
