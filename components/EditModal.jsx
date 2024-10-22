import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { editTodo } from "../app/redux/reducers/TodoReducer";
import { images } from "../constants";
import CustomButton from "./CustomButton";
import FormField from "./FormField";

const EditTodoModal = ({ isVisible, todo, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("On-Going");
  const [isLoading, setIsLoading] = useState(false);

  // New state for errors
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setStatus(todo.status);
    }
  }, [todo]);

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

  const handleUpdate = () => {
    if (!validateFields()) {
      return;
    }

    setIsLoading(true);

    const updatedTodo = {
      id: todo.id,
      title,
      description,
      status,
    };

    dispatch(editTodo(updatedTodo));

    setIsLoading(false);
    onClose(); // Close the modal after update
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black bg-opacity-70">
        <SafeAreaView className="w-[90%] bg-black rounded-lg p-4">
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4">
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

              {/* Update Button */}
              <CustomButton
                title="Update Todo"
                handlePress={handleUpdate}
                containerStyles="w-full"
                isLoading={isLoading}
              />

              {/* Close Modal Button */}
              <CustomButton
                title="Cancel"
                handlePress={onClose}
                containerStyles="w-full mt-4 bg-red-500"
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default EditTodoModal;
