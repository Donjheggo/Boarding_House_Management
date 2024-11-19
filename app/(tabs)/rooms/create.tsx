import { View, SafeAreaView, Platform, StatusBar } from "react-native";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useState } from "react";
import { CreateRoom } from "~/lib/actions/rooms";
import { Button } from "~/components/ui/button";
import type { CreateFormRoomT } from "~/lib/actions/rooms";
import { useRouter } from "expo-router";

export default function Screen() {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<CreateFormRoomT>({
    room_number: 0,
    bed_number: 0,
    rent: 0,
  });

  const handleCreate = async () => {
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
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
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
          onPress={handleCreate}
          variant="default"
          className="mt-5"
        >
          <Text>Create</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
