import { View, SafeAreaView, FlatList } from "react-native";
import { Text } from "~/components/ui/text";
import { Image } from "react-native";
import { User, Bed, HandCoins } from "lucide-react-native";
import HomeCard from "~/components/home/home-card";
import type { HomeCardT } from "~/components/home/home-card";

export default function Screen() {
  const renderCards = ({ item }: { item: HomeCardT }) => {
    return (
      <View className="w-[48%] m-1">
        <HomeCard item={item} />
      </View>
    );
  };

  return (
    <SafeAreaView className="h-full">
      <View className="p-5">
        <View className="flex flex-row justify-center">
          <Image
            source={require("../../assets/images/logo.png")}
            resizeMode="contain"
            style={{
              width: 300,
              height: 300,
            }}
          />
        </View>
        <View>
          <Text className="p-2 font-medium text-2xl text-primary">Home</Text>
          <FlatList
            data={homeCardData}
            renderItem={renderCards}
            keyExtractor={(_, index) => `${index}`}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export const homeCardData: HomeCardT[] = [
  {
    icon: <Bed color="#fff" />,
    data: 0,
    name: "Rooms",
    href: "/(tabs)/rooms",
  },
  {
    icon: <HandCoins color="#fff" />,
    data: 0,
    name: "Payment",
    href: "/(tabs)/payments",
  },
  {
    icon: <User color="#fff" />,
    data: 0,
    name: "Tenants",
    href: "/(tabs)/tenants",
  },
  {
    icon: <Bed color="#fff" />,
    data: 0,
    name: "Beds",
    href: "/(tabs)/rooms",
  },
];
