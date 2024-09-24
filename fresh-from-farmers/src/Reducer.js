export const initialState = {
  basket: [], // Initial state for the basket
  user: null, // Initial state for user
};

// Selector to calculate the total basket amount
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item], // Add new item to the basket
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1); // Remove the item from the basket
      } else {
        console.warn(
          `Can't remove product (id: ${action.id}) as it's not in basket!`
        );
      }
      return {
        ...state,
        basket: newBasket,
      };

    case "REMOVE_ALL_FROM_BASKET":
      return {
        ...state,
        basket: [], // Clear the basket
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user, // Set the user
      };

    default:
      return state; // Return the default state if action type doesn't match
  }
};

export default reducer;
