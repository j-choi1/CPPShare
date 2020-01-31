import React from 'react';

const Image = ({
    className,
    src,
    alt,
    ...props
}: Props): React.ReactElement => (
    <img src={src} className={className} alt={alt} {...props} />
);

type Props = {
    className?: string;
    src: string;
    alt?: string;
};

export default Image;
