import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    totalPrice: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addItem(state, action) {
            const foundItem = state.items.find(object => object.id === action.payload.id)

            // Если в массиве товаров нашли такой же объект как и передаваемый, то прибавляем счётчик у этого товара,
            // иначе пушим в массив товаров новый объект у которого будет всё, что было в переданном объекте и счётчик с начальным значением 1
            if (foundItem) {
                foundItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }

            // Присвоение полю totalPrice значения, которое высчитывается с помощью reduce
            state.totalPrice = state.items.reduce((sum, object) => {
                return (object.price * object.count) + sum
            }, 0)
        },

        // Фпльтрует массив items отбрасывая те элементы, у которых айди не равен айди передаваемого элемента
        removeItem(state, action) {
            state.items = state.items.filter(object => object.id !== action.payload)
        },

        clear(state) {
            state.items = []
        }


    },
})


export const { addItem, removeItem, clear } = cartSlice.actions

export default cartSlice.reducer