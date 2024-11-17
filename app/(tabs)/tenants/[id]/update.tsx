import { View, SafeAreaView, Platform } from "react-native";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useCallback, useState } from "react";
import { Button } from "~/components/ui/button";
import { UpdateTenant } from "~/lib/actions/tenant";
import { useFocusEffect, useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { GetTenantById } from "~/lib/actions/tenant";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Tables } from "~/database.types";

export type TenantsT = Tables<"tenants">;
export type UpdateFormT = {
  id: string;
  name: string;
  email: string;
  address: string;
  date_of_rent: Date;
  mobile_number: string;
  room_id: string;
};

export default function Screen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [form, setForm] = useState<UpdateFormT>({
    id: id as string,
    name: "",
    email: "",
    address: "",
    date_of_rent: new Date(),
    mobile_number: "",
    room_id: "",
  });

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const data = await GetTenantById(id as string);
        if (data)
          setForm({
            id: id as string,
            name: data.name,
            email: data.email,
            address: data.address,
            date_of_rent: new Date(data.date_of_rent),
            mobile_number: data.mobile_number,
            room_id: data.room_id,
          });
      };
      fetchData();
    }, [])
  );

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await UpdateTenant(form);
      setLoading(false);
      router.push("/(tabs)/tenants");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="h-full">
      <View className="p-5">
        <Text className="text-center text-2xl font-bold">
          Update Tenant Information
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
              <Text>{new Date(form.date_of_rent).toLocaleDateString()}</Text>
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
            onChangeText={(e) => setForm({ ...form, address: e })}
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
            keyboardType="default"
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
