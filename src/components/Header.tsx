import FirebaseService from "@/lib/firebase.services";
import { Bars3BottomLeftIcon, UserIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { useProSidebar } from "react-pro-sidebar";
import { Nav, Navbar } from "rsuite";

export default function Header() {
  const router = useRouter();
  const { toggleSidebar, broken } = useProSidebar();
  const { user } = FirebaseService.useAuthState();
  const { signOut } = FirebaseService.signOut();

  return (
    <Navbar>
      {broken ? (
        <Navbar.Brand
          className="cursor-pointer"
          onClick={() => toggleSidebar()}
        >
          <Bars3BottomLeftIcon className="w-6 h-6" />
        </Navbar.Brand>
      ) : (
        <Navbar.Brand href="/">
          <h5>Dijango's Pizzaria</h5>
        </Navbar.Brand>
      )}
      <Nav pullRight>
        <Nav.Menu
          icon={<UserIcon className="w-6 h-6" />}
          title={`${(user && `Administrador`) || "Login"} `}
          placement="bottomEnd"
        >
          <Nav.Item panel style={{ padding: 10, width: 250 }}>
            {user ? (
              <>
                <p>Logado como</p>
                <strong>{user?.email}</strong>
              </>
            ) : (
              <strong>Deslogado</strong>
            )}
          </Nav.Item>
          <Nav.Item divider />
          {!user ? (
            <Nav.Item onClick={() => router.push("/login")}>Login</Nav.Item>
          ) : (
            <Nav.Item onClick={() => signOut()}>Logout</Nav.Item>
          )}
        </Nav.Menu>
      </Nav>
    </Navbar>
  );
}

{
  /* 
<header className="flex justify-between p-3">
      <div className="flex">
        {broken && (
          <IconButton
            icon={<Bars3BottomLeftIcon className="w-6 h-6" />}
            onClick={() => toggleSidebar()}
          />
        )}
      </div>
      <div className="flex items-center">
        {!user ? (
          <IconButton
            title="Efetuar Login"
            onClick={() => setOpen(true)}
            icon={<UserIcon className="w-6 h-6" />}
          />
        ) : (
          <IconButton
            title="Logout"
            onClick={() => signOut(auth)}
            icon={<ArrowLeftOnRectangleIcon className="w-6 h-6" />}
          />
        )}
      </div>
    </header>

*/
}
