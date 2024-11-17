import { View } from "react-native";
import { Text } from "../ui/text";
import { Tables } from "~/database.types";
import { Link } from "expo-router";
import { Trash } from "lucide-react-native";

export default function PaymentCard({ item }: { item: PaymentsT }) {
  return (
    <View className="p-5 border bg-primary rounded-xl">
      <View className="flex flex-row justify-between">
        <View className="flex flex-col">
          <Text className="text-white text-xl">Room {item.tenant_id.name}</Text>
          <Text className="text-white text-xl">
            Room {item.tenant_id.room_id.room_number}
          </Text>
          <Text className="text-white text-xl">
            {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>

        <View className="flex flex-row gap-4">
          <Link
            href={{
              pathname: "/(tabs)/payments/[id]/delete",
              params: { id: item.id },
            }}
            asChild
            className="p-2"
          >
            <Trash color="#ff0000" />
          </Link>
        </View>
      </View>
    </View>
  );
}

type RoomT = Tables<"rooms">;
type TenantT = {
  address: string;
  created_at: string;
  date_of_rent: string;
  email: string;
  id: string;
  mobile_number: string;
  name: string;
  room_id: RoomT;
};
export type PaymentsT = {
  created_at: string;
  date: string;
  id: string;
  tenant_id: TenantT;
};
