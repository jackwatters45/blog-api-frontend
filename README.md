# blog-admin-frontend

- somehow when token expires -> redirect to login

  - add to frontend requests with credentials
    - if status is 401 -> login
    - if status is 403 -> unauthorized

- Dashboard

  - save posts

    - add to user model
    - meep meep

  - Search

    - probably make its own routes page
    - home page
    - admin -> filter needs to just be search but of specific category

  - Link to comment instead of post
    - scroll to comments from button
      - preview
      - activity`

- comments

  - improve
    - reply likes etc
    - delete
    - edit
  - sort by option?
  - pagination

- reorganize css
- make sure remove cookies works
  - signing out / deleting
    - backend: removing jwt cookie
- Optimize components
  - make sure everything is memoized
  - make sure everything is only rerendering when it needs to
