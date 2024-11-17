import { Tabs, Redirect } from "expo-router";
import { User, Home, Bed, HandCoins } from "lucide-react-native";
import { useAuth } from "~/context/auth-context";

export default function TabLayout() {
  const { user } = useAuth();
  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#03314B",
        tabBarInactiveTintColor: "#a1cae2",
        headerShown: false,
        headerTitleStyle: {
          fontSize: 20,
          color: "#9C6644",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tenants"
        options={{
          title: "Tenant",
          tabBarIcon: ({ color }) => <User size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="rooms/index"
        options={{
          title: "Rooms",
          tabBarIcon: ({ color }) => <Bed size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="rooms/create"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="rooms/[id]/update"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="rooms/[id]/delete"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="payments"
        options={{
          title: "Payment",
          tabBarIcon: ({ color }) => <HandCoins size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
