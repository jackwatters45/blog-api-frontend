# blog-admin-frontend

## Next

- backend commits
- reorganize helpers
  - check that user helpers aren't taking in a full user when they only need the id etc
- add optional limits for relevant controller funcs

- popular time range
- explore
  - posts
  - users
- still meh responsive

- Create post (check eventually section before doing)

  - add imgs

- Admin stuff
  - view unpublished posts
  - own page
    - create other admin
    - topics
  - on top of other pages
    - delete
- settings?

## Eventually

- General

  - interface vs type consistency
  - handle posts and users deleted (maybe comments too)
  - stupid scrollbar
  - add loading
  - display count on pages (explore-topics etc)

- Posts

  - rich text editor
    - for post content and comments
  - figure out good min content length
  - add imgs
  - calculate read time
  - tags separate link eventually but not now
  - add save ability
  - comments
    - 'pagination'
    - improve
      - reply likes etc
      - delete
      - edit
  - add topic
  - scroll to comments from button

- Sidebar

  - add timing to filters (top from last week, month, year, all time)
  - likes or following? (to posts)

- Nav

  - when media query is hit, nav should be a hamburger menu or search bar becomes an icon used to open input
  - Search

- Dashboard

  - Pagination
  - update comments given new schema
  - add comments + likes to preview (num)
  - 'pagination'

- Comment Preview

  - Link to comment instead of post

- User

  - 'pagination'
  - view following
  - add likes

- Admin

- gonna need to figure out how to add different levels of security
- secured endpoint test out

## fix sidebar rerender

If the sidebar component is responsible for fetching data and you want to prevent it from fetching data each time it's rendered, you might consider fetching the data at a higher level component and then passing the data down as props. In this case, the data fetch would happen only when the parent component is mounted.

However, if this isn't feasible or desirable for your specific application, you could also use a state management library like Redux or a context to cache the data. The fetch would then only occur the first time, and subsequent renders of the sidebar would use the cached data.

Here is a basic example using the React Context API:

```jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a new context
const SidebarDataContext = createContext();

// Provider component
export const SidebarDataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/your-data-url').then((response) => {
      response.json().then(setData);
    });
  }, []);

  return (
    <SidebarDataContext.Provider value={data}>{children}</SidebarDataContext.Provider>
  );
};

// Sidebar component
const Sidebar = () => {
  const data = useContext(SidebarDataContext);

  // Render your sidebar using the data
};

// In your top-level component
const App = () => {
  return (
    <SidebarDataProvider>
      <SomeComponent />
      <AnotherComponent />
      <Sidebar />
    </SidebarDataProvider>
  );
};
```

In this example, the `SidebarDataProvider` component fetches the data when it's mounted and provides it to all child components via a context. The `Sidebar` component uses the `useContext` hook to access the data. With this setup, the data fetch will only occur once, when the `SidebarDataProvider` component is first mounted.
