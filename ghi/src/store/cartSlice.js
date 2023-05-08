import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Cart from "../components/Cart";



const initialState = {
    cartItem: localStorage.getItem("cartItem") ?
              JSON.parse(localStorage.getItem("cartItem")) :
              [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add(state, action) {
            const itemIndex = state.cartItem.findIndex((item) => item.id === action.payload.id);
            if (itemIndex >= 0) {
                state.cartItem[itemIndex].cartQuantity += 1;
                toast.info(`increased ${state.cartItem[itemIndex].item_name} quanitity`, {
                    position: "bottom-left",
                })
            } else {
                const tempItem = {...action.payload, cartQuantity: 1};
                state.cartItem.push(tempItem);
                toast.success(`${action.payload.item_name} is added to the cart`, {
                    position: "bottom-left",
                })
            }

            localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
        },

        remove(state, action) {
            const nextCartItem = state.cartItem.filter(item => item.id !== action.payload.id);

            state.cartItem = nextCartItem;
            localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
            toast.error(`${action.payload.item_name} is removed from the cart`, {
                    position: "bottom-left",
                })
        },
        decreaseCart(state, action){
            const itemIndex = state.cartItem.findIndex(
                item => item.id === action.payload.id
            );

            if (state.cartItem[itemIndex].cartQuantity > 1) {
                state.cartItem[itemIndex].cartQuantity -= 1;
                toast.info(`${action.payload.item_name} is decreased`, {
                    position: "bottom-left",
                })
            } else if (state.cartItem[itemIndex].cartQuantity === 1) {
                const nextCartItem = state.cartItem.filter(item => item.id !== action.payload.id);
                state.cartItem = nextCartItem;
                toast.error(`${action.payload.item_name} is removed from the cart`, {
                        position: "bottom-left",
                    })
            }
            localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
        },
        clearCart(state, action){
            state.cartItem = [];
            toast.error(`Cart is cleared`, {
                        position: "bottom-left",
                    });
            localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
        },
        getTotal(state, action){
            let {total, quantity} = state.cartItem.reduce((cartTotal, item) => {
                const { item_price, cartQuantity } = item;
                const itemTotal = item_price * cartQuantity; 

                cartTotal.total += itemTotal;
                cartTotal.quantity += cartQuantity;

                return cartTotal;
            }, {
                total: 0,
                quantity: 0,
            });

            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        },
    }
});

export const{ add,remove, decreaseCart,  clearCart, getTotal} = cartSlice.actions;
export default cartSlice.reducer;
export const selectAllCarts = (state) => state.cart; 