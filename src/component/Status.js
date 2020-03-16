import React from 'react';

const Status = (props) => {
    var comment;
    switch (props.status) {
        case "OVER":
            comment = "Itemがナップサックに入りません。"
            break;
        case "LOSS":
            comment = "Itemをナップサックに入れると損です。"
            break;
        case "PROFIT":
            comment = "Itemをナップサックに入れると得です。"
            break;
        default:
            comment = "Itemがナップサックに入りません。"
    }
    return (
        <div className="status">
            {comment}
        </div>
    )
};

export default Status;