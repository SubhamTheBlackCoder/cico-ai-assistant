import React, { useState } from "react";
import styled from "styled-components";

const RolesPage = () => {
  const [selectedRoles, setSelectedRoles] = useState([]);

  const roles = [
    {
      id: 1,
      name: "Administrator",
      description:
        "Full Access to control application & handle all AI related requests. Has unlimited access to all management features and most data in all admin centers.",
      category: "Collaboration",
    },
    {
      id: 2,
      name: "Front Office & Bookings",
      description:
        "Have limited access to front office related access like checking of recent bookings, document verification",
      category: "Collaboration",
    },
    {
      id: 3,
      name: "Room Service",
      description:
        "Have limited access to view room service request & update once the task is completed to maintain quality service. Monitor service health frequently to clear all pending task.",
      category: "Collaboration",
    },
    {
      id: 4,
      name: "Kitchen Service",
      description:
        "Has access to modify/cancel the order. All food order request must follow the KOT process and once order complete must pass the same with billing department",
      category: "Collaboration",
    },
    {
      id: 5,
      name: "Transport Service",
      description:
        "Limited access to view recent bookings and assign drivers based on End user request manages service requests, and monitors service health.",
      category: "Collaboration",
    },
    {
      id: 6,
      name: "Document Service",
      description:
        "Have limited access & monitor the document status with proper authentication. Can view all administrative features and settings in all admin centers.",
      category: "Identity",
    },
    {
      id: 7,
      name: "House Keeping/Maintenance",
      description:
        "Have access to all rooms with master key for maintenance & house keeping for cleaning services and monitors service health & update time to time.",
      category: "Collaboration",
    },
    {
      id: 8,
      name: "Vendor Services",
      description: "Have limited access to front office related access",
      category: "Collaboration",
    },
    {
      id: 9,
      name: "Application Technical Support",
      description:
        "Resets passwords and re-authenticates for all non-admins and some admin roles, manages service requests, and monitors service health.",
      category: "Collaboration",
    },
  ];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRoles(roles.map((role) => role.id));
    } else {
      setSelectedRoles([]);
    }
  };

  const handleRoleSelect = (roleId, e) => {
    if (e.target.checked) {
      setSelectedRoles([...selectedRoles, roleId]);
    } else {
      setSelectedRoles(selectedRoles.filter((id) => id !== roleId));
    }
  };

  const isAllSelected =
    roles.length > 0 && roles.every((role) => selectedRoles.includes(role.id));

  const isSomeSelected = selectedRoles.length > 0 && !isAllSelected;

  return (
    <Container>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <TableHeader style={{ width: "50px" }}>
                <Checkbox
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = isSomeSelected;
                  }}
                  onChange={handleSelectAll}
                />
              </TableHeader>
              <TableHeader style={{ width: "200px" }}>
                Name <SortIcon>↑</SortIcon>
              </TableHeader>
              <TableHeader style={{ width: "50px" }}>
                <StarIcon>☆</StarIcon>
              </TableHeader>
              <TableHeader>Description</TableHeader>
              <TableHeader style={{ width: "150px" }}>Category</TableHeader>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>
                  <Checkbox
                    type="checkbox"
                    checked={selectedRoles.includes(role.id)}
                    onChange={(e) => handleRoleSelect(role.id, e)}
                  />
                </TableCell>
                <TableCell>
                  <RoleName>{role.name}</RoleName>
                </TableCell>
                <TableCell>
                  <ActionMenu>⋮</ActionMenu>
                </TableCell>
                <TableCell>
                  <Description>{role.description}</Description>
                </TableCell>
                <TableCell>
                  <CategoryText>{role.category}</CategoryText>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>

      {/* Mobile Cards View */}
      <MobileContainer>
        <MobileHeader>
          <MobileSelectAll>
            <Checkbox
              type="checkbox"
              checked={isAllSelected}
              ref={(input) => {
                if (input) input.indeterminate = isSomeSelected;
              }}
              onChange={handleSelectAll}
            />
            <SelectAllText>Select All</SelectAllText>
          </MobileSelectAll>
          <MobileResults>{roles.length} roles</MobileResults>
        </MobileHeader>

        <MobileRolesList>
          {roles.map((role) => (
            <MobileRoleCard key={role.id}>
              <MobileCardHeader>
                <MobileRoleCheckbox>
                  <Checkbox
                    type="checkbox"
                    checked={selectedRoles.includes(role.id)}
                    onChange={(e) => handleRoleSelect(role.id, e)}
                  />
                </MobileRoleCheckbox>
                <MobileRoleName>{role.name}</MobileRoleName>
                <MobileActionMenu>⋮</MobileActionMenu>
              </MobileCardHeader>

              <MobileCategory>{role.category}</MobileCategory>

              <MobileDescription>{role.description}</MobileDescription>
            </MobileRoleCard>
          ))}
        </MobileRolesList>
      </MobileContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: #f8f9fa;
  margin-top: 56px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  overflow-y: hidden;

  @media screen and (max-width: 1024px) {
    margin-top: 0;
    padding: 12px;
  }

  @media screen and (max-width: 768px) {
    padding: 16px;
  }

  @media screen and (max-width: 480px) {
    padding: 8px;
    margin-top: 40px;
  }
`;

const TableContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const MobileContainer = styled.div`
  display: none;
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 1024px) {
    display: block;
  }

  @media screen and (max-width: 480px) {
    padding: 12px;
    border-radius: 6px;
  }
`;

const MobileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e9ecef;

  @media screen and (max-width: 480px) {
    margin-bottom: 12px;
    padding-bottom: 10px;
  }
`;

const MobileSelectAll = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media screen and (max-width: 480px) {
    gap: 6px;
  }
`;

const SelectAllText = styled.span`
  font-size: 14px;
  color: #495057;
  font-weight: 500;

  @media screen and (max-width: 480px) {
    font-size: 13px;
  }
`;

const MobileResults = styled.span`
  font-size: 12px;
  color: #6c757d;

  @media screen and (max-width: 480px) {
    font-size: 11px;
  }
`;

const MobileRolesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media screen and (max-width: 480px) {
    gap: 10px;
  }
`;

const MobileRoleCard = styled.div`
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 16px;
  background-color: white;

  @media screen and (max-width: 768px) {
    padding: 14px;
  }

  @media screen and (max-width: 480px) {
    padding: 12px;
    border-radius: 6px;
  }
`;

const MobileCardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 12px;

  @media screen and (max-width: 480px) {
    gap: 10px;
    margin-bottom: 6px;
  }
`;

const MobileRoleCheckbox = styled.div`
  flex-shrink: 0;
`;

const MobileRoleName = styled.div`
  font-weight: 600;
  color: #333;
  font-size: 16px;
  flex: 1;
  line-height: 1.3;

  @media screen and (max-width: 768px) {
    font-size: 15px;
  }

  @media screen and (max-width: 480px) {
    font-size: 14px;
  }
`;

const MobileActionMenu = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  color: #6c757d;
  flex-shrink: 0;

  &:hover {
    background-color: #e9ecef;
  }

  @media screen and (max-width: 480px) {
    font-size: 16px;
    padding: 3px;
  }
`;

const MobileCategory = styled.div`
  font-size: 12px;
  color: #6c757d;
  background-color: #f8f9fa;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 8px;

  @media screen and (max-width: 480px) {
    font-size: 11px;
    padding: 3px 6px;
    margin-bottom: 6px;
  }
`;

const MobileDescription = styled.div`
  color: #6c757d;
  font-size: 14px;
  line-height: 1.4;

  @media screen and (max-width: 768px) {
    font-size: 13px;
  }

  @media screen and (max-width: 480px) {
    font-size: 12px;
    line-height: 1.3;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 16px 15px;
  border-bottom: 1px solid #e9ecef;
  font-weight: 600;
  color: #495057;
  background-color: #f8f9fa;
  font-size: 14px;
  white-space: nowrap;

  &:first-child {
    padding-left: 24px;
  }

  &:last-child {
    padding-right: 24px;
  }
`;

const SortIcon = styled.span`
  margin-left: 8px;
  color: #6c757d;
  font-size: 12px;
`;

const StarIcon = styled.span`
  color: #6c757d;
  font-size: 16px;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f8f9fa;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
  }
`;

const TableCell = styled.td`
  padding: 20px;
  vertical-align: top;
  color: #333;

  &:first-child {
    padding-left: 24px;
    width: 50px;
  }

  &:last-child {
    padding-right: 24px;
    width: 150px;
  }

  &:nth-child(2) {
    width: 200px;
    min-width: 180px;
  }

  &:nth-child(3) {
    width: 50px;
    text-align: center;
  }
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  margin: 0;

  @media screen and (max-width: 480px) {
    width: 16px;
    height: 16px;
  }
`;

const RoleName = styled.div`
  font-weight: 500;
  color: #333;
  font-size: 14px;
  line-height: 1.4;
`;

const Description = styled.div`
  color: #6c757d;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  max-width: 500px;
`;

const CategoryText = styled.div`
  color: #6c757d;
  font-size: 14px;
  font-weight: 400;
`;

const ActionMenu = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  color: #6c757d;

  &:hover {
    background-color: #e9ecef;
  }
`;

export default RolesPage;
