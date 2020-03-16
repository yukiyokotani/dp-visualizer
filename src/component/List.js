import React from 'react';

const List = (props) => {
    return (
        <table className="item-list">
            <tbody>
                <tr>
                    <th>Item</th>
                    <th>Weight</th>
                    <th>Value</th>
                </tr>
                {props.items.map((item, i) => (
                    <tr key={i}>
                        <td className={item.isIncluded ? "included" : ""}>{i + 1}</td>
                        <td>{item.weight}</td>
                        <td className={item.isReffered ? "reffered" : ""}>{item.value}</td>
                        <td><button className="delete-button" onClick={() => props.deleteItem(i)}>×</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
};

export default List;