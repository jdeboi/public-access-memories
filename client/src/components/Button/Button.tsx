import * as React from 'react';

export interface IButtonProps {
   
    onClick: () => void;
    content: any
    disabled?: boolean | false;
}

export default function Button(props: IButtonProps) {
    return (
        <button className="standardButton"
            disabled={props.disabled}
            onClick={props.onClick}>
            {props.content}
        </button>
    );
}
