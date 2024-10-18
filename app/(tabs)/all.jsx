import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";

const AllTasks = () => {
  const [selectedFilter, setSelectedFilter] = useState("See All");

  // Get the active and completed todos from Redux store
  const { active, completed } = useSelector((state) => state.todos);

  // Combine active and completed todos for the "All" filter
  const allTodos = [...active.todos, ...completed.todos];

  // Function to filter todos based on the selected filter
  const getFilteredTodos = () => {
    switch (selectedFilter) {
      case "Completed":
        return completed.todos;
      case "On-Going":
        return active.todos;
      default:
        return allTodos;
    }
  };

  // You no longer need the hardcoded state for todos
  const filteredTodos = getFilteredTodos();

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <ScrollView className="flex-1 p-4">
        <Text className="text-white text-2xl font-bold mb-4">
          Manage Your Daily Task
        </Text>

        <View className="mb-4 bg-gray-500 rounded-lg">
          <Picker
            selectedValue={selectedFilter}
            onValueChange={(itemValue) => setSelectedFilter(itemValue)}
            className="bg-gray-800 text-white"
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
            <Text className="text-white">{completed.todos.length} Tasks</Text>
          </TouchableOpacity>

          <TouchableOpacity className="w-[48%] bg-green-500 rounded-xl p-4 mb-4">
            <View className="w-12 h-12 bg-green-300 rounded-full mb-2 items-center justify-center">
              <Icon name="progress-clock" size={24} color="#fff" />
            </View>
            <Text className="text-white font-bold">On-Going</Text>
            <Text className="text-white">{active.todos.length} Tasks</Text>
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
              filteredTodos.map((todo, index) => (
                <View
                  key={todo.id}
                  className="bg-gray-800 p-2 rounded-lg mb-3 flex-row items-center"
                >
                  <TouchableOpacity>
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
                    <TouchableOpacity
                      onPress={() => router.push("/create")}
                      className="mr-2"
                    >
                      <Icon name="pencil" size={20} color="#3498db" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => console.log("Delete todo", index)}
                    >
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
    </SafeAreaView>
  );
};

export default AllTasks;
