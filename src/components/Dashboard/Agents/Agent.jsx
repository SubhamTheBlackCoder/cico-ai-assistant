import React, { useState } from "react";
import styled from "styled-components";
import { VscRefresh } from "react-icons/vsc";
import { RxPinTop } from "react-icons/rx";
import { BsPinAngle } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MdInfoOutline } from "react-icons/md";
import { FcOk } from "react-icons/fc";
import {
  GiAbstract006,
  GiAbstract036,
  GiAbstract060,
  GiAbstract092,
  GiAbstract087,
} from "react-icons/gi";

const AgentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const agents = [
    {
      id: 1,
      name: "Pre Checkin Agent",
      icon: <GiAbstract006 />,
      type: "Pre Verification",
      typeDescription: "Invoice, Booking, Photo & ID Proof",
      availability: "All users",
      supportedIn: "End User Access, Admin, Manager & Staff",
      dateCreated: "September 25, 2025",
    },
    {
      id: 2,
      name: "Welcome Receptionist",
      icon: <GiAbstract036 />,
      type: "Auto Verification",
      typeDescription: "Photo, Document & Generating QR for Digi Key",
      availability: "All users",
      supportedIn: "End User, Admin, Manager & Staff",
      dateCreated: "September 25, 2025",
    },
    {
      id: 3,
      name: "Food Ordering Agent - Chef",
      icon: <GiAbstract060 />,
      type: "AI Food Order System",
      typeDescription: "",
      availability: "All users",
      supportedIn: "End User, Stewards, Kitchen, Manager",
      dateCreated: "September 25, 2025",
    },
    {
      id: 4,
      name: "Transport Facilitator Agent",
      icon: <GiAbstract092 />,
      type: "AI Transport Booking",
      typeDescription: "",
      availability: "All users",
      supportedIn: "End User, Admin, Transport Vendor and Manager",
      dateCreated: "September 23, 2025",
    },
    {
      id: 5,
      name: "Technical Support Agent",
      icon: <GiAbstract087 />,
      type: "AI Technical Support",
      typeDescription: "",
      availability: "All users",
      supportedIn: "End User, Vendor, Internal Technical Staff & Manager",
      dateCreated: "September 23, 2025",
    },
  ];

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <SearchBar>
        <LeftSection>
          <ActionButton>
            <VscRefresh />
            Refresh
          </ActionButton>
          <ActionButton>
            <RxPinTop />
            Upload custom agent
          </ActionButton>
          <ActionButton>
            <BsPinAngle />
            Manage pinned agents
          </ActionButton>
        </LeftSection>

        <RightSection>
          <ItemsCount>{filteredAgents.length} items</ItemsCount>
          <SearchWrapper>
            <SearchIcon>
              <FiSearch />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchWrapper>
          <FilterButton>
            <HiOutlineMenuAlt2 />
          </FilterButton>
        </RightSection>
      </SearchBar>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <NameHeader>Name</NameHeader>
              <TypeHeader>
                Type
                <InfoIcon>
                  <MdInfoOutline />
                </InfoIcon>
              </TypeHeader>
              <AvailabilityHeader>
                Availability
                <InfoIcon>
                  <MdInfoOutline />
                </InfoIcon>
              </AvailabilityHeader>
              <SupportedHeader>Supported in</SupportedHeader>
              <DateHeader>
                Date created
                <SortIcon>⬇</SortIcon>
              </DateHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAgents.map((agent) => (
              <TableRow key={agent.id}>
                <NameCell>
                  <AgentIcon>{agent.icon}</AgentIcon>
                  <AgentName>{agent.name}</AgentName>
                </NameCell>
                <TypeCell>
                  <TypeMain>{agent.type}</TypeMain>
                  {agent.typeDescription && (
                    <TypeDescription>{agent.typeDescription}</TypeDescription>
                  )}
                </TypeCell>
                <AvailabilityCell>
                  <CheckmarkIcon>
                    <FcOk />
                  </CheckmarkIcon>
                  {agent.availability}
                </AvailabilityCell>
                <SupportedCell>{agent.supportedIn}</SupportedCell>
                <DateCell>{agent.dateCreated}</DateCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 80px;
  padding: auto;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: transparent;

  @media screen and (max-width: 768px) {
    padding: 15px;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  gap: 20px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0;

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    gap: 8px;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: transparent;
  border: none;
  border-radius: 0;
  cursor: pointer;
  font-size: 13px;
  color: #0078d4;
  transition: background-color 0.2s;
  white-space: nowrap;

  &:hover {
    background-color: #f3f2f1;
  }

  svg {
    font-size: 14px;
  }

  @media screen and (max-width: 768px) {
    padding: 10px 12px;
    font-size: 12px;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media screen and (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const ItemsCount = styled.span`
  font-size: 13px;
  color: #605e5c;
  font-weight: 400;
  white-space: nowrap;

  @media screen and (max-width: 768px) {
    order: -1;
    align-self: flex-start;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 250px;

  @media screen and (max-width: 768px) {
    flex: 1;
    width: auto;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: #605e5c;
  font-size: 14px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 6px 8px 6px 28px;
  border: 1px solid #8a8886;
  border-radius: 2px;
  font-size: 13px;
  outline: none;

  &:focus {
    border-color: #0078d4;
  }

  &::placeholder {
    color: #a19f9d;
  }
`;

const FilterButton = styled.button`
  padding: 6px 10px;
  background: transparent;

  border-radius: 2px;
  cursor: pointer;
  font-size: 16px;
  color: #0078d4;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f3f2f1;
  }

  svg {
    font-size: 16px;
  }
`;

const TableContainer = styled.div`
  background: transparent;
  border: none;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  min-width: 1000px;
`;

const TableHead = styled.thead`
  background-color: #faf9f8;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #edebe9;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const TableHeader = styled.th`
  text-align: left;
  font-weight: 600;
  font-size: 12px;
  color: #323130;
  padding: 12px 16px;
  border-bottom: 1px solid #d2d0ce;
`;

const NameHeader = styled(TableHeader)`
  width: 250px;
`;

const TypeHeader = styled(TableHeader)`
  width: 220px;
`;

const AvailabilityHeader = styled(TableHeader)`
  width: 130px;
`;

const SupportedHeader = styled(TableHeader)`
  width: 300px;
`;

const DateHeader = styled(TableHeader)`
  width: 150px;
`;

const TableBody = styled.tbody``;

const TableCell = styled.td`
  padding: 12px 16px;
  vertical-align: top;
  color: #323130;
  font-size: 13px;
`;

const NameCell = styled(TableCell)`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AgentIcon = styled.div`
  font-size: 20px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  color: #323130;
`;

const AgentName = styled.div`
  font-weight: 400;
  color: #323130;
`;

const TypeCell = styled(TableCell)``;

const TypeMain = styled.div`
  color: #323130;
  margin-bottom: 2px;
`;

const TypeDescription = styled.div`
  font-size: 11px;
  color: #605e5c;
  line-height: 1.3;
`;

const AvailabilityCell = styled(TableCell)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CheckmarkIcon = styled.div`
  color: #107c10;
  font-size: 16px;
  font-weight: bold;
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

const SupportedCell = styled(TableCell)`
  color: #323130;
`;

const DateCell = styled(TableCell)`
  color: #323130;
`;

const InfoIcon = styled.span`
  margin-left: 4px;
  font-size: 14px;
  color: #0078d4;
  cursor: help;
  display: inline-flex;
  align-items: center;
`;

const SortIcon = styled.span`
  margin-left: 4px;
  font-size: 10px;
  color: #0078d4;
  cursor: pointer;
`;

export default AgentsPage;
