import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface ICartItem {
    id: string,
    count: number,
    price: number,
    title: string,
    imageUrl: string,
    type: string,
    size: number,

}

interface ICartSlice {
    items: ICartItem[],
    totalPrice: number
}

const initialState: ICartSlice = {
    items: [],
    totalPrice: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addItem(state, action: PayloadAction<ICartItem>) {
            const foundItem = state.items.find(object => object.id === action.payload.id)

            // Если в массиве товаров нашли такой же объект как и передаваемый, то прибавляем счётчик у этого товара,
            // иначе пушим в массив товаров новый объект у которого будет всё, что было в переданном объекте и счётчик с начальным значением 1
            if (foundItem) {
                foundItem.count++

                if (foundItem.count > 99) {
                    foundItem.count--
                }
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
        removeItem(state, action: PayloadAction<ICartItem>) {

            const filteredItems = state.items.filter(object => object.id !== action.payload.id)

            // Убавляем итоговую цену на стоимость пиццы умноженную на количество пицц (цену и количество берём из action.payload)
            state.totalPrice = state.totalPrice - (action.payload.price * action.payload.count)

            state.items = filteredItems
            
        },

        minus(state, action: PayloadAction<ICartItem>) {
            const foundItem = state.items.find(object => object.id === action.payload.id)

            if (foundItem && foundItem.count > 1) {
                foundItem.count--
                state.totalPrice = state.totalPrice - foundItem.price
            }
        },

        clear(state) {
            state.items = []
            state.totalPrice = 0
        }


    },
})

export const cartSelector = (state: RootState) => state.cart

export const { addItem, removeItem, clear, minus } = cartSlice.actions

export default cartSlice.reducer