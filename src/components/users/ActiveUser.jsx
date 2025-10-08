import React, { useState } from "react";
import styled from "styled-components";
import { LuUserRoundPlus, LuUserRoundX } from "react-icons/lu";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoLockClosedOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";

const ActiveUsersPage = () => {
  const [tableSearchTerm, setTableSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const users = [
    {
      id: 1,
      displayName: "Super Admin",
      username: "suadmin@rabinson.com",
      licenses: "Subscription / Month",
      status: "Active",
    },
    {
      id: 2,
      displayName: "Admin",
      username: "admin@rabinson.com",
      licenses: "Subscription / Month",
      status: "Active",
    },
    {
      id: 3,
      displayName: "Aditya Patro",
      username: "aditya@rabinson.com",
      licenses: "Subscription / Month",
      status: "Active",
    },
    {
      id: 4,
      displayName: "Prashant Kumar",
      username: "prashant@rabinson.com",
      licenses: "Subscription / Month",
      status: "Blocked",
    },
    {
      id: 5,
      displayName: "Raghunath Bhoi",
      username: "raghu@rabinson.com",
      licenses: "Subscription / Month",
      status: "Dormat",
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.displayName.toLowerCase().includes(tableSearchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(tableSearchTerm.toLowerCase())
  ); // Handle select all checkbox

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // Select all filtered users
      const allUserIds = filteredUsers.map((user) => user.id);
      setSelectedUsers(allUserIds);
    } else {
      // Deselect all
      setSelectedUsers([]);
    }
  }; // Handle individual user checkbox

  const handleUserSelect = (userId, e) => {
    if (e.target.checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  }; // Check if all users are selected

  const isAllSelected =
    filteredUsers.length > 0 &&
    filteredUsers.every((user) => selectedUsers.includes(user.id)); // Check if some users are selected (for indeterminate state)

  const isSomeSelected = selectedUsers.length > 0 && !isAllSelected;

  return (
    <Container>
      <MainContent>
        <PageTitle>Active users</PageTitle>
        <HorizontalLine />
        <ActionBar>
          <ActionButton>
            <LuUserRoundPlus />
            Add a user
          </ActionButton>
          <ActionButton>
            <AiOutlineUsergroupAdd />
            Add multiple users
          </ActionButton>
          <ActionButton>
            <IoLockClosedOutline />
            Multi-factor authentication
          </ActionButton>
          <ActionButton>
            <LuUserRoundX />
            Delete a user
          </ActionButton>
        </ActionBar>

        <SearchSection>
          <TableSearchWrapper>
            <SearchIcon>
              <FiSearch />
            </SearchIcon>

            <TableSearch
              type="text"
              placeholder="Search active users list"
              value={tableSearchTerm}
              onChange={(e) => setTableSearchTerm(e.target.value)}
            />
          </TableSearchWrapper>
          <MoreButton>⋯</MoreButton>
        </SearchSection>

        <MobileScrollHint>
          ← Scroll horizontally to view all table columns →
        </MobileScrollHint>

        <TableContainer>
          <Table>
            <thead>
              <tr>
                <TableHeader>
                  <Checkbox
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(input) => {
                      if (input) input.indeterminate = isSomeSelected;
                    }}
                    onChange={handleSelectAll}
                  />
                </TableHeader>
                <TableHeader>
                  Display name <SortIcon>↑</SortIcon>
                </TableHeader>
                <TableHeader>Username</TableHeader>{" "}
                <TableHeader>Licenses</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader></TableHeader>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Checkbox
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={(e) => handleUserSelect(user.id, e)}
                    />
                  </TableCell>
                  <TableCell>{user.displayName}</TableCell>
                  <TableCell>
                    <ActionMenu>⋮</ActionMenu> {user.username}
                  </TableCell>
                  <TableCell>{user.licenses}</TableCell>
                  <TableCell>
                    <StatusText status={user.status}>{user.status}</StatusText>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </MainContent>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 40px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  @media screen and (max-width: 768px) {

    width: 100%;
  }

  @media screen and (max-width: 480px) {
  
    width: 100%;
  }
`;

const MainContent = styled.div`
  background-color: white;
  border-radius: 8px;
  text-align: start;
  padding: 30px;

  @media screen and (max-width: 768px) {
    padding: 20px;
    border-radius: 6px;
  }

  @media screen and (max-width: 480px) {
    padding: 15px;
    border-radius: 4px;
  }
`;

const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin: 0 0 20px 0;

  @media screen and (max-width: 768px) {
    font-size: 24px;
    margin: 0 0 15px 0;
  }

  @media screen and (max-width: 480px) {
    font-size: 20px;
    margin: 0 0 10px 0;
  }
`;

const HorizontalLine = styled.hr`
  border: none;
  height: 1px;
  background-color: #e0e0e0;
  margin: 10px 0;

  @media screen and (max-width: 480px) {
    margin: 8px 0;
  }
`;

const ActionBar = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  align-items: center;
  padding: 15px 0;

  @media screen and (max-width: 768px) {
    gap: 8px;
    padding: 12px 0;
  }

  @media screen and (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    padding: 10px 0;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  border: none;
  background-color: transparent;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  svg {
    font-size: 16px;
    color: #4a90e2;
    flex-shrink: 0;
  }

  &:hover {
    background-color: #f8f9fa;
  }

  @media screen and (max-width: 768px) {
    font-size: 13px;
    padding: 8px 12px;

    svg {
      font-size: 14px;
    }
  }

  @media screen and (max-width: 480px) {
    width: 100%;
    padding: 12px 16px;
    font-size: 14px;
    justify-content: flex-start;
  }
`;

const SearchSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  margin-top: -55px;

  @media screen and (max-width: 768px) {
    margin-top: -45px;
    gap: 10px;
  }

  @media screen and (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    margin-top: 0;
    gap: 10px;
  }
`;

const TableSearchWrapper = styled.div`
  position: relative;
  width: 350px;

  @media screen and (max-width: 768px) {
    width: 280px;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

const TableSearch = styled.input`
  padding: 10px 12px 10px 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.1);
  }

  &::placeholder {
    color: #999;
  }

  @media screen and (max-width: 480px) {
    font-size: 16px;
    padding: 12px 12px 12px 40px;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #4a90e2;
  font-size: 16px;
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  color: #666;

  &:hover {
    background-color: #f5f5f5;
  }

  @media screen and (max-width: 480px) {
    align-self: flex-end;
    padding: 10px;
  }
`;

const TableContainer = styled.div`
  margin-top: 20px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  @media screen and (max-width: 768px) {
    margin-top: 15px;
    border-radius: 4px;
    border: 1px solid #e0e0e0;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  min-width: 600px;

  @media screen and (max-width: 480px) {
    font-size: 13px;
    min-width: 550px;
  }
`;

const TableHeader = styled.th`
  text-align: center;
  padding: 15px 12px;
  border-bottom: 2px solid #e0e0e0;
  font-weight: 600;
  color: #666;
  background-color: #fafafa;
  font-size: 13px;
  white-space: nowrap;

  &:first-child {
    width: 50px;
    padding-left: 15px;
  }

  &:nth-child(2) {
    width: 200px;
    min-width: 150px;
  }

  &:nth-child(3) {
    width: 250px;
    min-width: 200px;
    padding-left: 35px;
  }

  &:nth-child(4) {
    width: 200px;
    min-width: 150px;
  }

  &:nth-child(5) {
    width: 150px;
    min-width: 100px;
  }

  &:last-child {
    width: 50px;
  }

  @media screen and (max-width: 768px) {
    padding: 12px 8px;
    font-size: 12px;
  }

  @media screen and (max-width: 480px) {
    padding: 10px 6px;
    font-size: 11px;
  }
`;

const SortIcon = styled.span`
  margin-left: 5px;
  color: #4a90e2;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f9f9f9;
  }

  &:not(:last-child) td {
    border-bottom: 1px solid #f0f0f0;
  }
`;

const TableCell = styled.td`
  padding: 15px 12px;
  text-align: center;
  color: #333;
  white-space: nowrap;

  &:first-child {
    padding-left: 15px;
  }

  &:nth-child(2) {
    font-weight: 500;
  }

  &:nth-child(3) {
    color: #666;
    padding-left: 35px;
    display: flex;
    align-items: center;
    white-space: normal;
    word-break: break-word;
  }

  &:nth-child(4) {
    color: #666;
  }

  @media screen and (max-width: 768px) {
    padding: 12px 8px;
    font-size: 13px;
  }

  @media screen and (max-width: 480px) {
    padding: 10px 6px;
    font-size: 12px;

    &:nth-child(3) {
      padding-left: 25px;
    }
  }
`;

const Checkbox = styled.input`
  margin: 0;
  width: 16px;
  height: 16px;
  cursor: pointer;

  @media screen and (max-width: 480px) {
    width: 14px;
    height: 14px;
  }
`;

const StatusText = styled.span`
  font-size: 14px;
  font-weight: 500;
  display: inline-block;

  ${(props) => {
    switch (props.status) {
      case "Active":
        return "color: green;";
      case "Blocked":
        return "color: red;";
      case "Dormat":
        return "color: orange;";
      default:
        return "color: #6c757d;";
    }
  }}

  @media screen and (max-width: 480px) {
    font-size: 13px;
  }
`;

const ActionMenu = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  color: #666;
  margin-right: 10px;
  flex-shrink: 0;

  &:hover {
    background-color: #f5f5f5;
  }

  @media screen and (max-width: 480px) {
    font-size: 16px;
    padding: 4px;
    margin-right: 8px;
  }
`;

const MobileScrollHint = styled.div`
  display: none;
  font-size: 12px;
  color: #666;
  text-align: center;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
  margin-bottom: 10px;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

export default ActiveUsersPage;
