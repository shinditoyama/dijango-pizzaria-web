import FirebaseService from "@/lib/firebase.services";
import { useState } from "react";
import { Button, Drawer, Input, InputNumber } from "rsuite";

interface Props {
  open: boolean;
  onClose: () => void;
  temp?: any;
}

export default function FormOptional({ open, onClose, temp }: Props) {
  const [name, setName] = useState(temp?.name || "");
  const [price, setPrice] = useState(temp?.price || "");
  const isAddMode = !temp?.id;

  const newDoc = {
    name,
    price: Number(price),
  };

  const createData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await FirebaseService.addDocument("optionals", newDoc);
    } catch (err) {
      console.log(err);
    } finally {
      onClose();
    }
  };

  const updateData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await FirebaseService.updateDocument("optionals", temp?.id, newDoc);
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
            {isAddMode ? "Cadastrar Adicionais" : "Editar Adicionais"}
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
              <label htmlFor="email">Nome</label>
              <Input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(text) => setName(text)}
                required
              />
            </div>
            <div>
              <label htmlFor="price">Preço </label>
              <InputNumber
                type="text"
                placeholder="Preço Grande"
                prefix="R$"
                value={price}
                onChange={(e) => setPrice(e)}
                required
              />
            </div>
          </div>
        </Drawer.Body>
      </form>
    </Drawer>
  );
}
