import { View, SafeAreaView, StatusBar, Platform } from "react-native";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useCallback, useState } from "react";
import { Button } from "~/components/ui/button";
import { UpdateRoom } from "~/lib/actions/rooms";
import { useFocusEffect, useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { GetRoomById } from "~/lib/actions/rooms";
import { RoomsT } from "..";

export type UpdateFormT = {
  id: string;
  room_number: number;
  bed_number: number;
  rent: number;
};

export default function Screen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<RoomsT>();
  const [form, setForm] = useState<UpdateFormT>({
    id: id as string,
    room_number: 0,
    bed_number: 0,
    rent: 0,
  });

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const data = await GetRoomById(id as string);
        if (data) setData(data);
        setForm({
          id: id as string,
          room_number: data.room_number,
          bed_number: data.bed_number,
          rent: data.rent,
        });
      };
      fetchData();
    }, [])
  );

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await UpdateRoom(form);
      setLoading(false);
      router.push("/(tabs)/rooms");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <View className="p-5">
        <Text className="text-center text-2xl font-bold">
          Update Rooms Information
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
          <Text>Update</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
