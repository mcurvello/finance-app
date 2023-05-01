import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "../pages/Home";
import Profile from "../pages/Profile";
import New from "../pages/New";

const AppDrawer = createDrawerNavigator();

function AppRoutes() {
  return (
    <AppDrawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#171717",
        },
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#ddd",
        drawerLabelStyle: {
          fontWeight: "bold",
        },
        drawerActiveBackgroundColor: "#00b94a",
        drawerInactiveBackgroundColor: "#000",
        drawerItemStyle: {
          marginVertical: 5,
        },
      }}
    >
      <AppDrawer.Screen name="Home" component={Home} />
      <AppDrawer.Screen name="Registrar" component={New} />
      <AppDrawer.Screen name="Perfil" component={Profile} />
    </AppDrawer.Navigator>
  );
}

export default AppRoutes;
