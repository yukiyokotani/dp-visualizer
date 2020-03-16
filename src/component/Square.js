import React from 'react';

const Square = (props) => {
    let className = props.isInProcess ? "isInProcess" : "";
    className = props.isReffered ? className + " isReffered" : className;
    className = props.isBaseReffered ? className + " isBaseReffered" : className;

    return (
        <td className={className}>
            {props.isProcessed ? props.value : ""}
        </td>
    )
}

export default Square;