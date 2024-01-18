# Next.js Server Action Hook
This package offers a React hook for managing server actions in a Next.js client-side environment. It leverages the useTransition hook for efficient loading state and error management.

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
  const [run, clearError, { error, loading, data: name }] =
    useServerAction(action);

  return (
    <>
      {loading && <div>Loading...</div>}
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
The `run` function, when invoked it initiates the states `loading`, `error`, and `data` - are dynamically updated based on the status and outcome of the promise operation,
**providing real-time feedback that can be used to control the rendering of the component.**

## API

```ts
useServerAction(action: () => Promise<any>): [
  run: (...args: any[]) => Promise<{ data?: any; error?: any }>,
  clearError: () => void,
  state: { loading: boolean; error?: any; data?: any }
]
```

- `action`: The server action to handle. This should be a function that returns a Promise.
- `run`: A function that calls the server action with the provided arguments and returns a Promise that resolves to an object with data and error properties.
- `clearError`: A function that clears the error state.
- `state`: An object with `loading`, `error`, and `data` properties.

## License
MIT