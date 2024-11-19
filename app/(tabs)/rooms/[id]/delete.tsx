import { DeleteRoomById } from "~/lib/actions/rooms";
import { Button } from "~/components/ui/button";
import { useFocusEffect, useRouter } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView, View, Platform, StatusBar } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { GetRoomById } from "~/lib/actions/rooms";
import { useCallback, useState } from "react";
import type { RoomsT } from "..";

export default function Screen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [room, setRoom] = useState<RoomsT>();

  const handleDelete = async () => {
    try {
      await DeleteRoomById(id as string);
      router.push("/(tabs)/rooms");
    } catch (error) {
      return;
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchRoom = async () => {
        const data = await GetRoomById(id as string);
        if (data) setRoom(data);
      };
      fetchRoom();
    }, [])
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <View className="p-5">
        <Text className="font-bold text-2xl">
          Are you sure to delete Room {room?.room_number}?
        </Text>
      </View>
      <View className="flex flex-row justify-center gap-4">
        <Button onPress={handleDelete} className="w-[40%]">
          <Text className="text-white">Yes</Text>
        </Button>
        <Button
          onPress={() => router.push("/(tabs)/rooms")}
          variant="outline"
          className="w-[40%]"
        >
          <Text>Cancel</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
