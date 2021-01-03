import React from "react";
import { Container, Button, Content, Icon, View } from "native-base";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

const Sidebar = ({ ...props }) => {

  return (
    <Container>
      <View
        style={{
          backgroundColor: "white",
          height: "auto",
          marginTop: 20,
          marginBottom: 0,
        }}
      >
        <Button
          dark
          transparent
          style={{ left: "500%" }}
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
        >
          <Icon name="arrow-left" type="SimpleLineIcons" />
        </Button>
      </View>
      <Content>
        <DrawerContentScrollView style={{ marginTop: -20 }} {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </Content>
    </Container>
  );
};

export default Sidebar;
