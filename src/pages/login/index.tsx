import React from "react";
import { Button, Form, Input, notification } from "antd";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../shared/api/auth";
import { setToken } from "../../shared/lib/auth";
import { useNavigate } from "react-router-dom";

type FormValues = { login: string; password: string };

export function LoginPage() {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setToken(data.token);
      navigate("/users", { replace: true });
    },
    onError: (err: any) => {
      const message = err?.message ?? "Ошибка авторизации";
      notification.error({ message });
    },
  });

  const onFinish = (values: FormValues) => {
    loginMutation.mutate(values);
  };

  return (
    <div style={{ maxWidth: 360, margin: "80px auto", padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>Авторизация</h2>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Логин"
          name="login"
          rules={[{ required: true, message: "Введите логин" }]}
        >
          <Input placeholder="admin" disabled={loginMutation.isPending} />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Введите пароль" }]}
        >
          <Input.Password placeholder="admin" disabled={loginMutation.isPending} />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          block
          loading={loginMutation.isPending}
          disabled={loginMutation.isPending}
        >
          Войти
        </Button>
      </Form>
    </div>
  );
}
