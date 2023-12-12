import gql from 'graphql-tag'

export const typeDefs = gql`
  type Success {
    success: Boolean
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    role: String
    picture: String
    verified: Boolean
    createdAt: String
    updatedAt: String
    deletedAt: String
    columns: [Column!]
    tasks: [Task!]
  }

  type Column {
    id: ID!
    title: String!
    order: String
    createdByUserId: String!
    createdAt: String
    updatedAt: String
    deletedAt: String
    createdBy: User!
    tasks: [Task!]
  }

  type Task {
    id: ID!
    title: String!
    content: String
    order: String
    columnId: String!
    createdByUserId: String!
    createdAt: String
    updatedAt: String
    deletedAt: String
    createdBy: User!
    column: Column!
  }

  type Query {
    columns: [Column!]
    tasks: [Task!]
  }

  input ColumnOrderInput {
    id: ID!
    order: String!
  }

  input TaskOrderInput {
    id: ID!
    order: String!
    columnId: ID!
  }

  type Mutation {
    createColumn(id: ID!, title: String!, order: String): Success
    deleteColumn(columnId: ID!): Success
    updateColumn(id: ID!, title: String, order: String): Success
    updateColumnsOrder(columns: [ColumnOrderInput!]!): Success

    createTask(
      id: ID
      title: String!
      content: String
      order: String
      columnId: String!
    ): Success
    deleteTask(taskId: ID!): Success
    updateTask(
      id: ID!
      title: String
      content: String
      order: String
      columnId: ID
    ): Success
    updateTasksOrder(tasks: [TaskOrderInput]): Success
  }
`
