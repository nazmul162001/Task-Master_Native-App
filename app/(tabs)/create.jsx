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
import { useDispatch } from "react-redux"; // Import useDispatch
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { images } from "../../constants";
import { addTodo } from "../redux/reducers/TodoReducer";
// import { addTodo } from "../../redux/reducers/TodoReducer"; // Import addTodo action

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("On-Going");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch(); // Initialize dispatch

  const handleSubmit = () => {
    if (!title || !description) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    // Dispatch the addTodo action with the form data
    dispatch(
      addTodo({
        title,
        description,
        status,
      })
    );

    // Simulate a network request or async action
    setTimeout(() => {
      // After processing
      setIsLoading(false);
      // Reset the form fields
      setTitle("");
      setDescription("");
      setStatus("On-Going");
      router.push("/all");
    }, 2000);
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
              title="Save Todo"
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
