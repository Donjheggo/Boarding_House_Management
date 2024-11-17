import { View } from "react-native";
import { Text } from "../ui/text";
import type { RoomsT } from "~/app/(tabs)/rooms";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Tables } from "~/database.types";
import { CountTenantByRoomId } from "~/lib/actions/tenant";
import { Link } from "expo-router";
import { Button } from "../ui/button";
import { TouchableOpacity } from "react-native";
import { Pen, Trash } from "lucide-react-native";

export type Tenants = Tables<"tenants">;

export default function RoomCard({ item }: { item: RoomsT }) {
  const [tenants, setTenants] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      const fetchTenants = async () => {
        const data = await CountTenantByRoomId(item.id);
        if (data) setTenants(data);
      };

      fetchTenants();
    }, [])
  );

  return (
    <View className="p-5 border bg-primary rounded-xl">
      <View className="flex flex-row justify-between">
        <View className="flex flex-col">
          <Text className="text-white text-xl">Room {item.room_number}</Text>
          <Text className="text-white text-xl">{item.bed_number} beds</Text>
        </View>
        <View className="flex flex-col">
          <Text className="text-white text-center text-xl">
            {item.rent}/monthly
          </Text>
          <Text className="text-white text-center text-xl">
            {tenants}/{item.bed_number} persons
          </Text>
        </View>
        <View className="flex flex-row gap-4">
          <Link
            href={{ pathname: "/(tabs)/rooms/[id]", params: { id: item.id } }}
            asChild
            className="p-2"
          >
            <Pen color="#fff" />
          </Link>
          <View>
            <Trash color="#ff0000" />
          </View>
        </View>
      </View>
    </View>
  );
}