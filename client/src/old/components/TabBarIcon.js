import * as React from "react";
import { Ionicons } from "@expo/vector-icons";

import Colors from "src/constants/Colors";

export default ({ name, focused }) => (
  <Ionicons
    name={name}
    size={30}
    style={{ marginBottom: -3 }}
    color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
  />
);
