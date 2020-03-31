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
        case "COMPLETE":
            comment = "ナップサックに詰められる価値は最大で" + props.maxValue + "です。"
            break;
        default:
            comment = ""
    }
    return (
        <div className="status">
            {comment}
        </div>
    )
};

export default Status;