import { View, Image, ScrollView, Pressable } from "react-native";
import { Text } from "~/components/ui/text";
import { useRouter } from "expo-router";

export default function Screen() {
  const router = useRouter();
  return (
    <ScrollView className="h-full bg-secondary">
      <View className="min-h-[80vh] flex justify-center items-center gap-5 p-5">
        <Image
          source={require("../assets/images/logo.png")}
          resizeMode="contain"
          style={{ width: 300, height: 300 }}
        />

        <Pressable
          onPress={() => router.push("/(auth)/sign-in")}
          className="w-full border rounded-xl"
        >
          <View className="w-full text-center rounded-lg p-5 items-center flex justify-center overflow-hidden">
            <Text className="text-xl ">Get Started</Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
}
