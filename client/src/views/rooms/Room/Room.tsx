import React from 'react';

interface Props {
    name: string;
    author: string;
    year: string;
    medium: string;
    content: JSX.Element | string;
}

const Room = ({name, author, year, medium, content}: Props) => {

    return (
        <div className="Room">
            <h1>{name}</h1>
            <div>{content}</div>
        </div>
    )
};

export default Room;