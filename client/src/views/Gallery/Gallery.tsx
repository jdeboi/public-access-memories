import React from 'react';
import Frame from '../../components/Frame/Frame';
import './Gallery.css';
import GallerySketch from './GallerySketch';
import {IUsers} from '../../interfaces';

const Gallery = (props: {users: IUsers}) => {

    return (
        <div className="Gallery Sketch">
            <GallerySketch users={props.users} />
        </div>
    )
};

export default Gallery;