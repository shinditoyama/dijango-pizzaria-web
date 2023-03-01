import FirebaseService from "@/lib/firebase.services";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";

export default function Side() {
  const { pathname } = useRouter();
  const { user } = FirebaseService.useAuthState();

  return (
    <Sidebar breakPoint="lg" backgroundColor="#fff">
      <Menu
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
            if (level === 0)
              return {
                color: active ? "#fff" : "#000",
                backgroundColor: active ? "#000" : undefined,
                fontWeight: active ? "bold" : undefined,
              };
          },
        }}
      >
        <div>
          <MenuItem active={pathname === "/"} component={<Link href="/" />}>
            Home
          </MenuItem>
          <MenuItem
            active={pathname === "/custumer"}
            component={<Link href="/custumer" />}
          >
            Clientes
          </MenuItem>
          <SubMenu label="Cardápio">
            <MenuItem
              active={pathname === "/menu/drinks"}
              component={<Link href="/menu/drinks" />}
            >
              Bebidas
            </MenuItem>

            <MenuItem
              active={pathname === "/menu"}
              component={<Link href="/menu" />}
            >
              Pizza
            </MenuItem>
          </SubMenu>
          {user && (
            <>
              <MenuItem
                active={pathname === "/order"}
                component={<Link href="/order" />}
              >
                Vendas
              </MenuItem>
              <MenuItem
                active={pathname === "/finance"}
                component={<Link href="/finance" />}
              >
                Lucro Liquido
              </MenuItem>
            </>
          )}
        </div>
      </Menu>
    </Sidebar>
  );
}
