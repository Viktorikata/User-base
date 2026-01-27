# Users Base (React Internship Test)

Приложение для авторизации и управления базой пользователей (список + создание/редактирование/удаление) с использованием mockapi.io.

## Стек
- React 16 + TypeScript
- Webpack + npm
- React Router v6
- Ant Design v5 + styled-components
- TanStack Query v4 + axios
- dayjs
- Архитектура: FSD (Feature-Sliced Design)
- Git / GitHub

## Функциональность
### Авторизация
- Роут: `/login`
- Тестовые данные: **login: `admin`**, **password: `admin`**
- Имитация авторизации через Promise с таймаутом **2000ms**
- При успехе токен сохраняется в `localStorage`
- Если пользователь авторизован — при входе на `/login` происходит редирект на `/users`
- Защита роутов: `/users` доступен только авторизованным

### Пользователи
- Роут: `/users`
- Получение списка пользователей с mockapi.io (GET `/users`)
- Формат даты регистрации: `DD.MM.YYYY` (dayjs)
- Кнопка **Выход** очищает токен и возвращает на `/login`
- Создание пользователя (POST `/users`)
- Редактирование пользователя (PUT `/users/:id`)
- Удаление пользователя (DELETE `/users/:id`)
- После мутаций список обновляется через `invalidateQueries`

### Страница 404
- Роут: `*`
- Используется `Result` из Ant Design

## Настройка mockapi.io
1. Зарегистрироваться на https://mockapi.io
2. Создать проект
3. Создать ресурс **users** (поля по умолчанию)
4. Добавить несколько пользователей через генератор
5. Скопировать **base URL** проекта 
6. Вставить base URL в файл `src/shared/api/http.ts`.

## Данные для входа
- login: `admin`
- password: `admin`

```ts
const BASE_URL = "https://6978e083cd4fe130e3da8504.mockapi.io";
```

## Установка и запуск

1. Установка зависимостей:
```bash
npm install
```

2. Запуск в режиме разработки:
```bash
npm run start
```

3. Сборка:
```bash
npm run build
```
