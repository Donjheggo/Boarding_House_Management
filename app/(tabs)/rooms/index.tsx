import { View, SafeAreaView, FlatList } from "react-native";
import { Plus } from "lucide-react-native";
import { Text } from "~/components/ui/text";
import { Link, useFocusEffect } from "expo-router";
import { GetAllRooms } from "~/lib/actions/rooms";
import { useState } from "react";
import { useCallback } from "react";
import { Tables } from "~/database.types";
import RoomCard from "~/components/rooms/room-card";

export type RoomsT = Tables<"rooms">;

export default function Screen() {
  const [rooms, setRooms] = useState<RoomsT[]>();

  useFocusEffect(
    useCallback(() => {
      const fetchRooms = async () => {
        const data = await GetAllRooms();
        if (data) setRooms(data);
      };

      fetchRooms();
    }, [])
  );

  return (
    <SafeAreaView className="h-full">
      <View className="p-5">
        <Link href={{ pathname: "/(tabs)/rooms/create" }}>
          <View
            className="w-full"
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text className="text-2xl font-bold">Rooms Management</Text>
            <View className="ml-auto">
              <Plus />
            </View>
          </View>
        </Link>
        <View className="mt-5">
          <FlatList
            data={rooms}
            renderItem={({ item }) => <RoomCard item={item} />}
            keyExtractor={(_, index) => `${index}`}
            ItemSeparatorComponent={() => <View className="h-2" />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
