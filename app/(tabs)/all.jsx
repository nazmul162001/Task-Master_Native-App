import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { completeTodo, deleteTodo } from "../redux/reducers/TodoReducer";

// Move filtering logic outside the component
const getFilteredTodos = (todos, filter) => {
  switch (filter) {
    case "Completed":
      return todos.filter((todo) => todo.status === "Completed");
    case "On-Going":
      return todos.filter((todo) => todo.status !== "Completed");
    default:
      return todos;
  }
};

const AllTasks = () => {
  const [selectedFilter, setSelectedFilter] = useState("See All");

  // Use more specific selectors
  const activeTodos = useSelector((state) => state.todos.active.todos);
  const completedTodos = useSelector((state) => state.todos.completed.todos);

  // console.log("Active Todos:", JSON.stringify(activeTodos, null, 2)); // Log active todos
  // console.log("Completed Todos:", JSON.stringify(completedTodos, null, 2)); // Log completed todos

  const dispatch = useDispatch();

  // Memoize allTodos
  const allTodos = useMemo(
    () => [...activeTodos, ...completedTodos],
    [activeTodos, completedTodos]
  );

  const todosState = useSelector((state) => state.todos);
  console.log(
    "Redux state after editTodo:",
    JSON.stringify(todosState, null, 2)
  ); // Display the full state
  // Memoize filteredTodos
  // const filteredTodos = useMemo(
  //   () => getFilteredTodos(allTodos, selectedFilter),
  //   [allTodos, selectedFilter]
  // );

  const filteredTodos = useMemo(() => {
    const filtered = getFilteredTodos(allTodos, selectedFilter);
    console.log("Filtered Todos after state update:", filtered); // Re-check filtering
    return filtered;
  }, [allTodos, selectedFilter]);

  // useMemo(() => {
  //   const filtered = getFilteredTodos(allTodos, selectedFilter);
  //   console.log("Filtered Todos:", filtered); // Log to see if filtering works correctly
  //   return filtered;
  // }, [allTodos, selectedFilter]);

  // Use useCallback for functions passed as props
  const toggleTodoStatus = useCallback(
    (todo) => {
      dispatch(completeTodo({ id: todo.id }));
      console.log("Todo after dispatch:", todo);
      const statusMessage =
        todo.status === "Completed"
          ? "Marked as On-Going"
          : "Marked as Completed";
      Toast.show({
        type: "success",
        text1: "Todo Status Updated",
        text2: statusMessage,
        topOffset: 50,
      });
    },
    [dispatch]
  );

  const handleDeleteTodo = useCallback(
    (todoId) => {
      dispatch(deleteTodo({ id: todoId }));
      Toast.show({
        type: "success",
        text1: "Todo Deleted",
        text2: "The task has been successfully deleted.",
        topOffset: 50,
      });
    },
    [dispatch]
  );

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="flex-1 p-4">
        <Text className="text-white text-2xl font-bold mb-4">
          Manage Your Daily Task
        </Text>

        <View className="mb-4 bg-gray-800 text-white rounded-lg">
          <Picker
            selectedValue={selectedFilter}
            onValueChange={(itemValue) => setSelectedFilter(itemValue)}
            style={{ color: "white" }}
          >
            <Picker.Item label="See All" value="See All" />
            <Picker.Item label="Completed" value="Completed" />
            <Picker.Item label="On-Going" value="On-Going" />
          </Picker>
        </View>

        <View className="flex-row flex-wrap justify-between">
          <TouchableOpacity className="w-[48%] bg-blue-500 rounded-xl p-4 mb-4">
            <View className="w-12 h-12 bg-blue-300 rounded-full mb-2 items-center justify-center">
              <Icon name="account" size={24} color="#fff" />
            </View>
            <Text className="text-white font-bold">Hi User,</Text>
            <Text className="text-white">Good Morning</Text>
          </TouchableOpacity>

          <TouchableOpacity className="w-[48%] bg-purple-500 rounded-xl p-4 mb-4">
            <View className="w-12 h-12 bg-purple-300 rounded-full mb-2 items-center justify-center">
              <Icon name="format-list-checks" size={24} color="#fff" />
            </View>
            <Text className="text-white font-bold">All Tasks</Text>
            <Text className="text-white">{allTodos.length} Tasks</Text>
          </TouchableOpacity>

          <TouchableOpacity className="w-[48%] bg-yellow-500 rounded-xl p-4 mb-4">
            <View className="w-12 h-12 bg-yellow-300 rounded-full mb-2 items-center justify-center">
              <Icon name="check-circle" size={24} color="#fff" />
            </View>
            <Text className="text-white font-bold">Completed</Text>
            <Text className="text-white">{completedTodos.length} Tasks</Text>
          </TouchableOpacity>

          <TouchableOpacity className="w-[48%] bg-green-500 rounded-xl p-4 mb-4">
            <View className="w-12 h-12 bg-green-300 rounded-full mb-2 items-center justify-center">
              <Icon name="progress-clock" size={24} color="#fff" />
            </View>
            <Text className="text-white font-bold">On-Going</Text>
            <Text className="text-white">{activeTodos.length} Tasks</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text className="text-center text-white text-2xl font-bold mb-4">
            {selectedFilter === "Completed"
              ? "Completed"
              : selectedFilter === "On-Going"
              ? "On-Going"
              : "All"}{" "}
            Todos
          </Text>
          <View className="rounded-lg">
            {filteredTodos.length > 0 ? (
              filteredTodos.map((todo) => (
                <View
                  key={todo.id}
                  className="bg-gray-800 p-2 rounded-lg mb-3 flex-row items-center"
                >
                  <TouchableOpacity onPress={() => toggleTodoStatus(todo)}>
                    <Icon
                      name={
                        todo.status === "Completed"
                          ? "check-circle"
                          : "circle-outline"
                      }
                      size={20}
                      color={
                        todo.status === "Completed" ? "#4CAF50" : "#808080"
                      }
                    />
                  </TouchableOpacity>
                  <View className="ml-2 flex-1">
                    <Text
                      className={`text-white text-lg font-semibold ${
                        todo.status === "Completed" ? "line-through" : ""
                      }`}
                    >
                      {todo.title}
                    </Text>
                    <Text
                      className={`text-gray-400 ${
                        todo.status === "Completed" ? "line-through" : ""
                      }`}
                    >
                      {todo.description}
                    </Text>
                  </View>
                  <View className="flex-row">
                    {/* Edit Button - Pass the todo data */}
                    <TouchableOpacity
                      onPress={() =>
                        router.push({
                          pathname: "/create",
                          params: {
                            id: todo.id,
                            title: todo.title,
                            description: todo.description,
                            status: todo.status,
                          },
                        })
                      }
                      className="mr-2"
                    >
                      <Icon name="pencil" size={20} color="#3498db" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteTodo(todo.id)}>
                      <Icon name="trash-can" size={20} color="#e74c3c" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <View className="bg-gray-800 p-4 rounded-lg">
                <Text className="text-white text-center text-lg">
                  No tasks found for the selected filter.
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.toastContainer}>
        <Toast />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
});

export default AllTasks;
