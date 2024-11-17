import { Button } from "~/components/ui/button";
import { useFocusEffect, useRouter } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { GetPaymentById } from "~/lib/actions/payments";
import { useCallback, useState } from "react";
import { DeletePaymentById } from "~/lib/actions/payments";
import type { PaymentsT } from "~/components/payments/payment-card";

export default function Screen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [payments, setPayments] = useState<PaymentsT>();

  const handleDelete = async () => {
    try {
      await DeletePaymentById(id as string);
      router.push("/(tabs)/payments");
    } catch (error) {
      return;
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchRoom = async () => {
        const data = await GetPaymentById(id as string);
        if (data) setPayments(data);
      };
      fetchRoom();
    }, [])
  );

  return (
    <SafeAreaView className="h-full">
      <View className="p-5">
        <Text className="font-bold text-2xl">
          Are you sure to delete Payment {payments?.tenant_id.name}?
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
