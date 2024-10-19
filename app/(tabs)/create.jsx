import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
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
import { addTodo, editTodo } from "../redux/reducers/TodoReducer";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("On-Going");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const dispatch = useDispatch();
  const params = useLocalSearchParams();

  useEffect(() => {
    if (params?.id) {
      setIsEditMode(true);
      setTitle(params.title || "");
      setDescription(params.description || "");
      setStatus(params.status || "On-Going");
    } else {
      // Reset the form when creating a new todo
      setIsEditMode(false);
      setTitle("");
      setDescription("");
      setStatus("On-Going");
    }
  }, [params.id]); // Only run when the id changes

  const handleSubmit = () => {
    if (!title || !description) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    const todoData = {
      id: params.id || Date.now(), // Use existing id or generate a new one
      title,
      description,
      status,
    };

    if (isEditMode) {
      dispatch(editTodo(todoData));
    } else {
      dispatch(addTodo(todoData));
    }

    // Simulate a network request or async action
    setTimeout(() => {
      setIsLoading(false);

      // Clear form fields
      setTitle("");
      setDescription("");
      setStatus("On-Going"); // Reset to default status

      // Remove params and navigate to '/all' without params
      router.replace("/all"); // Use replace to clear the params in the URL
      setIsEditMode(false);
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

            {/* Description Field */}
            <FormField
              title="Description"
              value={description}
              placeholder="Enter todo description"
              handleChangeText={setDescription}
              otherStyles="w-full mt-4"
              multiline
            />

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
              title={isEditMode ? "Update Todo" : "Save Todo"}
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
