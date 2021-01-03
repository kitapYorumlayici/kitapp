import React from "react";
import { Header, Left, Body, Right, Button, Icon, Title } from "native-base";

const HomeHeader = ({ navigation, title }) => {
  return (
    <Header iosBarStyle="dark-content">
      <Left>
        <Button dark transparent onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" />
        </Button>
      </Left>
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right />
    </Header>
  );
};

export default HomeHeader;
