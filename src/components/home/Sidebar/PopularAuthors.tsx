import { useEffect, useState } from 'react';
import IUser from '../../../../types/user.d';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { StyledHrHorizontal } from '../../../styles/styledComponents/StyledHr';
import {
  SidebarAdditionalInfo,
  SidebarHeader,
  SidebarInfoFirstRow,
  SidebarItemTitle,
  SidebarItemUsername,
  SidebarList,
} from '../../../styles/styledComponents/SidebarComponents';

const StyledH2 = styled(SidebarHeader)``;
const StyledUserList = styled(SidebarList)``;
const StyledUserInfo = styled(SidebarInfoFirstRow)``;
const StyledUserFullName = styled(SidebarItemTitle)``;
const StyledUsername = styled(SidebarItemUsername)``;
const StyledLikesCount = styled(SidebarAdditionalInfo)``;

interface PopularAuthors {
  user: Partial<IUser>;
  likesCount: number;
}

const PopularAuthors = () => {
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    const getPopularAuthors = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/popular`);
      const data = await res.json();
      setAuthors(data);
    };
    getPopularAuthors();
  }, []);

  return (
    <div>
      <StyledH2>Popular Authors</StyledH2>
      <StyledHrHorizontal />
      <StyledUserList>
        {!!authors.length &&
          authors.map((author: PopularAuthors, index: number) => {
            const {
              likesCount,
              user: { _id, username, firstName, lastName },
            } = author;
            return (
              <li key={index}>
                <Link to={`/users/${_id}`}>
                  <StyledUserInfo>
                    <StyledUserFullName>
                      {firstName} {lastName}
                    </StyledUserFullName>
                    <StyledUsername>@{username}</StyledUsername>
                  </StyledUserInfo>
                  <StyledLikesCount>{likesCount} Likes</StyledLikesCount>
                </Link>
              </li>
            );
          })}
      </StyledUserList>
    </div>
  );
};

export default PopularAuthors;
