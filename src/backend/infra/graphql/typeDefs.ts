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
    order: Int
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
    order: Int
    columnId: String!
    createdByUserId: String!
    createdAt: String
    updatedAt: String
    deletedAt: String
    createdBy: User!
    column: Column!
  }

  type Query {
    # Queries to retrieve data
    columns: [Column!]
    tasks: [Task!]

    getUser(id: ID!): User
    getAllUsers: [User!]
    getColumn(id: ID!): Column
    getTask(id: ID!): Task
  }

  type Mutation {
    createTask(
      id: ID!
      title: String!
      content: String
      order: Int
      columnId: String!
    ): Success
    deleteTask(taskId: ID!): Success
    updateTask(id: ID!, title: String, content: String, order: Int): Success

    # createUser(name: String!, email: String!, password: String!): User
    # updateUser(
    #   id: ID!
    #   name: String
    #   email: String
    #   password: String
    #   role: String
    #   picture: String
    #   verified: Boolean
    # ): User
    # deleteUser(id: ID!): User

    # createColumn(title: String!, createdByUserId: String!): Column
    # updateColumn(id: ID!, title: String, order: Int): Column
    # deleteColumn(id: ID!): Column
  }
`
