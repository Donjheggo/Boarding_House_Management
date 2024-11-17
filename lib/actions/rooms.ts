import { supabase } from "../supabase";
import { Alert } from "react-native";
import { UpdateFormT } from "~/app/(tabs)/rooms/[id]/update";

export type CreateFormT = {
  room_number: number;
  bed_number: number;
  rent: number;
};

export async function GetAllRooms() {
  try {
    const { error, data } = await supabase
      .from("rooms")
      .select("*")
      .order("room_number", { ascending: true });

    if (error) {
      Alert.alert("Error", error.message);
      return [];
    }

    return data || [];
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert("Error", error.message);
      return [];
    }
  }
}

export async function CreateRoom(form: CreateFormT) {
  try {
    const { error } = await supabase
      .from("rooms")
      .insert([
        {
          room_number: Number(form.room_number),
          bed_number: Number(form.bed_number),
          rent: Number(form.rent),
        },
      ])
      .select();

    if (error) {
      Alert.alert("Failed to create room", error.message || "Uknown error.");
      return false;
    }

    return true;
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message);
      return false;
    }
  }
}

export async function GetRoomById(id: string) {
  try {
    const { error, data } = await supabase
      .from("rooms")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      Alert.alert("Error", error.message);
      return undefined;
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert("Error", error.message);
      return undefined;
    }
  }
}

export async function UpdateRoom(form: UpdateFormT) {
  try {
    const { error } = await supabase
      .from("rooms")
      .update([
        {
          room_number: Number(form.room_number),
          bed_number: Number(form.bed_number),
          rent: Number(form.rent),
        },
      ])
      .eq("id", form.id)
      .select();

    if (error) {
      Alert.alert("Error", error.message);
      return false;
    }

    return true;
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert("Error", error.message);
      return false;
    }
  }
}

export async function DeleteRoomById(id: string) {
  try {
    const { error } = await supabase.from("rooms").delete().eq("id", id);

    if (error) {
      Alert.alert("Error", error.message);
      return false;
    }

    return true;
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert("Error", error.message);
      return false;
    }
  }
}
