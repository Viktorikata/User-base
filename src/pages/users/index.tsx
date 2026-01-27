import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Button, Space, Table, Typography, notification } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../../entities/user/api/users";
import { User } from "../../entities/user/model/types";
import { clearToken } from "../../shared/lib/auth";

const { Title } = Typography;

export function UsersPage() {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const handleLogout = () => {
    clearToken();
    navigate("/login", { replace: true });
  };

  const handleCreate = () => {
    notification.info({ message: "Модалка создания будет в следующей ветке 🙂" });
  };

  const handleOpenEdit = (user: User) => {
    notification.info({ message: `Открыть редактирование: ${user.name}` });
  };

  const columns = [
    {
      title: "Пользователь",
      key: "user",
      render: (_: unknown, row: User) => (
        <Space>
          <Avatar
            src={row.avatar}
            size={40}
            style={{ cursor: "pointer" }}
            onClick={() => handleOpenEdit(row)}
          />
          <span
            style={{ cursor: "pointer", fontWeight: 500 }}
            onClick={() => handleOpenEdit(row)}
          >
            {row.name}
          </span>
        </Space>
      ),
    },
    {
      title: "Зарегистрирован",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value: string) => dayjs(value).format("DD.MM.YYYY"),
    },
  ];

  if (isError) {
    return (
      <div style={{ padding: 24 }}>
        <Title level={3}>Пользователи</Title>
        <p>Не удалось загрузить пользователей. Проверь baseURL mockapi.io</p>
        <Button onClick={handleLogout}>Выйти</Button>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <Space style={{ width: "100%", justifyContent: "space-between" }}>
        <Title level={3} style={{ margin: 0 }}>
          Пользователи
        </Title>

        <Space>
          <Button onClick={handleCreate} type="primary">
            Создать пользователя
          </Button>
          <Button onClick={handleLogout}>Выход</Button>
        </Space>
      </Space>

      <div style={{ marginTop: 16 }}>
        <Table<User>
          rowKey="id"
          columns={columns as any}
          dataSource={data ?? []}
          loading={isLoading}
          pagination={{ pageSize: 8 }}
        />
      </div>
    </div>
  );
}
