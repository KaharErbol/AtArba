import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset, incrementByAmount } from "../store/cartItemCounterSlice";
import { useState } from "react";

const Counter = () => {
    const  count = useSelector(state => state.counter.count);
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount] = useState(0);
    const addValue = Number(incrementAmount) || 0;
    const resetAll = () => {
        setIncrementAmount(0);
        dispatch(reset());
    }
    return (
        <div>
            <p>{count}</p>
            <div>
                <button className="counter-btn" onClick={() => dispatch(increment())} >+</button>
                <button className="counter-btn" onClick={() => dispatch(decrement())}>-</button>
            </div>
            <div>
                <button onClick={resetAll}>Reset</button>
            </div>
            <div>
                <input
                    type="text"
                    value={incrementAmount}
                    onChange={(e) => setIncrementAmount(e.target.value)}
                />
                <button onClick={() => dispatch(incrementByAmount(addValue))}>Add Amount</button>
            </div>

        </div>
    )
}

export default Counter;