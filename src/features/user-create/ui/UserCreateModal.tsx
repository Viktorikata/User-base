import React from "react";
import { Button, Form, Input, Modal } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../../../entities/user/api/create-user";
import { isValidHttpUrl } from "../../../shared/lib/validators";

type Props = {
  open: boolean;
  onClose: () => void;
};

type FormValues = {
  name: string;
  avatar: string;
};

export function UserCreateModal({ open, onClose }: Props) {
  const [form] = Form.useForm<FormValues>();
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["users"] });
      form.resetFields();
      onClose();
    },
  });

  const handleCancel = () => {
    if (mutation.isPending) return;
    onClose();
  };

  const handleFinish = (values: FormValues) => {
    mutation.mutate(values);
  };

  return (
    <Modal
      title="Создание пользователя"
      open={open}
      onCancel={handleCancel}
      footer={null}
      maskClosable={!mutation.isPending}
      closable={!mutation.isPending}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Имя"
          name="name"
          rules={[{ required: true, message: "Введите имя" }]}
        >
          <Input disabled={mutation.isPending} placeholder="Иван Иванов" />
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
          <Input disabled={mutation.isPending} placeholder="https://..." />
        </Form.Item>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <Button onClick={handleCancel} disabled={mutation.isPending}>
            Отмена
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={mutation.isPending}
            disabled={mutation.isPending}
          >
            Создать
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
