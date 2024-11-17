import { View, SafeAreaView, FlatList } from "react-native";
import { Plus } from "lucide-react-native";
import { Text } from "~/components/ui/text";
import { Link, useFocusEffect } from "expo-router";
import { GetAllPayments } from "~/lib/actions/payments";
import { useState } from "react";
import { useCallback } from "react";
import type { PaymentsT } from "~/components/payments/payment-card";
import PaymentCard from "~/components/payments/payment-card";

export default function Screen() {
  const [payments, setPayments] = useState<PaymentsT[]>();

  useFocusEffect(
    useCallback(() => {
      const fetchPayments = async () => {
        const data = await GetAllPayments();
        if (data) setPayments(data);
      };

      fetchPayments();
    }, [])
  );

  return (
    <SafeAreaView className="h-full">
      <View className="p-5">
        <Link href={{ pathname: "/(tabs)/payments/create" }}>
          <View
            className="w-full"
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text className="text-2xl font-bold">Payments Management</Text>
            <View className="ml-auto">
              <Plus />
            </View>
          </View>
        </Link>
        <View className="mt-5">
          <FlatList
            data={payments}
            renderItem={({ item }) => <PaymentCard item={item} />}
            keyExtractor={(_, index) => `${index}`}
            ItemSeparatorComponent={() => <View className="h-2" />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
