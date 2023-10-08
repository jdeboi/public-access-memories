import React from 'react';
import { ShowConfig } from '../../data/CurrentShow/ShowConfig';

interface InstructionProps {
    imgURL: string,
    title: string,
    details: string
}

const Instruction = ({imgURL, title, details}: InstructionProps) => {
    return (
        
            <div className="instruction">
                <div className="faqImg"><img src={imgURL} /></div>
                <div className="instruction-txt">
                    <h4>{title}</h4>
                    <hr />
                    <p>{details}</p>
                </div>
            </div>

    )
}

export default React.memo(Instruction);
