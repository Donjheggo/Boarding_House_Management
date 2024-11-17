import { supabase } from "../supabase";
import { Alert } from "react-native";
import { UpdateFormT } from "~/app/(tabs)/rooms/[id]/update";

export type CreatePaymentFormT = {
  tenant_id: string;
  date: Date;
};

export async function GetAllPayments() {
  try {
    const { error, data } = await supabase
      .from("payments")
      .select("*, tenant_id(*, room_id(*))")
      .order("date", { ascending: true });

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

export async function CreatePayment(form: CreatePaymentFormT) {
  try {
    const { error } = await supabase
      .from("payments")
      .insert([
        {
          tenant_id: form.tenant_id,
          date: form.date,
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

export async function GetPaymentById(id: string) {
  try {
    const { error, data } = await supabase
      .from("payments")
      .select(`*, tenant_id(*)`)
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

export type UpdatePaymentFormT = {
  id: string;
  tenant_id: string;
  date: Date;
};

export async function UpdatePayment(form: UpdatePaymentFormT) {
  try {
    const { error } = await supabase
      .from("payments")
      .update([
        {
          tenant_id: form.tenant_id,
          date: form.date,
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

export async function DeletePaymentById(id: string) {
  try {
    const { error } = await supabase.from("payments").delete().eq("id", id);

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
