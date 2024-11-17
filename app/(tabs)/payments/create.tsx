import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { View, SafeAreaView, Platform } from "react-native";
import { Text } from "~/components/ui/text";
import { Label } from "~/components/ui/label";
import { useCallback, useState } from "react";
import { Button } from "~/components/ui/button";
import { CreatePayment } from "~/lib/actions/payments";
import { useFocusEffect, useRouter } from "expo-router";
import { GetAllTenants } from "~/lib/actions/tenant";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import type { CreatePaymentFormT } from "~/lib/actions/payments";
import type { Tenants } from "~/components/tenants/tenant-card";

export default function Screen() {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [tenants, setTenants] = useState<Tenants[]>([]);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [form, setForm] = useState<CreatePaymentFormT>({
    tenant_id: "",
    date: new Date(),
  });

  useFocusEffect(
    useCallback(() => {
      const fetchTenants = async () => {
        const data = await GetAllTenants();
        if (data) setTenants(data);
      };
      fetchTenants();
    }, [])
  );

  const handleCreate = async () => {
    setLoading(true);
    try {
      await CreatePayment(form);
      setLoading(false);
      router.push("/(tabs)/payments");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="h-full">
      <View className="p-5">
        <Text className="text-center text-2xl font-bold">
          Payment Information
        </Text>
        <View>
          <Label nativeID="tenant" className="pb-1">
            Tenant
          </Label>
          <Select
            defaultValue={{ value: "", label: "Select Tenant" }}
            onValueChange={(value) =>
              setForm({
                ...form,
                tenant_id: value?.value as string,
              })
            }
          >
            <SelectTrigger>
              <SelectValue
                className="text-foreground dark:text-white text-sm native:text-lg"
                placeholder="Select a Tenant"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {tenants.map((item, index) => (
                  <SelectItem key={index} label={item.name} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </View>
        <View>
          <Label nativeID="date" className="pb-1">
            Date
          </Label>
          {Platform.OS === "android" && (
            <Button
              variant="outline"
              onPress={() => setShowDatePicker(!showDatePicker)}
              className="bg-transparent w-1/4"
            >
              <Text>{new Date(form.date).toLocaleDateString()}</Text>
            </Button>
          )}
          {(showDatePicker || Platform.OS === "ios") && (
            <View className="mr-auto">
              <RNDateTimePicker
                value={form.date}
                display="default"
                mode="date"
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    setForm({ ...form, date: selectedDate });
                    setShowDatePicker(false);
                  }
                }}
              />
            </View>
          )}
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
