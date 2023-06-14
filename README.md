# blog-admin-frontend

- dashboard -> if not following anyone fix

- deleted data should not exist if not deleted

  - some form is adding deleted data to the db
    - check that this is fixed
  - check that deleting yourself -> isDeleted = true
  - make sure email and username doesn't show up to public

- somehow when token expires -> redirect to login
- admin -> filter needs to just be search

- Dashboard

  - Search
  - Link to comment instead of post
  - scroll to comments from button
    - preview
    - activity`
  - save posts

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
