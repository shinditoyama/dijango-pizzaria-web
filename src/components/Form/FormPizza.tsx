import FirebaseService from "@/lib/firebase.services";
import { useState } from "react";
import { Button, Drawer, Input, InputNumber } from "rsuite";

interface Props {
  open: boolean;
  onClose: () => void;
  temp?: any;
}

export default function FormPizza({ open, onClose, temp }: Props) {
  const [name, setName] = useState(temp?.name || "");
  const [priceOne, setPriceOne] = useState(temp?.priceOne || "");
  const [priceTwo, setPriceTwo] = useState(temp?.priceTwo || "");
  const [description, setDescription] = useState(temp?.description || "");
  const isAddMode = !temp?.id;

  const newDoc = {
    name,
    priceOne: Number(priceOne),
    priceTwo: Number(priceTwo),
    description,
  };

  const createData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await FirebaseService.addDocument("pizzas", newDoc);
    } catch (err) {
      console.log(err);
    } finally {
      onClose();
    }
  };

  const updateData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await FirebaseService.updateDocument("pizzas", temp?.id, newDoc);
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
            {isAddMode ? "Cadastrar Pizza" : "Editar Pizza"}
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
              <label htmlFor="price">Preço Broto</label>
              <InputNumber
                type="text"
                placeholder="Preço Broto"
                prefix="R$"
                value={priceOne}
                onChange={(e) => setPriceOne(e)}
                required
              />
            </div>
            <div>
              <label htmlFor="price">Preço Grande</label>
              <InputNumber
                type="text"
                placeholder="Preço Grande"
                prefix="R$"
                value={priceTwo}
                onChange={(e) => setPriceTwo(e)}
                required
              />
            </div>
            <div>
              <label htmlFor="description">Descrição</label>
              <Input
                type="text"
                placeholder="Descrição..."
                value={description}
                onChange={(e) => setDescription(e)}
                required
              />
            </div>
          </div>
        </Drawer.Body>
      </form>
    </Drawer>
  );
}
