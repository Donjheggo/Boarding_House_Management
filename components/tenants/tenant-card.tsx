import { View } from "react-native";
import { Text } from "../ui/text";
import type { RoomsT } from "~/app/(tabs)/rooms";
import { Link } from "expo-router";
import { Pen, Trash } from "lucide-react-native";

export default function TenantCard({ item }: { item: Tenants }) {
  return (
    <View className="p-5 border bg-primary rounded-xl">
      <View className="flex flex-row justify-between">
        <View className="flex flex-col">
          <Text className="text-white text-xl">{item.name}</Text>
          <Text className="text-white text-xl">
            Room {item.room_id.room_number}
          </Text>
        </View>

        <View className="flex flex-row gap-4">
          <Link
            href={{
              pathname: "/(tabs)/tenants/[id]/update",
              params: { id: item.id },
            }}
            asChild
            className="p-2"
          >
            <Pen color="#fff" />
          </Link>
          <Link
            href={{
              pathname: "/(tabs)/tenants/[id]/delete",
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

export type Tenants = {
  address: string;
  created_at: string;
  date_of_rent: string;
  email: string;
  id: string;
  mobile_number: string;
  name: string;
  room_id: RoomsT;
};
