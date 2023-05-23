import { PopularAuthors } from '../../../../types/user';
import { Link } from 'react-router-dom';
import { StyledHrHorizontal } from '../../../styles/styledComponents/StyledHr';
import {
  SeeAllLink,
  SidebarAdditionalInfo,
  SidebarHeader,
  SidebarInfoFirstRow,
  SidebarItemTitle,
  SidebarItemUsername,
  SidebarList,
} from '../../../styles/styledComponents/SidebarComponents';
import { useSidebarContext } from '../../../context/SidebarContext';

const PopularAuthors = () => {
  const { authors } = useSidebarContext();

  return (
    <div>
      <SidebarHeader>Popular Authors</SidebarHeader>
      <StyledHrHorizontal />
      <SidebarList>
        {!!authors.length &&
          authors.slice(0, 5).map((author: PopularAuthors, index: number) => {
            const {
              likesCount,
              user: { _id, username, firstName, lastName },
            } = author;
            return (
              <li key={index}>
                <Link to={`/user/${_id}`}>
                  <SidebarInfoFirstRow>
                    <SidebarItemTitle>
                      {firstName} {lastName}
                    </SidebarItemTitle>
                    <SidebarItemUsername>@{username}</SidebarItemUsername>
                  </SidebarInfoFirstRow>
                  <SidebarAdditionalInfo>{likesCount} Likes</SidebarAdditionalInfo>
                </Link>
              </li>
            );
          })}
      </SidebarList>
      <SeeAllLink to={`/explore-authors`}>See the full list</SeeAllLink>
    </div>
  );
};

export default PopularAuthors;
