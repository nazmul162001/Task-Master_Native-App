import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { images } from "../constants";

export default function App() {
  return (
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View className="flex justify-center items-center px-4">
          {/* Logo */}
          <Image
            source={images.task}
            className="w-[170px] h-[170px]"
            resizeMode="contain"
          />

          {/* Text Section */}
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-pblack text-center">
              Simplify Your Day with{" "}
              <Text className="text-secondary-200">TaskMaster</Text>
            </Text>
          </View>

          {/* Slogan */}
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center pblack">
            Effortlessly manage your tasks and boost productivity.{" "}
            <Text className="text-secondary-200">Stay Organized</Text>, anytime,
            anywhere.
          </Text>

          {/* Custom Button */}
          <CustomButton
            title="Get Started"
            handlePress={() => router.push("/all")}
            contentContainerStyle="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
