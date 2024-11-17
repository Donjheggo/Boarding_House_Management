import { supabase } from "../supabase";
import { Alert } from "react-native";

export async function CountTenantByRoomId(room_id: string) {
  try {
    const { error, data } = await supabase
      .from("tenants")
      .select("*")
      .eq("room_id", room_id);

    if (error) {
      Alert.alert("Error", error.message);
      return 0;
    }

    return data.length || 0;
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert("Error", error.message);
      return 0;
    }
  }
}
