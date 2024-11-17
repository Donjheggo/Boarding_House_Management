import { View } from "react-native";
import { Text } from "../ui/text";
import type { RoomsT } from "~/app/(tabs)/rooms";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Tables } from "~/database.types";
import { Link } from "expo-router";
import { Pen, Trash } from "lucide-react-native";
import { GetRoomById } from "~/lib/actions/rooms";

export type Tenants = Tables<"tenants">;

export default function TenantCard({ item }: { item: Tenants }) {
  const [room, setRoom] = useState<RoomsT>();

  useFocusEffect(
    useCallback(() => {
      const fetchRoom = async () => {
        const data = await GetRoomById(item.room_id);
        if (data) setRoom(data);
      };

      fetchRoom();
    }, [])
  );

  return (
    <View className="p-5 border bg-primary rounded-xl">
      <View className="flex flex-row justify-between">
        <View className="flex flex-col">
          <Text className="text-white text-xl">{item.name}</Text>
          <Text className="text-white text-xl">Room {room?.room_number}</Text>
        </View>

        <View className="flex flex-row gap-4">
          <Link
            href={{
              pathname: "/(tabs)/tenants/[id]/update",
              params: { id: item.id },
            }}
            asChild
            className="p-2"
          >
            <Pen color="#fff" />
          </Link>
          <Link
            href={{
              pathname: "/(tabs)/tenants/[id]/delete",
              params: { id: item.id },
            }}
            asChild
            className="p-2"
          >
            <Trash color="#ff0000" />
          </Link>
        </View>
      </View>
    </View>
  );
}
