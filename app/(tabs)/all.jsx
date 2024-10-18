import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AllTasks = () => {
  const [selectedFilter, setSelectedFilter] = useState("See All");

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="flex-1 p-4">
        <Text className="text-white text-2xl font-bold mb-4">
          Manage Your Daily Task
        </Text>

        <View className="mb-4">
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
            <Text className="text-white font-bold">Hi John,</Text>
            <Text className="text-white">Good Morning</Text>
          </TouchableOpacity>

          <TouchableOpacity className="w-[48%] bg-purple-500 rounded-xl p-4 mb-4">
            <View className="w-12 h-12 bg-purple-300 rounded-full mb-2 items-center justify-center">
              <Icon name="format-list-checks" size={24} color="#fff" />
            </View>
            <Text className="text-white font-bold">All Tasks</Text>
            <Text className="text-white">0 Tasks</Text>
          </TouchableOpacity>

          <TouchableOpacity className="w-[48%] bg-yellow-500 rounded-xl p-4 mb-4">
            <View className="w-12 h-12 bg-yellow-300 rounded-full mb-2 items-center justify-center">
              <Icon name="check-circle" size={24} color="#fff" />
            </View>
            <Text className="text-white font-bold">Completed</Text>
            <Text className="text-white">0 Tasks</Text>
          </TouchableOpacity>

          <TouchableOpacity className="w-[48%] bg-green-500 rounded-xl p-4 mb-4">
            <View className="w-12 h-12 bg-green-300 rounded-full mb-2 items-center justify-center">
              <Icon name="progress-clock" size={24} color="#fff" />
            </View>
            <Text className="text-white font-bold">On-Going</Text>
            <Text className="text-white">0 Tasks</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllTasks;
