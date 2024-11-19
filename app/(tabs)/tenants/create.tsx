import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  View,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
} from "react-native";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useCallback, useState } from "react";
import { CreateTenant } from "~/lib/actions/tenant";
import { Button } from "~/components/ui/button";
import type { CreateTenantFormT } from "~/lib/actions/tenant";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useFocusEffect, useRouter } from "expo-router";
import { GetAllRooms } from "~/lib/actions/rooms";
import type { RoomsT } from "../rooms";

export default function Screen() {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [rooms, setRooms] = useState<RoomsT[]>([]);
  const [form, setForm] = useState<CreateTenantFormT>({
    name: "",
    email: "",
    address: "",
    date_of_rent: new Date(),
    mobile_number: "",
    room_id: "",
  });

  const handleCreate = async () => {
    setLoading(true);
    try {
      await CreateTenant(form);
      setLoading(false);
      router.push("/(tabs)/tenants");
    } catch (error) {
      setLoading(false);
    }
  };

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
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView>
          <View className="p-5">
            <Text className="text-center text-2xl font-bold">
              Tenant Information
            </Text>
            <View>
              <Label nativeID="name" className="pb-1">
                Full name
              </Label>
              <Input
                placeholder=""
                value={form.name}
                onChangeText={(e) => setForm({ ...form, name: e })}
                aria-labelledby="inputLabel"
                aria-errormessage="inputError"
                keyboardType="default"
                className=""
              />
            </View>
            <View>
              <Label nativeID="email" className="pb-1">
                Email
              </Label>
              <Input
                placeholder=""
                value={form.email}
                onChangeText={(e) => setForm({ ...form, email: e })}
                aria-labelledby="inputLabel"
                aria-errormessage="inputError"
                keyboardType="email-address"
                className=""
              />
            </View>
            <View>
              <Label nativeID="address" className="pb-1">
                Address
              </Label>
              <Input
                placeholder=""
                value={form.address}
                onChangeText={(e) => setForm({ ...form, address: e })}
                aria-labelledby="inputLabel"
                aria-errormessage="inputError"
                keyboardType="default"
                className=""
              />
            </View>
            <View>
              <Label nativeID="date_of_rent" className="pb-1">
                Date of rent
              </Label>
              {Platform.OS === "android" && (
                <Button
                  variant="outline"
                  onPress={() => setShowDatePicker(!showDatePicker)}
                  className="bg-transparent w-1/4"
                >
                  <Text>
                    {new Date(form.date_of_rent).toLocaleDateString()}
                  </Text>
                </Button>
              )}
              {(showDatePicker || Platform.OS === "ios") && (
                <View className="mr-auto">
                  <RNDateTimePicker
                    value={form.date_of_rent}
                    display="default"
                    mode="date"
                    onChange={(event, selectedDate) => {
                      if (selectedDate) {
                        setForm({ ...form, date_of_rent: selectedDate });
                        setShowDatePicker(false);
                      }
                    }}
                  />
                </View>
              )}
            </View>
            <View>
              <Label nativeID="mobile_number" className="pb-1">
                Mobile number
              </Label>
              <Input
                placeholder=""
                value={form.mobile_number}
                onChangeText={(e) => setForm({ ...form, mobile_number: e })}
                aria-labelledby="inputLabel"
                aria-errormessage="inputError"
                keyboardType="default"
                className=""
              />
            </View>
            <View>
              <Label nativeID="room_id" className="pb-1">
                Room
              </Label>
              <Select
                defaultValue={{ value: "", label: "Select Room" }}
                onValueChange={(value) =>
                  setForm({
                    ...form,
                    room_id: value?.value as string,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue
                    className="text-foreground dark:text-white text-sm native:text-lg"
                    placeholder="Select a billing number"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {rooms.map((item, index) => (
                      <SelectItem
                        key={index}
                        label={`Room - ${item.room_number}`}
                        value={item.id}
                      >
                        {`Room - ${item.room_number}`}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
