import React from "react";
import { Button, Form, Input, Modal, Space } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "../../../entities/user/model/types";
import { updateUser } from "../../../entities/user/api/update-user";
import { deleteUser } from "../../../entities/user/api/delete-user";
import { isValidHttpUrl } from "../../../shared/lib/validators";

type Props = {
  open: boolean;
  user: User | null;
  onClose: () => void;
};

type FormValues = {
  id: string;
  name: string;
  avatar: string;
};

export function UserEditModal({ open, user, onClose }: Props) {
  const [form] = Form.useForm<FormValues>();
  const qc = useQueryClient();

  React.useEffect(() => {
    if (open && user) {
      form.setFieldsValue({
        id: user.id,
        name: user.name,
        avatar: user.avatar,
      });
    }
  }, [open, user, form]);

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["users"] });
      onClose();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["users"] });
      onClose();
    },
  });

  const busy = updateMutation.isPending || deleteMutation.isPending;

  const handleCancel = () => {
    if (busy) return;
    onClose();
  };

  const handleFinish = (values: FormValues) => {
    updateMutation.mutate(values);
  };

  const handleDelete = () => {
    if (!user) return;
    deleteMutation.mutate(user.id);
  };

  return (
    <Modal
      title="Редактирование пользователя"
      open={open}
      onCancel={handleCancel}
      footer={null}
      maskClosable={!busy}
      closable={!busy}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item label="ID" name="id">
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Имя"
          name="name"
          rules={[{ required: true, message: "Введите имя" }]}
        >
          <Input disabled={busy} />
        </Form.Item>

        <Form.Item
          label="Ссылка на аватар"
          name="avatar"
          rules={[
            { required: true, message: "Введите ссылку" },
            {
              validator: (_, value) => {
                if (!value) return Promise.resolve();
                return isValidHttpUrl(value)
                  ? Promise.resolve()
                  : Promise.reject(new Error("Некорректная ссылка"));
              },
            },
          ]}
        >
          <Input disabled={busy} />
        </Form.Item>

        <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
          <Button danger onClick={handleDelete} disabled={busy}>
            Удалить
          </Button>

          <Space>
            <Button onClick={handleCancel} disabled={busy}>
              Отмена
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={updateMutation.isPending}
              disabled={busy}
            >
              Сохранить
            </Button>
          </Space>
        </div>
      </Form>
    </Modal>
  );
}
