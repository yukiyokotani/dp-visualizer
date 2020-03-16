import React from 'react';

const Knapsack = (props) => {
    const handleChange = (cap) => {
        cap = parseInt(cap)
        if (cap >= 10) {
            //alert("Knapsack容量は10以下で設定してください")
            props.setKnapsackCap(10);
            return;
        }
        props.setKnapsackCap(cap);
    }

    return (
        <p className="knapsack__row">
            {"Knapsack Capacity: "}
            <input
                className="knapsack__input"
                value={props.knapsackCap}
                onChange={(e) => handleChange(e.target.value.replace(/\D/, ''))}
            ></input>
        </p>
    )
}

export default Knapsack;