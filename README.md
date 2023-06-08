# blog-admin-frontend

## Next

- General

  - make selects responsive (wrap)
  - center unauthorized message

  - handle posts and users deleted (maybe comments too)

    - add userDelete field
    - remove fields
      - password
      - email
    - make user private to regular users
    - not able to find user
    - keep their content public but make sure it doesn't break
      - posts
      - comments
    - name -> redacted user

  - images

    - posts
    - users

  - make sure everything has loading

## Eventually

- admin -> filter needs to just be search
- Dashboard

  - Search
  - add a following tab
  - Link to comment instead of post
  - scroll to comments from button
    - preview
    - activity`
  - save posts

- Posts

  - calculate read time
  - add imgs

- comments

  - make text area
  - improve
    - reply likes etc
    - delete
    - edit
  - sort by option?
  - pagination

- User

  - view following
  - add likes

- reorganize css
- Optimize components

  - should be a way to combine the edit(Posts | Topics | Users) pages
  - make sure everything is memoized
  - make sure everything is only rerendering when it needs to

## After

- readme for nav
  - cleanup git
  - versions
  - min width of dropdown
  - arrow spacing
  - indent of hamburger
- filter package

## Delete

- likesCount seems unnecessary

- select styling
  - export const StyledTimeRange = styled(TimeRange)`@media (max-width: 420px) {flex-direction: column;gap: 0rem;}`;
