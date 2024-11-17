import { DeleteTenantById } from "~/lib/actions/tenant";
import { Button } from "~/components/ui/button";
import { useFocusEffect, useRouter } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { GetTenantById } from "~/lib/actions/tenant";
import { useCallback, useState } from "react";
import type { TenantsT } from "./update";

export default function Screen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [tenant, setTenant] = useState<TenantsT>();

  const handleDelete = async () => {
    try {
      await DeleteTenantById(id as string);
      router.push("/(tabs)/tenants");
    } catch (error) {
      return;
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchTenant = async () => {
        const data = await GetTenantById(id as string);
        if (data) setTenant(data);
      };
      fetchTenant();
    }, [])
  );

  return (
    <SafeAreaView className="h-full">
      <View className="p-5">
        <Text className="font-bold text-2xl">
          Are you sure to delete Tenant {tenant?.name}?
        </Text>
      </View>
      <View className="flex flex-row justify-center gap-4">
        <Button onPress={handleDelete} className="w-[40%]">
          <Text className="text-white">Yes</Text>
        </Button>
        <Button
          onPress={() => router.push("/(tabs)/tenants")}
          variant="outline"
          className="w-[40%]"
        >
          <Text>Cancel</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
