import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { images } from "../../constants";
import { addTodo } from "../redux/reducers/TodoReducer";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("On-Going");
  const [isLoading, setIsLoading] = useState(false);

  // New state for errors
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const dispatch = useDispatch();

  const validateFields = () => {
    let valid = true;

    if (title.length < 6) {
      setTitleError("Title must be at least 6 characters long");
      valid = false;
    } else {
      setTitleError("");
    }

    if (description.length < 10) {
      setDescriptionError("Description must be at least 10 characters long");
      valid = false;
    } else {
      setDescriptionError("");
    }

    return valid;
  };

  const handleSubmit = () => {
    if (!validateFields()) {
      return;
    }

    setIsLoading(true);

    const todoData = {
      id: Date.now(), // Generate a new ID for the todo
      title,
      description,
      status,
    };

    // Add the new todo
    dispatch(addTodo(todoData));

    // Simulate a network request or async action
    setTimeout(() => {
      setIsLoading(false);

      // Clear form fields
      setTitle("");
      setDescription("");
      setStatus("On-Going"); // Reset to default status

      // Navigate to '/all' with newTodoId param to trigger animation
      router.push({
        pathname: "/all",
        params: { newTodoId: todoData.id }, // Pass newTodoId to the AllTasks component
      });
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          className="px-4"
        >
          <View className="flex-1 justify-center items-center">
            {/* Logo */}
            <Image
              source={images.task}
              className="w-[170px] h-[170px] mb-10"
              resizeMode="contain"
            />

            {/* Title Field */}
            <FormField
              title="Title"
              value={title}
              placeholder="Enter todo title"
              handleChangeText={setTitle}
              otherStyles="w-full"
            />
            {/* Error Message for Title */}
            {titleError ? (
              <Text className="text-red-500 text-sm w-full mt-2">
                {titleError}
              </Text>
            ) : null}

            {/* Description Field */}
            <FormField
              title="Description"
              value={description}
              placeholder="Enter todo description"
              handleChangeText={setDescription}
              otherStyles="w-full mt-4"
              multiline
            />
            {/* Error Message for Description */}
            {descriptionError ? (
              <Text className="text-red-500 text-sm w-full mt-2">
                {descriptionError}
              </Text>
            ) : null}

            {/* Status Switch */}
            <View className="w-full flex-row justify-between items-center my-4">
              <Text className="text-base text-gray-100 font-psemibold">
                Status: {status}
              </Text>
              <Switch
                value={status === "Completed"}
                onValueChange={(value) =>
                  setStatus(value ? "Completed" : "On-Going")
                }
                className="ml-4"
              />
            </View>

            {/* Save Button */}
            <CustomButton
              title="Create Todo"
              handlePress={handleSubmit}
              containerStyles="w-full"
              isLoading={isLoading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Create;
