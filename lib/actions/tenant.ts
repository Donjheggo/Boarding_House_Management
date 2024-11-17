import { supabase } from "../supabase";
import { Alert } from "react-native";

export async function GetAllTenants() {
  try {
    const { error, data } = await supabase
      .from("tenants")
      .select(`*, room_id(*)`)
      .order("name", { ascending: true });

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

export type CreateTenantFormT = {
  name: string;
  email: string;
  address: string;
  date_of_rent: Date;
  mobile_number: string;
  room_id: string;
};

export async function CreateTenant(form: CreateTenantFormT) {
  try {
    const { error } = await supabase
      .from("tenants")
      .insert([
        {
          name: form.name,
          email: form.email,
          address: form.address,
          date_of_rent: form.date_of_rent,
          mobile_number: form.mobile_number,
          room_id: form.room_id,
        },
      ])
      .select();

    if (error) {
      Alert.alert("Failed to create", error.message || "Uknown error.");
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

export async function GetTenantById(id: string) {
  try {
    const { error, data } = await supabase
      .from("tenants")
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

export type UpdateTenantFormT = {
  id: string;
  name: string;
  email: string;
  address: string;
  date_of_rent: Date;
  mobile_number: string;
  room_id: string;
};

export async function UpdateTenant(form: UpdateTenantFormT) {
  try {
    const { error } = await supabase
      .from("tenants")
      .update([
        {
          name: form.name,
          email: form.email,
          address: form.address,
          date_of_rent: form.date_of_rent,
          mobile_number: form.mobile_number,
          room_id: form.room_id,
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

export async function DeleteTenantById(id: string) {
  try {
    const { error } = await supabase.from("tenants").delete().eq("id", id);

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

export async function CountTotalTenants() {
  try {
    const { error, count } = await supabase
      .from("tenants")
      .select("*", { count: "exact", head: true });

    if (error) {
      Alert.alert("Error", error.message);
      return 0;
    }

    return count || 0;
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert("Error", error.message);
      return 0;
    }
  }
}

export async function GetTenantsByRoomId(room_id: string) {
  try {
    const { error, data } = await supabase
      .from("tenants")
      .select("*")
      .eq("room_id", room_id);

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
