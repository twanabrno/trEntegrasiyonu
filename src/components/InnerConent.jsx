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
import { Button } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAuth } from "./temporary/auth";
import { RiLogoutBoxFill } from "react-icons/ri";

const { Header, Sider, Content } = Layout;

const InnerConent = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState("dark");
  const changeTheme = (value) => {
    setTheme(value ? "dark" : "light");
  };

  const { pathname } = useLocation();

  return (
    <Layout>
      <Header className="text-white position-fixed w-100 d-flex justify-content-between hd">
        <div>Header</div>
        <div>
          <Switch
            size="small"
            onChange={changeTheme}
            className="ms-4"
            defaultChecked
          />{" "}
          <small>Dark</small>
          <span
            className="mx-3 logout-btn"
            onClick={() => {
              auth.logout();
              navigate("/login");
            }}
          >
            <RiLogoutBoxFill /> Logout
          </span>
        </div>
      </Header>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            overflow: "auto",
            position: "fixed",
            left: 0,
            top: "64px",
            bottom: 0,
          }}
        >
          <Menu
            theme={theme}
            mode="inline"
            style={{
              height: "100%",
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
              
            ]}
          />
        </Sider>
        <Layout
          className="site-layout"
          style={{
            marginTop: "64px",
            marginLeft: collapsed ? 80 : 200,
            transitionDuration: "all 0.2s",
          }}
        >
          <Header className="site-layout-background hd position-fixed w-100 px-0">
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <span className="mx-3 text-muted">
              {pathname === "/" ? `${pathname}Dashboard` : pathname}
            </span>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              marginTop: "80px",
              padding: 24,
              minHeight:450,
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
