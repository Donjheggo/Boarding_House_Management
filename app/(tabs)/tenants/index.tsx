import {
  View,
  SafeAreaView,
  FlatList,
  Platform,
  StatusBar,
} from "react-native";
import { Text } from "~/components/ui/text";
import { Link } from "expo-router";
import { Plus } from "lucide-react-native";
import TenantCard from "~/components/tenants/tenant-card";
import { GetAllTenants } from "~/lib/actions/tenant";
import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import type { TenantsT } from "./[id]/update";

export default function Screen() {
  const [tenants, setTenants] = useState<TenantsT[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchTenants = async () => {
        const data = await GetAllTenants();
        if (data) setTenants(data);
      };
      fetchTenants();
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
        <Link href={{ pathname: "/(tabs)/tenants/create" }}>
          <View
            className="w-full"
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text className="text-2xl font-bold">Tenant Management</Text>
            <View className="ml-auto">
              <Plus color="#03314B" />
            </View>
          </View>
        </Link>
        <View className="mt-5">
          <FlatList
            data={tenants}
            renderItem={({ item }) => <TenantCard item={item} />}
            keyExtractor={(_, index) => `${index}`}
            ItemSeparatorComponent={() => <View className="h-2" />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
