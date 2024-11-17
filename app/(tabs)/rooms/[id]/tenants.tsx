import { View, FlatList, SafeAreaView } from "react-native";
import { Text } from "~/components/ui/text";
import { useLocalSearchParams } from "expo-router";
import { GetTenantsByRoomId } from "~/lib/actions/tenant";
import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { GetRoomById } from "~/lib/actions/rooms";
import type { Tenants } from "~/components/tenants/tenant-card";
import type { RoomsT } from "..";
import { Mail, Phone } from "lucide-react-native";

export default function Screen() {
  const { id } = useLocalSearchParams();
  const [room, setRoom] = useState<RoomsT>();
  const [tenants, setTenants] = useState<Tenants[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchRoom = async () => {
        const data = await GetRoomById(id as string);
        if (data) setRoom(data);
      };
      fetchRoom();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      const fetchTenants = async () => {
        const data = await GetTenantsByRoomId(id as string);
        if (data) setTenants(data);
      };
      fetchTenants();
    }, [])
  );

  const renderTenants = ({ item }: { item: Tenants }) => {
    return (
      <View className="border rounded-lg bg-primary p-5">
        <Text className="text-white text-xl text-center">{item.name}</Text>
        <View className="flex flex-row items-center gap-2">
          <Mail color="#fff" size={18} />
          <Text className="text-white text-lg">{item.email}</Text>
        </View>
        <View className="flex flex-row items-center gap-2">
          <Phone color="#fff" size={18} />
          <Text className="text-white text-lg">{item.mobile_number}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="h-full">
      <View className="p-5">
        <Text className="text-center text-2xl font-bold">
          Room {room?.room_number} Tenants
        </Text>
        <View className="mt-5">
          <FlatList
            data={tenants}
            renderItem={renderTenants}
            keyExtractor={(_, index) => `${index}`}
            ItemSeparatorComponent={() => <View className="h-2" />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
