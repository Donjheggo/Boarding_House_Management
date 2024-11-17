import { View, SafeAreaView } from "react-native";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useCallback, useState } from "react";
import { CreateRoom } from "~/lib/actions/rooms";
import { Button } from "~/components/ui/button";
import type { CreateFormT } from "~/lib/actions/rooms";
import { useFocusEffect, useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { GetRoomById } from "~/lib/actions/rooms";
import { RoomsT } from ".";

export default function Screen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<RoomsT>();
  const [form, setForm] = useState<CreateFormT>({
    room_number: 0,
    bed_number: 0,
    rent: 0,
  });

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const data = await GetRoomById(id as string);
        if (data) setData(data);
      };
      fetchData();
    }, [])
  );

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await CreateRoom(form);
      setLoading(false);
      router.push("/(tabs)/rooms");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="h-full">
      <View className="p-5">
        <Text className="text-center text-2xl font-bold">
          Rooms Information
        </Text>
        <View>
          <Label nativeID="room_number" className="pb-1">
            Room number
          </Label>
          <Input
            placeholder=""
            value={String(form.room_number)}
            onChangeText={(e) => setForm({ ...form, room_number: Number(e) })}
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
            keyboardType="numeric"
            className=""
          />
        </View>
        <View>
          <Label nativeID="bed_number" className="pb-1">
            Bed number
          </Label>
          <Input
            placeholder=""
            value={String(form.bed_number)}
            onChangeText={(e) => setForm({ ...form, bed_number: Number(e) })}
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
            keyboardType="numeric"
            className=""
          />
        </View>
        <View>
          <Label nativeID="rent" className="pb-1">
            Month rent
          </Label>
          <Input
            placeholder=""
            value={String(form.rent)}
            onChangeText={(e) => setForm({ ...form, rent: Number(e) })}
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
            keyboardType="numeric"
            className=""
          />
        </View>
        <Button
          size="lg"
          disabled={isLoading}
          onPress={handleUpdate}
          variant="default"
          className="mt-5"
        >
          <Text>Create</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
