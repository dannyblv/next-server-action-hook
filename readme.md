# Next.js Server Action Hook
<img src="https://github.com/dannyblv/next-server-action-hook/actions/workflows/node.js.yml/badge.svg" alt="CI status" /> <a href="https://www.npmjs.com/package/next-server-action-hook" title="View this project on NPM"><img src="https://img.shields.io/npm/v/next-server-action-hook" alt="NPM version" /></a> <img src="https://img.shields.io/npm/dw/next-server-action-hook" alt="Weekly downloads" />

This package offers a React hook for managing server actions in a Next.js client-side environment. It leverages the useTransition hook for efficient loading state and error management.

## Playground
https://codesandbox.io/p/devbox/next-js-server-action-hook-y32wh8?file=%2Fapp%2Fform.tsx%3A20%2C26

## Installation
```bash
npm install next-server-action-hook
```
or
```bash
yarn add next-server-action-hook
```

## Usage
Showcase of handling a form submission with a server action
```ts
// page.ts
import Form from "./form";

const FormPage = () => {
  const handleSubmit = async (formData: FormData) => {
    "use server";

    const name = formData.get("name");

    // validation and error example
    if (!name) {
      throw new Error("Name is required");
    }

    // your spot to handle the server stuff ...
    return name as string;
  };

  return <Form action={handleSubmit} />;
};

export default FormPage;
```

```ts
// form.tsx (client)
"use client";
import useServerAction from "next-server-action-hook";

const Form = ({
  action,
}: {
  action: (formData: FormData) => Promise<string>;
}) => {
  const [run, { error, isLoading, data: name }, clearError] =
    useServerAction(action);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {name && <div>Hey {name}!</div>}

      <h1>Form</h1>

      <form action={run}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={() => clearError()}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Form;
```

In the given example, `useServerAction` is utilized to manage the `handleSubmit` server action.
The `run` function, when invoked it initiates the states `isLoading`, `error`, and `data` - are dynamically updated based on the status and outcome of the promise operation,
**providing real-time feedback that can be used to control the rendering of the component.**

## API

```ts
useServerAction(action: () => Promise<any>): [
  run: (...args: any[]) => Promise<{ data?: any; error?: any }>,
  state: { isLoading: boolean; error?: any; data?: any },
  clearError: () => void
]
```

- `action`: The server action to handle. This should be a function that returns a Promise.
- `run`: A function that calls the server action with the provided arguments and returns a Promise that resolves to an object with data and error properties.
- `state`: An object with `isLoading`, `error`, and `data` properties.
- `clearError`: A function that clears the error state.

## Updates 
  - to v1.2.0 breaking
    - `loading` is now `isLoading`.
    - `clearError` is now the 3rd item in the returned array.

## License
MIT