import gql from 'graphql-tag'

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    role: String
    photo: String
    verified: Boolean
    createdAt: String
    updatedAt: String
    columns: [Column!]
    tasks: [Task!]
  }

  type Column {
    id: ID!
    title: String!
    order: Int
    content: String
    createdBy: User!
    createdAt: String
    updatedAt: String
    tasks: [Task!]
  }

  type Task {
    id: ID!
    title: String!
    order: Int
    createdBy: User!
    createdAt: String
    updatedAt: String
    column: Column!
  }

  type Query {
    columns: [Column!]
    tasks: [Task!]
    column(id: ID!): Column
    task(id: ID!): Task
  }

  type Mutation {
    upsertColumn(
      id: ID
      title: String!
      order: Int
      content: String
      userId: ID!
    ): Column!
    upsertTask(
      id: ID
      title: String!
      order: Int
      columnId: ID!
      userId: ID!
    ): Task!
  }
`
