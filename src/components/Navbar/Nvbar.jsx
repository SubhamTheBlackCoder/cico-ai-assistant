import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { VscBell, VscHome } from "react-icons/vsc";
import { SlSettings } from "react-icons/sl";
import { AiOutlineQuestion } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { HiOutlineDeviceMobile, HiOutlineUserGroup } from "react-icons/hi";
import {
  MdExpandMore,
  MdOutlineSoupKitchen,
  MdOutlineMeetingRoom,
  MdClose,
} from "react-icons/md";
import { LuUserRound } from "react-icons/lu";
import { GrUserSettings, GrDocumentVerified } from "react-icons/gr";
import { IoBagOutline } from "react-icons/io5";
import { BsHouseCheck } from "react-icons/bs";
import { GoCreditCard } from "react-icons/go";
import { LiaWrenchSolid } from "react-icons/lia";
import { IoIosMenu } from "react-icons/io";
import { HiOutlineInboxArrowDown } from "react-icons/hi2";


const FeedbackForm = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [includeScreenshot, setIncludeScreenshot] = useState(false);
  const [allowContact, setAllowContact] = useState("");

  const handleStarClick = (starIndex) => {
    setRating(starIndex);
  };

  const handleStarHover = (starIndex) => {
    setHoveredRating(starIndex);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmit = () => {
    const formData = {
      rating,
      feedback,
      includeScreenshot,
      allowContact
    };
    console.log("Feedback submitted:", formData);
 
    onClose();
  };

  const handleCancel = () => {
 
    setRating(0);
    setFeedback("");
    setIncludeScreenshot(false);
    setAllowContact("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <FeedbackOverlay>
      <FeedbackFormContainer>
        <FeedbackHeader>
          <FeedbackTitle>Submit feedback to Rabinnson</FeedbackTitle>
          <FeedbackCloseButton onClick={onClose}>×</FeedbackCloseButton>
        </FeedbackHeader>

        <FeedbackSubtitle>Rate your experience with the application usage</FeedbackSubtitle>

        <StarRating>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              filled={star <= (hoveredRating || rating)}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleStarHover(star)}
              onMouseLeave={handleStarLeave}
            >
              ★
            </Star>
          ))}
        </StarRating>

        <FeedbackSection>
          <FeedbackLabel>Explain in more detail</FeedbackLabel>
          <FeedbackTextArea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Do not include any private or sensitive information."
          />
        </FeedbackSection>

        <ScreenshotSection>
          <CheckboxContainer>
            <FeedbackCheckbox
              type="checkbox"
              checked={includeScreenshot}
              onChange={(e) => setIncludeScreenshot(e.target.checked)}
            />
            <CheckboxLabel>Include a screenshot</CheckboxLabel>
          </CheckboxContainer>
          <UploadButton>
            Upload
            <UploadIcon><HiOutlineInboxArrowDown /></UploadIcon>
          </UploadButton>
        </ScreenshotSection>

        <ContactSection>
          <FeedbackLabel>
            May we contact you about your feedback? <Required>*</Required>
          </FeedbackLabel>
          <RadioGroup>
            <RadioContainer>
              <FeedbackRadioButton
                type="radio"
                name="contact"
                value="yes"
                checked={allowContact === "yes"}
                onChange={(e) => setAllowContact(e.target.value)}
              />
              <RadioLabel>Yes</RadioLabel>
            </RadioContainer>
            <RadioContainer>
              <FeedbackRadioButton
                type="radio"
                name="contact"
                value="no"
                checked={allowContact === "no"}
                onChange={(e) => setAllowContact(e.target.value)}
              />
              <RadioLabel>No</RadioLabel>
            </RadioContainer>
          </RadioGroup>
        </ContactSection>

        <DisclaimerText>
          Your feedback will be used to improve Rabinnson AI products and services more efficient with user
          friendly. Please read our Privacy Policy to meet the General Data Protection Regulation - GDPR (EU) -
          Protects personal data privacy & India's Personal Data Protection Bill (PDPB) - Regulates data collection
          and storage.
        </DisclaimerText>

        <ButtonGroup>
          <SubmitButton onClick={handleSubmit} disabled={!rating || !allowContact}>
            Submit
          </SubmitButton>
          <CancelButton onClick={handleCancel}>Cancel</CancelButton>
        </ButtonGroup>
      </FeedbackFormContainer>
    </FeedbackOverlay>
  );
};

const Nvbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isMobileSidebarOpen
      ) {
        setIsMobileSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileSidebarOpen]);

  const toggleMenu = (menuName) => {
    if (!isSidebarCollapsed || isMobile) {
      setExpandedMenus((prev) => ({
        ...prev,
        [menuName]: !prev[menuName],
      }));
    }
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
      if (!isSidebarCollapsed) {
        setExpandedMenus({});
      }
    }
  };

  const closeMobileSidebar = () => {
    if (isMobile) {
      setIsMobileSidebarOpen(false);
    }
  };

  const handleMobileIconClick = () => {
    setIsFeedbackOpen(true);
  };

  return (
    <DashboardContainer>
      {/* Navbar */}
      <Navbar>
        <LeftSection>
          {isMobile && (
            <MobileMenuToggle onClick={toggleSidebar}>
              <IoIosMenu size={24} />
            </MobileMenuToggle>
          )}

          <LogoContainer>
            <LogoImage
              src="/x.png"
              alt="Company Logo"
              onClick={() => (window.location.href = "/")}
            />

            {!isMobile && <LogoContent src="/y.png" alt="Logo Content" />}
          </LogoContainer>
        </LeftSection>

        {!isMobile && (
          <CenterSection>
            <SearchContainer>
              <SearchIconWrapper>
                <FiSearch />
              </SearchIconWrapper>
              <SearchInput
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchContainer>
          </CenterSection>
        )}

        <RightSection>
          <IconGroup>
            {!isMobile && (
              <NavIcon title="Mobile" onClick={handleMobileIconClick}>
                <HiOutlineDeviceMobile size={20} />
              </NavIcon>
            )}

            <NotificationWrapper ref={notificationRef}>
              <NavIcon
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                title="Notifications"
                $active={isNotificationOpen}
              >
                <VscBell size={20} />
              </NavIcon>
              {isNotificationOpen && (
                <NotificationDropdown>
                  <NotificationHeader>
                    <NotificationTitle>Notifications</NotificationTitle>
                    <CloseButton onClick={() => setIsNotificationOpen(false)}>
                      <MdClose size={20} />
                    </CloseButton>
                  </NotificationHeader>
                  <NotificationContent>
                    <NotificationIcon>
                      <NotificationIllustration>
                        <MailboxSVG>
                          <img src="starcy.png" alt="notification" />
                        </MailboxSVG>
                      </NotificationIllustration>
                    </NotificationIcon>
                    <NotificationMessage>
                      It's too quiet here!
                    </NotificationMessage>
                    <NotificationSubtext>
                      We'll let you know when something turns up
                    </NotificationSubtext>
                  </NotificationContent>
                </NotificationDropdown>
              )}
            </NotificationWrapper>

            {!isMobile && (
              <NavIcon title="Settings">
                <SlSettings size={18} />
              </NavIcon>
            )}

            {!isMobile && (
              <NavIcon title="Help">
                <AiOutlineQuestion size={20} />
              </NavIcon>
            )}
          </IconGroup>

          {/* Profile Section */}
          <ProfileWrapper ref={profileRef}>
            <UserProfile onClick={() => setIsProfileOpen(!isProfileOpen)}>
              <ProfileIconWrapper>
                <CgProfile size={24} />
              </ProfileIconWrapper>
            </UserProfile>
            {isProfileOpen && (
              <ProfileDropdown>
                <DropdownTopSection>
                  <ProfileAvatar>
                    <CgProfile size={32} />
                  </ProfileAvatar>
                  <ProfileDetails>
                    <ProfileName>Super Admin</ProfileName>
                    <ProfileEmail>suadmin@rabinson.com</ProfileEmail>
                    <ViewAccountLink as={Link} to="/account">
                      View account
                    </ViewAccountLink>
                  </ProfileDetails>
                </DropdownTopSection>
                <RecentLogin>Recently login with Super Admin</RecentLogin>
                <SignOutButton onClick={() => {}}>Sign out</SignOutButton>
              </ProfileDropdown>
            )}
          </ProfileWrapper>
        </RightSection>
      </Navbar>

      {/* Feedback Form */}
      <FeedbackForm 
        isOpen={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)} 
      />

      {/* Sidebar */}
      <Sidebar
        ref={sidebarRef}
        $isCollapsed={isSidebarCollapsed}
        $isMobile={isMobile}
        $isMobileOpen={isMobileSidebarOpen}
      >
        {!isMobile && (
          <SidebarHeader $isCollapsed={isSidebarCollapsed}>
            <MenuToggle onClick={toggleSidebar}>
              <IoIosMenu />
            </MenuToggle>
          </SidebarHeader>
        )}

        <SidebarMenu>
          {/* Home */}
          <MenuItem>
            <MenuLink
              onClick={() => {
                toggleMenu("overview");
                closeMobileSidebar();
              }}
              $hasSubmenu
              $isExpanded={expandedMenus.overview}
              $isCollapsed={isSidebarCollapsed && !isMobile}
              $isMobile={isMobile}
              title={isSidebarCollapsed && !isMobile ? "Home" : ""}
            >
              <MenuIcon
                $isCollapsed={isSidebarCollapsed && !isMobile}
                $isMobile={isMobile}
              >
                <VscHome size={18} />
              </MenuIcon>
              {(!isSidebarCollapsed || isMobile) && (
                <>
                  <MenuLabel>Home</MenuLabel>
                  <ArrowIcon $isExpanded={expandedMenus.overview}>
                    <MdExpandMore size={20} />
                  </ArrowIcon>
                </>
              )}
            </MenuLink>
            {expandedMenus.overview && (!isSidebarCollapsed || isMobile) && (
              <SubMenuContainer>
                <SubMenuItem>
                  <SubMenuLink
                    as={Link}
                    to="/upload"
                    onClick={closeMobileSidebar}
                  >
                    <SubMenuLabel>Overview & Dashboard</SubMenuLabel>
                  </SubMenuLink>
                </SubMenuItem>
                <SubMenuItem>
                  <SubMenuLink
                    as={Link}
                    to="/agents"
                    onClick={closeMobileSidebar}
                  >
                    <SubMenuLabel>Agents</SubMenuLabel>
                  </SubMenuLink>
                </SubMenuItem>
              </SubMenuContainer>
            )}
          </MenuItem>

          {/* Users */}
          <MenuItem>
            <MenuLink
              onClick={() => toggleMenu("users")}
              $hasSubmenu
              $isExpanded={expandedMenus.users}
              $isCollapsed={isSidebarCollapsed && !isMobile}
              $isMobile={isMobile}
              title={isSidebarCollapsed && !isMobile ? "Users" : ""}
            >
              <MenuIcon
                $isCollapsed={isSidebarCollapsed && !isMobile}
                $isMobile={isMobile}
              >
                <LuUserRound size={18} />
              </MenuIcon>
              {(!isSidebarCollapsed || isMobile) && (
                <>
                  <MenuLabel>Users</MenuLabel>
                  <ArrowIcon $isExpanded={expandedMenus.users}>
                    <MdExpandMore size={20} />
                  </ArrowIcon>
                </>
              )}
            </MenuLink>
            {expandedMenus.users && (!isSidebarCollapsed || isMobile) && (
              <SubMenuContainer>
                <SubMenuItem>
                  <SubMenuLink
                    as={Link}
                    to="/active"
                    onClick={closeMobileSidebar}
                  >
                    <SubMenuLabel>Active User</SubMenuLabel>
                  </SubMenuLink>
                </SubMenuItem>
              </SubMenuContainer>
            )}
          </MenuItem>

          {/* Roles */}
          <MenuItem>
            <MenuLink
              onClick={() => toggleMenu("roles")}
              $hasSubmenu
              $isExpanded={expandedMenus.roles}
              $isCollapsed={isSidebarCollapsed && !isMobile}
              $isMobile={isMobile}
              title={isSidebarCollapsed && !isMobile ? "Roles" : ""}
            >
              <MenuIcon
                $isCollapsed={isSidebarCollapsed && !isMobile}
                $isMobile={isMobile}
              >
                <GrUserSettings size={18} />
              </MenuIcon>
              {(!isSidebarCollapsed || isMobile) && (
                <>
                  <MenuLabel>Roles</MenuLabel>
                  <ArrowIcon $isExpanded={expandedMenus.roles}>
                    <MdExpandMore size={20} />
                  </ArrowIcon>
                </>
              )}
            </MenuLink>
            {expandedMenus.roles && (!isSidebarCollapsed || isMobile) && (
              <SubMenuContainer>
                <SubMenuItem>
                  <SubMenuLink
                    as={Link}
                    to="/roles/assignments"
                    onClick={closeMobileSidebar}
                  >
                    <SubMenuLabel>Role assignments</SubMenuLabel>
                  </SubMenuLink>
                </SubMenuItem>
                <SubMenuItem>
                  <SubMenuLink
                    as={Link}
                    to="/roles/task-assignments"
                    onClick={closeMobileSidebar}
                  >
                    <SubMenuLabel>Task assignments</SubMenuLabel>
                  </SubMenuLink>
                </SubMenuItem>
                <SubMenuItem>
                  <SubMenuLink
                    as={Link}
                    to="/roles/task-checklist"
                    onClick={closeMobileSidebar}
                  >
                    <SubMenuLabel>Manage task checklist</SubMenuLabel>
                  </SubMenuLink>
                </SubMenuItem>
              </SubMenuContainer>
            )}
          </MenuItem>

          {/* Bookings */}
          <MenuItem>
            <MenuLink
              onClick={() => toggleMenu("bookings")}
              $hasSubmenu
              $isExpanded={expandedMenus.bookings}
              $isCollapsed={isSidebarCollapsed && !isMobile}
              $isMobile={isMobile}
              title={isSidebarCollapsed && !isMobile ? "Bookings" : ""}
            >
              <MenuIcon
                $isCollapsed={isSidebarCollapsed && !isMobile}
                $isMobile={isMobile}
              >
                <IoBagOutline size={18} />
              </MenuIcon>
              {(!isSidebarCollapsed || isMobile) && (
                <>
                  <MenuLabel>Bookings</MenuLabel>
                  <ArrowIcon $isExpanded={expandedMenus.bookings}>
                    <MdExpandMore size={20} />
                  </ArrowIcon>
                </>
              )}
            </MenuLink>
            {expandedMenus.bookings && (!isSidebarCollapsed || isMobile) && (
              <SubMenuContainer>
                <SubMenuItem>
                  <SubMenuLink
                    as={Link}
                    to="/bookings/recent"
                    onClick={closeMobileSidebar}
                  >
                    <SubMenuLabel>Recent Bookings</SubMenuLabel>
                  </SubMenuLink>
                </SubMenuItem>
                <SubMenuItem>
                  <SubMenuLink
                    as={Link}
                    to="/bookings/cancelled"
                    onClick={closeMobileSidebar}
                  >
                    <SubMenuLabel>Cancelled Bookings</SubMenuLabel>
                  </SubMenuLink>
                </SubMenuItem>
                <SubMenuItem>
                  <SubMenuLink
                    as={Link}
                    to="/bookings/manage"
                    onClick={closeMobileSidebar}
                  >
                    <SubMenuLabel>Add/Modify Bookings</SubMenuLabel>
                  </SubMenuLink>
                </SubMenuItem>
                <SubMenuItem>
                  <SubMenuLink
                    as={Link}
                    to="/bookings/agents"
                    onClick={closeMobileSidebar}
                  >
                    <SubMenuLabel>Manage Agents</SubMenuLabel>
                  </SubMenuLink>
                </SubMenuItem>
                <SubMenuItem>
                  <SubMenuLink
                    as={Link}
                    to="/bookings/rooms"
                    onClick={closeMobileSidebar}
                  >
                    <SubMenuLabel>Manage Rooms</SubMenuLabel>
                  </SubMenuLink>
                </SubMenuItem>
              </SubMenuContainer>
            )}
          </MenuItem>

          {/* Document Verification */}
          <MenuItem>
            <MenuLink
              onClick={() => toggleMenu("documents")}
              $hasSubmenu
              $isExpanded={expandedMenus.documents}
              $isCollapsed={isSidebarCollapsed && !isMobile}
              $isMobile={isMobile}
              title={
                isSidebarCollapsed && !isMobile ? "Document Verification" : ""
              }
            >
              <MenuIcon
                $isCollapsed={isSidebarCollapsed && !isMobile}
                $isMobile={isMobile}
              >
                <GrDocumentVerified size={18} />
              </MenuIcon>
              {(!isSidebarCollapsed || isMobile) && (
                <>
                  <MenuLabel>Document Verification</MenuLabel>
                  <ArrowIcon $isExpanded={expandedMenus.documents}>
                    <MdExpandMore size={20} />
                  </ArrowIcon>
                </>
              )}
            </MenuLink>
            {expandedMenus.documents && (!isSidebarCollapsed || isMobile) && (
              <SubMenuContainer>
                <SubMenuItem>
                  <SubMenuLink
                    as={Link}
                    to="/documents/recent"
                    onClick={closeMobileSidebar}
                  >
                    <SubMenuLabel>Recent Verified Documents</SubMenuLabel>
                  </SubMenuLink>
                </SubMenuItem>
                <SubMenuItem>
                  <SubMenuLink
                    as={Link}
                    to="/documents/verify"
                    onClick={closeMobileSidebar}
                  >
                    <SubMenuLabel>Verify New documents</SubMenuLabel>
                  </SubMenuLink>
                </SubMenuItem>
                <SubMenuItem>
                  <SubMenuLink
                    as={Link}
                    to="/documents/repository"
                    onClick={closeMobileSidebar}
                  >
                    <SubMenuLabel>Documents Repository</SubMenuLabel>
                  </SubMenuLink>
                </SubMenuItem>
              </SubMenuContainer>
            )}
          </MenuItem>

          {/* Transport Facility */}
          <MenuItem>
            <MenuLink
              onClick={() => toggleMenu("transport")}
              $hasSubmenu
              $isExpanded={expandedMenus.transport}
              $isCollapsed={isSidebarCollapsed && !isMobile}
              $isMobile={isMobile}
              title={
                isSidebarCollapsed && !isMobile ? "Transport Facility" : ""
              }
            >
              <MenuIcon
                $isCollapsed={isSidebarCollapsed && !isMobile}
                $isMobile={isMobile}
              >
                <HiOutlineUserGroup size={18} />
              </MenuIcon>
              {(!isSidebarCollapsed || isMobile) && (
                <>
                  <MenuLabel>Transport Facility</MenuLabel>
                  <ArrowIcon $isExpanded={expandedMenus.transport}>
                    <MdExpandMore size={20} />
                  </ArrowIcon>
                </>
              )}
            </MenuLink>
            {expandedMenus.transport && (!isSidebarCollapsed || isMobile) && (
              <SubMenuContainer>
                <SubMenuItem>
                  <SubMenuLink
                    as={Link}
                    to="/transport/vehicle-owners"
                    onClick={closeMobileSidebar}
                  >
                    <SubMenuLabel>Vehicle owner information</SubMenuLabel>
                  </SubMenuLink>
                </SubMenuItem>
                <SubMenuItem>
                  <SubMenuLink
                    as={Link}
                    to="/transport/drivers"
                    onClick={closeMobileSidebar}
                  >
                    <SubMenuLabel>Driver information</SubMenuLabel>
                  </SubMenuLink>
                </SubMenuItem>
                <SubMenuItem>
                  <SubMenuLink
                    as={Link}
                    to="/transport/manage-vehicles"
                    onClick={closeMobileSidebar}
                  >
                    <SubMenuLabel>Manage vehicle</SubMenuLabel>
                  </SubMenuLink>
                </SubMenuItem>
              </SubMenuContainer>
            )}
          </MenuItem>

          {/* Kitchen Service */}
          <MenuItem>
            <MenuLink
              onClick={() => toggleMenu("kitchen")}
              $hasSubmenu
              $isExpanded={expandedMenus.kitchen}
              $isCollapsed={isSidebarCollapsed && !isMobile}
              $isMobile={isMobile}
              title={isSidebarCollapsed && !isMobile ? "Kitchen Service" : ""}
            >
              <MenuIcon
                $isCollapsed={isSidebarCollapsed && !isMobile}
                $isMobile={isMobile}
              >
                <MdOutlineSoupKitchen size={18} />
              </MenuIcon>
              {(!isSidebarCollapsed || isMobile) && (
                <>
                  <MenuLabel>Kitchen Service</MenuLabel>
                  <ArrowIcon $isExpanded={expandedMenus.kitchen}>
                    <MdExpandMore size={20} />
                  </ArrowIcon>
                </>
              )}
            </MenuLink>
            {expandedMenus.kitchen && (!isSidebarCollapsed || isMobile) && (
              <SubMenuContainer>
                <SubMenuItem>
                  <SubMenuLink
                    as={Link}
                    to="/kitchen/menu"
                    onClick={closeMobileSidebar}
                  >
                    <SubMenuLabel>Create/manage food menu</SubMenuLabel>
                  </SubMenuLink>
                </SubMenuItem>
                <SubMenuItem>
                  <SubMenuLink
                    as={Link}
                    to="/kitchen/orders"
                    onClick={closeMobileSidebar}
                  >
                    <SubMenuLabel>Add/modify order</SubMenuLabel>
                  </SubMenuLink>
                </SubMenuItem>
                <SubMenuItem>
                  <SubMenuLink
                    as={Link}
                    to="/kitchen/order-management"
                    onClick={closeMobileSidebar}
                  >
                    <SubMenuLabel>Order management</SubMenuLabel>
                  </SubMenuLink>
                </SubMenuItem>
              </SubMenuContainer>
            )}
          </MenuItem>

          {/* Room Service */}
          <MenuItem>
            <MenuLink
              onClick={() => toggleMenu("roomservice")}
              $hasSubmenu
              $isExpanded={expandedMenus.roomservice}
              $isCollapsed={isSidebarCollapsed && !isMobile}
              $isMobile={isMobile}
              title={isSidebarCollapsed && !isMobile ? "Room Service" : ""}
            >
              <MenuIcon
                $isCollapsed={isSidebarCollapsed && !isMobile}
                $isMobile={isMobile}
              >
                <MdOutlineMeetingRoom size={18} />
              </MenuIcon>
              {(!isSidebarCollapsed || isMobile) && (
                <>
                  <MenuLabel>Room Service</MenuLabel>
                  <ArrowIcon $isExpanded={expandedMenus.roomservice}>
                    <MdExpandMore size={20} />
                  </ArrowIcon>
                </>
              )}
            </MenuLink>
            {expandedMenus.roomservice && (!isSidebarCollapsed || isMobile) && (
              <SubMenuContainer>
                <SubMenuItem>
                  <SubMenuLink
                    as={Link}
                    to="/room-service/requests"
                    onClick={closeMobileSidebar}
                  >
                    <SubMenuLabel>Request received</SubMenuLabel>
                  </SubMenuLink>
                </SubMenuItem>
                <SubMenuItem>
                  <SubMenuLink
                    as={Link}
                    to="/room-service/manage-requests"
                    onClick={closeMobileSidebar}
                  >
                    <SubMenuLabel>Add/modify request</SubMenuLabel>
                  </SubMenuLink>
                </SubMenuItem>
                <SubMenuItem>
                  <SubMenuLink
                    as={Link}
                    to="/room-service/duty-assignment"
                    onClick={closeMobileSidebar}
                  >
                    <SubMenuLabel>Duty assignment</SubMenuLabel>
                  </SubMenuLink>
                </SubMenuItem>
              </SubMenuContainer>
            )}
          </MenuItem>

          {/* House keeping/Maintenance */}
          <MenuItem>
            <StyledLink
              as={Link}
              to="/housekeeping"
              onClick={closeMobileSidebar}
            >
              <MenuLink
                $isCollapsed={isSidebarCollapsed && !isMobile}
                $isMobile={isMobile}
                title={
                  isSidebarCollapsed && !isMobile
                    ? "House keeping/Maintenance"
                    : ""
                }
              >
                <MenuIcon
                  $isCollapsed={isSidebarCollapsed && !isMobile}
                  $isMobile={isMobile}
                >
                  <BsHouseCheck size={18} />
                </MenuIcon>
                {(!isSidebarCollapsed || isMobile) && (
                  <MenuLabel>House keeping/Maintenance</MenuLabel>
                )}
              </MenuLink>
            </StyledLink>
          </MenuItem>

          {/* Billing */}
          <MenuItem>
            <MenuLink
              onClick={() => toggleMenu("billing")}
              $hasSubmenu
              $isExpanded={expandedMenus.billing}
              $isCollapsed={isSidebarCollapsed && !isMobile}
              $isMobile={isMobile}
              title={isSidebarCollapsed && !isMobile ? "Billing" : ""}
            >
              <MenuIcon
                $isCollapsed={isSidebarCollapsed && !isMobile}
                $isMobile={isMobile}
              >
                <GoCreditCard size={18} />
              </MenuIcon>
              {(!isSidebarCollapsed || isMobile) && (
                <>
                  <MenuLabel>Billing</MenuLabel>
                  <ArrowIcon $isExpanded={expandedMenus.billing}>
                    <MdExpandMore size={20} />
                  </ArrowIcon>
                </>
              )}
            </MenuLink>
          </MenuItem>

          {/* Settings */}
          <MenuItem>
            <MenuLink
              onClick={() => toggleMenu("settings")}
              $hasSubmenu
              $isExpanded={expandedMenus.settings}
              $isCollapsed={isSidebarCollapsed && !isMobile}
              $isMobile={isMobile}
              title={isSidebarCollapsed && !isMobile ? "Settings" : ""}
            >
              <MenuIcon
                $isCollapsed={isSidebarCollapsed && !isMobile}
                $isMobile={isMobile}
              >
                <SlSettings size={16} />
              </MenuIcon>
              {(!isSidebarCollapsed || isMobile) && (
                <>
                  <MenuLabel>Settings</MenuLabel>
                  <ArrowIcon $isExpanded={expandedMenus.settings}>
                    <MdExpandMore size={20} />
                  </ArrowIcon>
                </>
              )}
            </MenuLink>
          </MenuItem>

          {/* Technical Support */}
          <MenuItem>
            <StyledLink
              as={Link}
              to="/technical-support"
              onClick={closeMobileSidebar}
            >
              <MenuLink
                $isCollapsed={isSidebarCollapsed && !isMobile}
                $isMobile={isMobile}
                title={
                  isSidebarCollapsed && !isMobile ? "Technical Support" : ""
                }
              >
                <MenuIcon
                  $isCollapsed={isSidebarCollapsed && !isMobile}
                  $isMobile={isMobile}
                >
                  <LiaWrenchSolid size={18} />
                </MenuIcon>
                {(!isSidebarCollapsed || isMobile) && (
                  <>
                    <MenuLabel>Technical Support Reports</MenuLabel>
                  </>
                )}
              </MenuLink>
            </StyledLink>
          </MenuItem>
        </SidebarMenu>
      </Sidebar>

      {isMobile && isMobileSidebarOpen && (
        <MobileOverlay onClick={() => setIsMobileSidebarOpen(false)} />
      )}
    </DashboardContainer>
  );
};

// Styled Components
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    sans-serif;
`;

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  padding: 0.75rem 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 60px;

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }
`;

// Feedback Form Styled Components
const FeedbackOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 20px;
`;

const FeedbackFormContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  position: relative;

  @media (max-width: 768px) {
    padding: 20px;
    margin: 10px;
  }
`;

const FeedbackHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const FeedbackTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #333;
  line-height: 1.3;
  padding-right: 20px;
`;

const FeedbackCloseButton = styled.button`
  background: none;
  border: 1px solid #ccc;
  font-size: 18px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  color: #666;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const FeedbackSubtitle = styled.p`
  color: #666;
  font-size: 14px;
  margin: 0 0 20px 0;
  text-align:start;
  line-height: 1.4;
`;

const StarRating = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 24px;
`;

const Star = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 4px;
  color: ${props => props.filled ? '#ffc107' : '#e0e0e0'};
  transition: color 0.2s ease;

  &:hover {
    color: #ffc107;
  }
`;

const FeedbackSection = styled.div`
  margin-bottom: 20px;
`;

const FeedbackLabel = styled.label`
  display: block;
  font-size: 14px;
  color: #333;
  text-align:start;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Required = styled.span`
  color: #e53e3e;
`;

const FeedbackTextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const ScreenshotSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e5e7eb;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FeedbackCheckbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
  color: #333;
  cursor: pointer;
`;

const UploadButton = styled.button`
  display: flex;
  align-items: start;
  gap: 8px;
  background: none;

  padding: 8px 16px;

  margin-right: 165px;
  font-size: 14px;
  cursor: pointer;
  color: #333;


`;

const UploadIcon = styled.span`
  font-size: 16px;
`;

const ContactSection = styled.div`
  margin-bottom: 20px;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 8px;
`;

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FeedbackRadioButton = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const RadioLabel = styled.label`
  font-size: 14px;
  color: #333;
  cursor: pointer;
`;

const DisclaimerText = styled.p`
  font-size: 12px;
  color: #666;
  line-height: 1.4;
  margin-bottom: 24px;
  text-align: left;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-start;
`;

const SubmitButton = styled.button`
  background-color: ${props => props.disabled ? '#e5e7eb' : '#3b82f6'};
  color: ${props => props.disabled ? '#9ca3af' : 'white'};
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #2563eb;
  }
`;

const CancelButton = styled.button`
  background: none;
  color: #666;
  border: 1px solid #d1d5db;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f9fafb;
  }
`;


const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const MobileMenuToggle = styled.button`
  background: none;
  border: none;
  color: white;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  min-width: fit-content;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const LogoImage = styled.img`
  height: 40px;
  width: auto;
  transition: transform 0.2s ease;
  flex-shrink: 0;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 35px;
  }
`;

const LogoContent = styled.img`
  height: 35px;
  width: auto;
  display: block;
  transition: opacity 0.3s ease;
  flex-shrink: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const CenterSection = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  max-width: 600px;
  margin: 0 2rem;
  min-width: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  left: -119px;
  min-width: 200px;
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  display: flex;
  align-items: center;
  pointer-events: none;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem 0.5rem 2.5rem;
  border: none;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.95);
  color: #333;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &::placeholder {
    color: #666;
  }

  &:focus {
    outline: none;
    background: white;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    gap: 0.25rem;
  }
`;

const NavIcon = styled.button`
  background: none;
  border: none;
  color: white;
  padding: 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 40px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  ${(props) =>
    props.$active &&
    `
    background: rgba(255, 255, 255, 0.2);
  `}

  @media (max-width: 768px) {
    padding: 0.5rem;
    min-width: 36px;
    min-height: 36px;
  }
`;

const NotificationWrapper = styled.div`
  position: relative;
`;

const NotificationDropdown = styled.div`
  position: absolute;
  top: calc(100% + 1.5rem);
  right: -140px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  min-width: 400px;
  z-index: 1001;
  overflow: hidden;
  animation: slideDown 0.25s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    min-width: 340px;
    right: -50px;
  }
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #eee;

  @media (max-width: 768px) {
    padding: 0.875rem 1rem;
  }
`;

const NotificationTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
    color: #333;
  }
`;

const NotificationContent = styled.div`
  padding: 2rem 1.25rem;
  text-align: center;
  background: white;

  @media (max-width: 768px) {
    padding: 1.75rem 1rem;
  }
`;

const NotificationIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const NotificationIllustration = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MailboxSVG = styled.div`
  svg {
    width: 120px;
    height: 120px;

    @media (max-width: 768px) {
      width: 100px;
      height: 100px;
    }
  }
`;

const NotificationMessage = styled.h4`
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const NotificationSubtext = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const ProfileWrapper = styled.div`
  position: relative;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 0.4rem;
  }
`;

const ProfileIconWrapper = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.6);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
`;

const ProfileDropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  min-width: 300px;
  z-index: 1001;
  overflow: hidden;
  animation: slideDown 0.2s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    min-width: 280px;
    right: -10px;
  }
`;

const DropdownTopSection = styled.div`
  padding: 1.25rem;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid #eee;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ProfileAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
  }
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  text-align: start;
`;

const ProfileName = styled.div`
  font-weight: 600;
  color: #333;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ProfileEmail = styled.div`
  font-size: 0.9rem;
  color: #666;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const ViewAccountLink = styled.a`
  font-size: 0.9rem;
  color: #4a90e2;
  cursor: pointer;
  text-align: start;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const RecentLogin = styled.div`
  padding: 1rem 1.25rem;
  font-size: 0.9rem;
  color: #666;
  text-align: start;
  background: #f8f9fa;

  @media (max-width: 768px) {
    padding: 0.875rem 1rem;
    font-size: 0.85rem;
  }
`;

const SignOutButton = styled.button`
  width: 100%;
  padding: 1rem 1.25rem;
  border: none;
  background: white;
  text-align: start;
  font-size: 0.95rem;
  cursor: pointer;
  background: #f8f9fa;
  color: #4a90e2;
  transition: background 0.2s ease;

  @media (max-width: 768px) {
    padding: 0.875rem 1rem;
    font-size: 0.9rem;
  }
`;

const Sidebar = styled.aside`
  position: fixed;
  top: 60px;
  left: 0;
  width: ${(props) => {
    if (props.$isMobile) {
      return props.$isMobileOpen ? "280px" : "0";
    }
    return props.$isCollapsed ? "80px" : "400px";
  }};
  height: calc(100vh - 60px);
  background: #e8e8e8;
  transition: all 0.3s ease;
  z-index: 999;
  text-align: start;
  overflow-y: auto;
  transform: ${(props) =>
    props.$isMobile && !props.$isMobileOpen
      ? "translateX(-100%)"
      : "translateX(0)"};

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;

  @media (max-width: 768px) {
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  }
`;

const MobileOverlay = styled.div`
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
  transition: opacity 0.3s ease;

  @media (min-width: 769px) {
    display: none;
  }
`;

const SidebarHeader = styled.div`
  padding: 0.75rem;
  background: #e8e8e8;
  display: flex;
  justify-content: ${(props) => (props.$isCollapsed ? "center" : "flex-start")};
`;

const MenuToggle = styled.button`
  background: none;
  border: none;
  color: #333;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
    transform: scale(1.05);
  }
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li``;

const MenuLink = styled.div`
  display: flex;
  align-items: center;
  padding: ${(props) => {
    if (props.$isMobile) return "0.75rem 1rem";
    return props.$isCollapsed ? "0.75rem" : "0.75rem 1rem";
  }};
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  justify-content: ${(props) => {
    if (props.$isMobile) return "flex-start";
    return props.$isCollapsed ? "center" : "flex-start";
  }};

  &:hover {
    background: #d0d0d0;
  }

  ${(props) =>
    props.$hasSubmenu &&
    props.$isExpanded &&
    !props.$isCollapsed &&
    `
    background: #d0d0d0;
  `}
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

const MenuIcon = styled.span`
  margin-right: ${(props) => {
    if (props.$isMobile) return "0.75rem";
    return props.$isCollapsed ? "0" : "0.75rem";
  }};
  width: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
`;

const MenuLabel = styled.span`
  flex: 1;
  font-size: 0.9rem;
  font-weight: 400;
  white-space: nowrap;
`;

const ArrowIcon = styled.span`
  color: #666;
  transition: transform 0.2s ease;
  transform: ${(props) => (props.$isExpanded ? "rotate(180deg)" : "rotate(0)")};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubMenuContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  background: #f5f5f5;
`;

const SubMenuItem = styled.li``;

const SubMenuLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;

  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

const SubMenuLabel = styled.div`
  padding: 0.5rem 1rem 0.5rem 3rem;
  color: #555;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #e8e8e8;
  }
`;

export default Nvbar;
