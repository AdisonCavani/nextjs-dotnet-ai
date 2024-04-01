import type { AdapterAccount } from "@auth/core/adapters";
import { relations, sql, type InferSelectModel } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

const tablePrefix = process.env.NODE_ENV === "production" ? "prod" : "dev";
export const createTable = pgTableCreator(
  (name) => `todo-list-${tablePrefix}_${name}`,
);

export const taskPriorityEnum = pgEnum("priority", ["P1", "P2", "P3", "P4"]);

export const tasks = createTable(
  "task",
  {
    id: text("id").primaryKey().notNull(),
    listId: text("listId")
      .references(() => lists.id)
      .notNull(),
    title: text("title").notNull(),
    description: text("description"),
    dueDate: timestamp("dueDate"),
    isCompleted: boolean("isCompleted").notNull(),
    isImportant: boolean("isImportant").notNull(),
    priority: taskPriorityEnum("priority").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .$onUpdateFn(() => new Date())
      .notNull(),
  },
  (task) => ({
    listIdIdx: index("task_listId_idx").on(task.listId),
  }),
);

export const tasksRelations = relations(tasks, ({ one }) => ({
  list: one(lists, { fields: [tasks.listId], references: [lists.id] }),
}));

export type TaskType = InferSelectModel<typeof tasks>;

export const lists = createTable(
  "list",
  {
    id: text("id").primaryKey().notNull(),
    userId: text("userId")
      .references(() => users.id)
      .notNull(),
    name: text("name").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .$onUpdateFn(() => new Date())
      .notNull(),
  },
  (list) => ({
    userIdIdx: index("list_userId_idx").on(list.userId),
  }),
);

export const listsRelations = relations(lists, ({ one }) => ({
  user: one(users, { fields: [lists.userId], references: [users.id] }),
}));

export type ListType = InferSelectModel<typeof lists>;

export const users = createTable("user", {
  id: text("id").primaryKey().notNull(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
  image: text("image"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .$onUpdateFn(() => new Date())
    .notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "account",
  {
    userId: text("userId")
      .references(() => users.id)
      .notNull(),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .$onUpdateFn(() => new Date())
      .notNull(),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: text("sessionToken").primaryKey().notNull(),
    userId: text("userId")
      .references(() => users.id)
      .notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .$onUpdateFn(() => new Date())
      .notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .$onUpdateFn(() => new Date())
      .notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
