import { View, SafeAreaView, FlatList } from "react-native";
import { Image } from "react-native";
import { User, Bed, HandCoins } from "lucide-react-native";
import HomeCard from "~/components/home/home-card";
import type { HomeCardT } from "~/components/home/home-card";
import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { CountTotalRooms } from "~/lib/actions/rooms";
import { CountTotalTenants } from "~/lib/actions/tenant";
import { CountTotalPayments } from "~/lib/actions/payments";
import { CountTotalBeds } from "~/lib/actions/rooms";

type homeData = {
  rooms: number;
  tenants: number;
  payments: number;
  beds: number;
};

export default function Screen() {
  const [data, setData] = useState<homeData>({
    rooms: 0,
    tenants: 0,
    payments: 0,
    beds: 0,
  });

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const [rooms, tenants, payments, beds] = await Promise.all([
            CountTotalRooms(),
            CountTotalTenants(),
            CountTotalPayments(),
            CountTotalBeds(),
          ]);

          setData((prevData) => ({
            ...prevData,
            rooms: rooms ?? prevData.rooms,
            tenants: tenants ?? prevData.tenants,
            payments: payments ?? prevData.payments,
            beds: beds ?? prevData.beds,
          }));
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };

      fetchData();
    }, [])
  );

  const renderCards = ({ item }: { item: HomeCardT }) => {
    return (
      <View className="w-[48%] m-1">
        <HomeCard item={item} />
      </View>
    );
  };

  const homeCardData: HomeCardT[] = [
    {
      icon: <Bed color="#fff" />,
      data: data.rooms,
      name: "Rooms",
      href: "/(tabs)/rooms",
    },
    {
      icon: <HandCoins color="#fff" />,
      data: data.payments,
      name: "Payment",
      href: "/(tabs)/payments",
    },
    {
      icon: <User color="#fff" />,
      data: data.tenants,
      name: "Tenants",
      href: "/(tabs)/tenants",
    },
    {
      icon: <Bed color="#fff" />,
      data: data.beds,
      name: "Beds",
      href: "/(tabs)/rooms",
    },
  ];

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
