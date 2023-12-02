import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '.'

const meta: Meta = {
  title: 'UI / Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
}

export default meta

// Story for the main Card component
export const BasicCard: StoryObj = {
  render: () => (
    <Card style={{ width: '300px' }}>
      <CardContent>Basic Card Content</CardContent>
    </Card>
  ),
}

export const CompleteCard: StoryObj = {
  render: () => (
    <Card style={{ width: '300px' }}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>Main Content of the Card</CardContent>
      <CardFooter>Footer Content</CardFooter>
    </Card>
  ),
}

export const Header: StoryObj = {
  render: () => (
    <CardHeader>
      <CardTitle>Header Title</CardTitle>
      <CardDescription>Header Description</CardDescription>
    </CardHeader>
  ),
}
