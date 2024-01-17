# Next.js Server Action Hook

This package provides a React hook for handling Next.js server actions on the client side. It uses the built-in `useTransition` hook to manage loading states and error handling.

## Installation

```bash
npm install next-server-action-hook
```
or

```bash
yarn add next-server-action-hook
```

## Usage
```ts
import useServerAction from 'next-server-action-hook';

// Your server action
const fetchUser = async (id) => {
  const res = await fetch(`/api/user/${id}`);
  const data = await res.json();
  return data;
};

function UserProfile({ id }) {
  const [run, clearError, { loading, error, data }] = useServerAction(fetchUser);

  useEffect(() => {
    run(id);
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
    </div>
  );
}
```

In this example, useServerAction is used to handle the fetchUser server action. The run function is called with the id parameter to fetch the user data. The loading, error, and data states are used to render the component.

## API
`useServerAction(action: ServerAction): [run: (...args: any[]) => Promise<{ data?: any; error?: any }>, clearError: () => void, state: { loading: boolean; error?: any; data?: any }]`

- `action`: The server action to handle. This should be a function that returns a Promise.
- `run`: A function that calls the server action with the provided arguments and returns a Promise that resolves to an object with data and error properties.
- `clearError`: A function that clears the error state.
- `state`: An object with `loading`, `error`, and `data` properties.

## License
MIT