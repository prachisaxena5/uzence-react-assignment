import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { InputField } from '../src/components/InputField/InputField';
import type { InputFieldProps } from '../src/types';


const meta: Meta<InputFieldProps> = {
title: 'Components/Form/InputField',
component: InputField,
argTypes: {
variant: {
control: 'select',
options: ['outlined', 'filled', 'ghost'],
},
size: {
control: 'select',
options: ['sm', 'md', 'lg'],
},
},
};
export default meta;


// Template for interactive states
const Template = (args: InputFieldProps) => {
const [value, setValue] = useState(args.value || '');
return (
<InputField
{...args}
value={value}
onChange={(e) => setValue(e.target.value)}
onClear={() => setValue('')}
/>
);
};


export const Default: StoryObj<InputFieldProps> = {
render: (args) => <Template {...args} />,
args: {
label: 'Name',
placeholder: 'Enter your name',
helperText: 'This is a helper text.',
variant: 'outlined',
size: 'md',
value: '',
},
};


export const FilledVariant: StoryObj<InputFieldProps> = {
render: (args) => <Template {...args} />,
args: {
label: 'Email',
placeholder: 'you@example.com',
variant: 'filled',
size: 'lg',
errorMessage: 'Please enter a valid email.',
invalid: true,
},
};


export const GhostPassword: StoryObj<InputFieldProps> = {
render: (args) => <Template {...args} />,
args: {
label: 'Password',
placeholder: 'Enter password',
type: 'password',
variant: 'ghost',
size: 'sm',
},
};
