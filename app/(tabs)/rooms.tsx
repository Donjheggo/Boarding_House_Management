import { View, SafeAreaView, ScrollView } from "react-native";
import { Text } from "~/components/ui/text";

export default function Screen() {
  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="p-5">
          <Text>Rooms Page</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
