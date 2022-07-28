import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeFilled,
  ShopFilled,
  TagFilled,
  HddFilled,
  UnlockFilled,
} from "@ant-design/icons";
import { Layout, Menu, Switch } from "antd";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const InnerConent = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState("dark");
  const changeTheme = (value) => {
    setTheme(value ? "light" : "dark");
  };

  const { pathname } = useLocation();
  console.log(useLocation());

  return (
    <Layout>
      <Header className="text-white">
        Header <Switch onChange={changeTheme} /> Change mode
      </Header>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ overflow: "auto", height: "90vh" }}
        >
          <div className="logo" />
          <Menu
            theme={theme}
            mode="inline"
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <HomeFilled />,
                label: "Dashboard",
                onClick: () => {
                  navigate("/");
                },
              },
              {
                key: "2",
                icon: <ShopFilled />,
                label: "Products",
                onClick: () => {
                  navigate("products");
                },
              },
              {
                key: "3",
                icon: <TagFilled />,
                label: "Brands",
                onClick: () => {
                  navigate("brands");
                },
              },
              {
                key: "4",
                icon: <HddFilled />,
                label: "Category",
                onClick: () => {
                  navigate("category");
                },
              },
              {
                key: "7",
                icon: <UnlockFilled />,
                label: "Logout",
                className: "mt-auto mb-3",
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <span className="mx-3 text-muted">{pathname==='/'? `${pathname}Dashboard`:pathname}</span>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default InnerConent;
