import FirebaseService from "@/lib/firebase.services";
import { useState } from "react";
import { Button, Drawer, Input, MaskedInput } from "rsuite";

interface Props {
  open: boolean;
  onClose: () => void;
  temp?: any;
}

export default function FormAdditional({ open, onClose, temp }: Props) {
  const [name, setName] = useState(temp?.name || "");
  const [telephone, setTelephone] = useState(temp?.telephone || "");
  const [address, setAddress] = useState(temp?.address || "");
  const isAddMode = !temp?.id;

  const newDoc = {
    name,
    telephone,
    address,
  };

  const createData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await FirebaseService.addDocument("custumers", newDoc);
    } catch (err) {
      console.log(err);
    } finally {
      onClose();
    }
  };

  const updateData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await FirebaseService.updateDocument("custumers", temp?.id, newDoc);
    } catch (err) {
      console.log(err);
    } finally {
      onClose();
    }
  };

  return (
    <Drawer
      backdrop="static"
      size="sm"
      placement="right"
      open={open}
      onClose={onClose}
    >
      <form onSubmit={isAddMode ? createData : updateData}>
        <Drawer.Header>
          <Drawer.Title>
            {isAddMode ? "Cadastrar Cliente" : "Editar Cliente"}
          </Drawer.Title>
          <Drawer.Actions>
            <Button type="submit" appearance="primary">
              Confirm
            </Button>
            <Button onClick={onClose} appearance="subtle">
              Cancel
            </Button>
          </Drawer.Actions>
        </Drawer.Header>

        <Drawer.Body>
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="name">Nome</label>
              <Input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(text) => setName(text)}
                required
              />
            </div>
            <div>
              <label htmlFor="telephone">Telefone</label>
              <MaskedInput
                type="text"
                mask={[
                  "(",
                  /[1-9]/,
                  /\d/,
                  ")",
                  " ",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
                guide
                placeholder="(99) 99999-9999"
                value={telephone}
                onChange={(text) => setTelephone(text)}
                required
              />
            </div>
            <div>
              <label htmlFor="address">Endereço</label>
              <Input
                type="text"
                placeholder="Rua 123"
                value={address}
                onChange={(text) => setAddress(text)}
                required
              />
            </div>
          </div>
        </Drawer.Body>
      </form>
    </Drawer>
  );
}
