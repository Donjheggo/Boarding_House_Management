import { View, TouchableOpacity } from "react-native";
import { Text } from "../ui/text";
import { Link } from "expo-router";

export type HomeCardT = {
  icon: JSX.Element;
  data: number;
  name: string;
  href: any;
};

export default function HomeCard({ item }: { item: HomeCardT }) {
  return (
    <Link href={{ pathname: item.href }} asChild>
      <TouchableOpacity>
        <View className="p-5 border bg-primary rounded-xl">
          <View className="flex flex-row justify-between">
            <Text className="text-white text-center text-xl">{item.name}</Text>
            {item.icon}
          </View>
          <Text className="text-white text-center font-bold text-2xl">
            {item.data}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
