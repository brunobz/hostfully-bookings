import { useState } from "react";

export const useConfirmationModal = (deleteBooking: (data: string) => void) => {
  const [data, setData] = useState<string | null>(null);

  const onCancel = () => setData(null);

  const onConfirm = () => {
    if (data) deleteBooking(data);
    setData(null);
  };

  const onDelete = (id: string) => {
    setData(id);
  };

  return {
    data,
    onConfirm,
    onCancel,
    onDelete,
  };
};
