import React from "react";
import styled from "styled-components";
import { CgProfile } from "react-icons/cg";
import { LuUserRoundPen } from "react-icons/lu";
import { LiaKeySolid, LiaLaptopSolid } from "react-icons/lia";
import { SlBriefcase } from "react-icons/sl";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { VscCompass } from "react-icons/vsc";

const AdminPanel = () => {
  return (
    <AdminContainer>
      <MainContent>
        <LeftSection>
          <ProfileCard>
            <ProfileAvatar>
              <CgProfile size={60} color="white" />
            </ProfileAvatar>
            <ProfileInfo>
              <AdminTitle>Super Admin</AdminTitle>
              <AdminDescription>
                Super Admin has control & monitor all users
              </AdminDescription>
              <ContactInfo>
                <MdOutlineLocalPostOffice size={16} color="#666" />
                <ContactText>suadmin@rabinnson.com</ContactText>
              </ContactInfo>
              <LocationInfo>
                <VscCompass size={16} color="#666" />
                <LocationText>Hyderabad</LocationText>
              </LocationInfo>
            </ProfileInfo>
          </ProfileCard>
        </LeftSection>

        <RightSection>
          <DashboardGrid>
            <DashboardCard>
              <CardTitle>Security info</CardTitle>
              <CardIcon>
                <LuUserRoundPen size={48} color="black" />
              </CardIcon>
              <CardContent>
                <CardDescription>
                  Keep your verification methods and security info up to date.
                </CardDescription>
                <CardButton>UPDATE INFO →</CardButton>
              </CardContent>
            </DashboardCard>

            <DashboardCard>
              <CardTitle>Change password</CardTitle>
              <CardIcon>
                <LiaKeySolid size={48} color="black" />
              </CardIcon>
              <CardContent>
                <CardDescription>
                  Make your password stronger, or change it if someone else
                  knows it.
                </CardDescription>
                <CardButton>CHANGE PASSWORD →</CardButton>
              </CardContent>
            </DashboardCard>

            {/* Devices Card */}
            <DashboardCard>
              <CardTitle>Devices</CardTitle>
              <CardIcon>
                <LiaLaptopSolid size={48} color="black" />
              </CardIcon>
              <CardContent>
                <CardDescription>
                  Disable a lost device and review your connected devices.
                </CardDescription>
                <CardButton>MANAGE DEVICES →</CardButton>
              </CardContent>
            </DashboardCard>

            {/* Organizations Card */}
            <DashboardCard>
              <CardTitle>Organizations</CardTitle>
              <CardIcon>
                <SlBriefcase size={48} color="black" />
              </CardIcon>
              <CardContent>
                <CardDescription>
                  See all the organizations that you're a part of.
                </CardDescription>
                <CardButton>MANAGE ORGANIZATIONS →</CardButton>
              </CardContent>
            </DashboardCard>
          </DashboardGrid>
        </RightSection>
      </MainContent>
    </AdminContainer>
  );
};

const AdminContainer = styled.div`
  position: absolute;
  top: 60px;
  left: 400px;
  right: 0;
  bottom: 0;
  background: #f5f5f5;
  overflow: hidden;
  padding: 1.5rem;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    left: 80px;
    padding: 1.25rem;
  }

  @media (max-width: 768px) {
    left: 0;
    padding: 1rem;
    overflow-y: auto;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;
const MainContent = styled.div`
  display: flex;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const LeftSection = styled.div`
  flex: 0 0 350px;

  @media (max-width: 1024px) {
    flex: none;
    display: flex;
    justify-content: center;
  }
`;

const RightSection = styled.div`
  flex: 1;
`;

const ProfileCard = styled.div`
  background: white;

  padding: 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
  height: fit-content;

  @media (max-width: 768px) {
    padding: 1.5rem;
    max-width: 400px;
  }
`;

const ProfileAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4a90e2 0%, #9c27b0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  border: 4px solid #f0f0f0;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const ProfileInfo = styled.div`
  text-align: center;
`;

const AdminTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const AdminDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 2rem 0;
  line-height: 1.4;

  @media (max-width: 768px) {
    margin: 0 0 1.5rem 0;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  justify-content: flex-start;
`;

const LocationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: flex-start;
`;

const ContactText = styled.span`
  color: #333;
  font-size: 0.9rem;
`;

const LocationText = styled.span`
  color: #333;
  font-size: 0.9rem;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const DashboardCard = styled.div`
  background: white;

  padding: 3rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const CardIcon = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardContent = styled.div`
  text-align: center;
`;

const CardTitle = styled.h3`
  font-size: 1.55rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.75rem 0;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
  margin: 0 0 1.5rem 0;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin: 0 0 1rem 0;
  }
`;

const CardButton = styled.button`
  background: none;
  border: none;
  color: #4a90e2;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s ease;
  letter-spacing: 0.3px;

  &:hover {
    color: #357abd;
  }
`;

export default AdminPanel;
