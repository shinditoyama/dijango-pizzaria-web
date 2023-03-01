import { useRef } from "react";
import ReactToPrint from "react-to-print";
import { Button, Modal } from "rsuite";

interface Props {
  open: boolean;
  onClose: () => void;
  onPrint: boolean;
  temp: any;
}

export default function ModalItem({ open, onClose, onPrint, temp }: Props) {
  const componentRef = useRef(null);

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>{temp?.table || temp.custumer?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="relative overflow-x-auto">
          <table className="w-full text-left">
            <thead className="uppercase text-gray-700  bg-gray-200">
              <tr>
                <th className="px-6 py-3">Nome</th>
                <th>Qtde.</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              {temp.items?.map((item: any, index: any) => (
                <tr key={index} className="bg-gray-50 border-b">
                  <td className="px-6 py-4">
                    {item.name} {item.size && `(${item.size})`}
                  </td>
                  <td>x{item.quantity} </td>
                  <td>
                    {item.price.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {onPrint && (
          <ReactToPrint
            trigger={() => (
              <Button onClick={onClose} appearance="primary">
                Imprimir
              </Button>
            )}
            content={() => componentRef.current}
          />
        )}
        <Button onClick={onClose} appearance="subtle">
          Fechar
        </Button>
      </Modal.Footer>
      <div className="hidden">
        <div ref={componentRef} className="p-2">
          <p className="font-semibold text-center">Pedido de entrega</p>
          <div className="border-t border-b">
            {temp.items?.map((item: any, index: any) => (
              <div key={index} className="p-2">
                <div className="flex justify-between">
                  x{item.quantity}
                  <div className="w-full text-left mx-2">
                    {item.name} {item.size && `(${item.size})`}
                  </div>
                  {item.price.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div className="ml-4">
                  {item.additional &&
                    `- Adicional: Borda ${item.additional.name}`}
                </div>
                <div className="ml-4">
                  {item.observation && `- Observação: ${item.observation}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
