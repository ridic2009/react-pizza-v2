import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TPizzaItemProps } from "../../components/PizzaItem";
import { SortItem } from "../../components/Sort";


interface IPizzaSlice {
  items: TPizzaItemProps[];
  status: string;
}

export type SearchPizzaParams = {
  search: string;
  categoryId: number;
  currentPage: string;
  sort: SortItem;
};

export const fetchPizza = createAsyncThunk(
  "pizza/fetchPizza",
  async ({
    search,
    categoryId,
    currentPage,
    sort,
  }: SearchPizzaParams): Promise<IPizzaSlice> => {
    const response = await fetch(
      `https://64e4d6a0c55563802913d5cf.mockapi.io/pizza?${search}page=${currentPage}&limit=4&sortBy=${sort.sortMethod}${categoryId}&order=desc`
    );
    const data = await response.json();
    return { items: data, status: "success" };
  }
);

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

const initialState: IPizzaSlice = {
  items: [],
  status: Status.LOADING,
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<TPizzaItemProps[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizza.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    }),
      builder.addCase(fetchPizza.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.items = action.payload.items;
      }),
      builder.addCase(fetchPizza.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },

  // only js method

  // extraReducers: {
  //     [fetchPizza.fulfilled]: (state, action) => {

  //         state.status = 'success'
  //     },
  //     [fetchPizza.pending]: (state) => {
  //         state.status = 'pending'
  //         state.items = []
  //     },
  //     [fetchPizza.rejected]: (state, action) => {
  //         state.status = 'error cy4ka'
  //         state.items = []
  //     }
  // }
});

export const pizzaSelector = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
