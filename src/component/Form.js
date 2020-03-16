import React, { useState } from 'react';

const Form = (props) => {
    const [newItem, setNewItem] = useState({ weight: 0, value: 0 });

    return (
        <div className="item__form">
            <span className="item__row">{"Weight: "}
                <input
                    className="item__input"
                    value={newItem.weight}
                    onChange={(e) => setNewItem({ weight: e.target.value.replace(/\D/, ''), value: newItem.value })}
                />
            </span>
            <span className="item__row">{"Value: "}
                <input
                    className="item__input"
                    value={newItem.value}
                    onChange={(e) => setNewItem({ weight: newItem.weight, value: e.target.value.replace(/\D/, '') })}
                />
            </span>
            <button
                className="add-button"
                onClick={() => props.addItem(newItem.weight, newItem.value)}
            >+
            </button>
        </div>
    )
}

export default Form;
