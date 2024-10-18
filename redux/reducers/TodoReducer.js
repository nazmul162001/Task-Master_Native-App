import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: { todos: [] },
  completed: { todos: [] },
};

export const completeTodo = createAsyncThunk(
  "todos/completeTodo",
  async ({ id, status }, { getState }) => {
    const state = getState().todos;
    const allTodos = [...state.active.todos, ...state.completed.todos];
    const updatedTodos = allTodos.map((todo) =>
      todo.id === id ? { ...todo, status } : todo
    );

    const active = updatedTodos.filter((todo) => todo.status === "On-Going");
    const completed = updatedTodos.filter(
      (todo) => todo.status === "Completed"
    );

    await AsyncStorage.setItem("todos", JSON.stringify({ active, completed }));

    return { active, completed };
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // ... other reducers ...
  },
  extraReducers: (builder) => {
    builder
      // ... other cases ...
      .addCase(completeTodo.fulfilled, (state, action) => {
        state.active.todos = action.payload.active;
        state.completed.todos = action.payload.completed;
      });
    // ... other cases ...
  },
});

// ... exports ...
