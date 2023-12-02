import {
  DocumentNode,
  useQuery,
  useMutation,
  QueryHookOptions,
  MutationHookOptions,
  OperationVariables,
} from '@apollo/client'

export const useAppQuery = <
  TData = any,
  TVariables extends OperationVariables = OperationVariables,
>(
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>
) => {
  return useQuery<TData, TVariables>(query, options)
}

export const useAppMutation = <
  TData = any,
  TVariables extends OperationVariables = OperationVariables,
>(
  mutation: DocumentNode,
  options?: MutationHookOptions<TData, TVariables>
) => {
  return useMutation<TData, TVariables>(mutation, options)
}
