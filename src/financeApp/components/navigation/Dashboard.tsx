import { NavLink, useLocation } from "react-router-dom";
import logoSmall from "../../../../public/images/logo-small.svg";
import logoLarge from "../../../../public/images/logo-large.svg";
import iconArrow from "../../../../public/images/icon-minimize-menu.svg";
import styled from "styled-components";
import { typography, colors, breakpoints } from "../../../styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../../store/slices/uiSlice";
import { RootState } from "../../../store/store";

interface SidebarProps {
  $isOpen: boolean;
}

const Sidebar = styled.aside<SidebarProps>`
  width: 100%;
  height: 50px;
  background-color: ${colors.greyDark};
  position: fixed;
  bottom: 0;
  z-index: 1000;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  .logo {
    display: none;
  }

  @media (min-width: ${breakpoints.tablet}) {
    & {
      height: 65px;
    }
  }

  @media (min-width: ${breakpoints.desktop}) {
    width: ${({ $isOpen }) => ($isOpen ? "300px" : "80px")};
    height: 100vh;
    top: 0;
    transition: all 0.5s cubic-bezier(0.01, 0.98, 0, 0.98);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border-radius: 0px;
    border-bottom-right-radius: 12px;
    border-top-right-radius: 12px;
    font-size: ${typography.textPreset3.size};

    .logo {
      padding-left: 1.5rem;
      margin-top: 2rem;
      display: block;
      cursor: pointer;
    }
  }
`;

const List = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.8rem 0;
  list-style: none;

  @media (min-width: ${breakpoints.desktop}) {
    /*height: 35%;*/
    flex-direction: column;
    justify-content: space-between;
    margin-top: 2.5rem;
  }
`;

const ItemStyles = styled.li<{ $active?: boolean; $isOpen?: boolean }>`
  width: 4rem;
  height: 2.5rem;
  padding-top: 0.5rem;

  ${({ $active }) =>
    $active &&
    `
  background-color: ${colors.white};
  border-bottom: 5px solid ${colors.green};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transition: background-color 0.3s ease-in-out;

  a path {
      fill: ${colors.green};
      transition: fill 0.3s ease-in-out;
    }

  a p {
      color: ${colors.greyDark};
    }

  @media (min-width: ${breakpoints.tablet}) {
    border-bottom: 5px solid ${colors.green};

    path {
      fill: ${colors.green};
      }
    svg {
      width: 1rem;
      height: 1rem;
      }
    p {
      display: block;
      }
  }

  @media (min-width: ${breakpoints.desktop}) {
      border-bottom: 0px solid transparent;
      background-color: transparent;
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
      transition: none;
  }
`}

  @media (min-width: ${breakpoints.tablet}) {
    width: 100px;
    height: auto;
  }

  @media (min-width: ${breakpoints.desktop}) {
    & {
      display: flex;
      width: 100%;
      background-color: transparent;
    }

    p {
      opacity: ${({ $isOpen }) => ($isOpen ? "100%" : "0%")};
      transition: opacity 0.1s ease-in-out;
    }

    p:hover {
      color: ${colors.white};
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  text-align: center;

  p {
    display: none;
    color: ${colors.beigeNormal};
    font-size: ${typography.textPreset5Bold.size};
    font-weight: ${typography.textPreset5Bold.fontWeight};
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  path {
    fill: ${colors.beigeNormal};
  }

  @media (min-width: ${breakpoints.tablet}) {
    svg {
      width: 1rem;
      height: 1rem;
    }

    p {
      display: block;
    }
  }

  @media (min-width: ${breakpoints.desktop}) {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0rem 1rem;
    margin-bottom: 0.5rem;
    height: 2.5rem;

    svg {
      width: 1.5rem;
      height: 1.5rem;
    }

    path:hover {
      fill: ${colors.armyGreen};
    }

    &.active {
      width: 95%;
      border-top-left-radius: 0px;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      background-color: ${colors.white};
    }
  }
`;

const Button = styled.button<SidebarProps>`
    display: none;
    border: 0;
    background-color: transparent;
    color: ${colors.white};
    cursor: pointer;
  
    @media (min-width: ${breakpoints.desktop}){
      display: flex;
      position: absolute;
      bottom: 3.5rem;
      gap: 1.5rem;
      padding-left: 1.5rem;

      p{
        display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
        transition: display 0.1s ease-in-out;
        color: ${colors.beigeNormal};
        font-weight: ${typography.textPreset5Bold.fontWeight};
      }

      img{
        transform: ${({ $isOpen }) =>
          $isOpen ? "rotate(0deg)" : "rotate(180deg)"};
        transition: transform 0.5s ease-in-out;
        width: 1rem;
        height: 1rem;
    }
      
  `;

export const Dashboard = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.ui.isOpen);
  const location = useLocation();
  const dashboardInfo = [
    {
      id: "1",
      title: "Overview",
      path: "/finance/overview",
      svgImage:
        "<svg viewBox='0 0 16 16'><path d='M14 7.22185V13C14 13.2652 13.8946 13.5195 13.7071 13.7071C13.5196 13.8946 13.2652 14 13 14H10.5C10.2348 14 9.98043 13.8946 9.79289 13.7071C9.60536 13.5195 9.5 13.2652 9.5 13V10.5C9.5 10.3674 9.44732 10.2402 9.35355 10.1464C9.25979 10.0527 9.13261 9.99997 9 9.99997H7C6.86739 9.99997 6.74021 10.0527 6.64645 10.1464C6.55268 10.2402 6.5 10.3674 6.5 10.5V13C6.5 13.2652 6.39464 13.5195 6.20711 13.7071C6.01957 13.8946 5.76522 14 5.5 14H3C2.73478 14 2.48043 13.8946 2.29289 13.7071C2.10536 13.5195 2 13.2652 2 13V7.22185C1.99998 7.08345 2.02869 6.94655 2.08431 6.81982C2.13993 6.69309 2.22125 6.57928 2.32312 6.4856L7.32312 1.7681L7.33 1.76122C7.51409 1.59381 7.75398 1.50104 8.00281 1.50104C8.25164 1.50104 8.49154 1.59381 8.67562 1.76122C8.67776 1.76367 8.68005 1.76597 8.6825 1.7681L13.6825 6.4856C13.7834 6.57977 13.8636 6.6938 13.9183 6.82051C13.9729 6.94722 14.0007 7.08386 14 7.22185Z'></path></svg>",
    },
    {
      id: "2",
      title: "Transactions",
      path: "/finance/transactions",
      svgImage:
        "<svg viewBox='0 0 16 16'><path d='M7.4619 10.8088C7.4998 10.9001 7.50976 11.0007 7.49051 11.0977C7.47127 11.1947 7.42368 11.2838 7.35378 11.3538L5.35378 13.3538C5.30734 13.4003 5.2522 13.4371 5.1915 13.4623C5.1308 13.4875 5.06574 13.5004 5.00003 13.5004C4.93432 13.5004 4.86926 13.4875 4.80856 13.4623C4.74786 13.4371 4.69271 13.4003 4.64628 13.3538L2.64628 11.3538C2.57627 11.2838 2.52859 11.1947 2.50926 11.0977C2.48994 11.0006 2.49984 10.9 2.53772 10.8086C2.57559 10.7172 2.63974 10.6391 2.72204 10.5842C2.80433 10.5292 2.90108 10.4999 3.00003 10.5H4.50003V3.00003C4.50003 2.86742 4.55271 2.74024 4.64647 2.64647C4.74024 2.55271 4.86742 2.50003 5.00003 2.50003C5.13264 2.50003 5.25981 2.55271 5.35358 2.64647C5.44735 2.74024 5.50003 2.86742 5.50003 3.00003V10.5H7.00003C7.09892 10.5 7.19558 10.5294 7.27779 10.5843C7.36001 10.6393 7.42408 10.7174 7.4619 10.8088ZM13.3538 4.64628L11.3538 2.64628C11.3073 2.59979 11.2522 2.56291 11.1915 2.53775C11.1308 2.51259 11.0657 2.49963 11 2.49963C10.9343 2.49963 10.8693 2.51259 10.8086 2.53775C10.7479 2.56291 10.6927 2.59979 10.6463 2.64628L8.64628 4.64628C8.57627 4.7162 8.52859 4.80533 8.50926 4.90237C8.48994 4.99942 8.49984 5.10001 8.53772 5.19142C8.57559 5.28283 8.63974 5.36095 8.72204 5.41589C8.80433 5.47082 8.90108 5.50011 9.00003 5.50003H10.5V13C10.5 13.1326 10.5527 13.2598 10.6465 13.3536C10.7402 13.4473 10.8674 13.5 11 13.5C11.1326 13.5 11.2598 13.4473 11.3536 13.3536C11.4474 13.2598 11.5 13.1326 11.5 13V5.50003H13C13.099 5.50011 13.1957 5.47082 13.278 5.41589C13.3603 5.36095 13.4245 5.28283 13.4623 5.19142C13.5002 5.10001 13.5101 4.99942 13.4908 4.90237C13.4715 4.80533 13.4238 4.7162 13.3538 4.64628Z'></path></svg>",
    },
    {
      id: "3",
      title: "Budgets",
      path: "/finance/budgets",
      svgImage:
        "<svg viewBox='0 0 16 16'><path d='M1.54686 7.22122C1.69451 5.98313 2.20091 4.81523 3.00373 3.86122C3.09256 3.7541 3.20277 3.6667 3.32731 3.60462C3.45185 3.54253 3.58798 3.50711 3.72699 3.50064C3.86599 3.49417 4.00482 3.51679 4.13459 3.56704C4.26436 3.61729 4.38221 3.69407 4.48061 3.79247L6.20998 5.55872C6.37653 5.72489 6.4786 5.94485 6.49794 6.17932C6.51729 6.41379 6.45267 6.6475 6.31561 6.83872C6.21179 6.986 6.13361 7.14976 6.08436 7.32309C6.06872 7.37424 6.03708 7.41901 5.99411 7.45085C5.95114 7.48269 5.89909 7.4999 5.84561 7.49997H1.79561C1.76032 7.50003 1.72541 7.49261 1.69319 7.47821C1.66097 7.46381 1.63217 7.44276 1.60867 7.41642C1.58517 7.39009 1.56752 7.35909 1.55686 7.32544C1.54621 7.2918 1.5428 7.25628 1.54686 7.22122ZM8.58686 1.50372C8.44874 1.49167 8.30962 1.50848 8.17834 1.55308C8.04706 1.59767 7.92649 1.66908 7.82428 1.76277C7.72207 1.85645 7.64046 1.97037 7.58463 2.09728C7.52881 2.22419 7.49998 2.36132 7.49998 2.49997V5.04184C7.49826 5.27771 7.58069 5.50646 7.73248 5.687C7.88426 5.86754 8.09545 5.98804 8.32811 6.02684C8.7662 6.09912 9.16778 6.31512 9.46957 6.6408C9.77135 6.96648 9.95618 7.38333 9.99493 7.82565C10.0337 8.26796 9.92413 8.7106 9.68356 9.08379C9.443 9.45698 9.08508 9.73951 8.66623 9.88684C8.61748 9.90475 8.5754 9.93719 8.54567 9.97977C8.51594 10.0224 8.5 10.073 8.49998 10.125V14.2018C8.49975 14.2372 8.50703 14.2723 8.52135 14.3047C8.53568 14.337 8.55671 14.366 8.58306 14.3896C8.60941 14.4133 8.64048 14.431 8.67421 14.4417C8.70795 14.4525 8.74357 14.4559 8.77873 14.4518C10.3386 14.2593 11.7765 13.5098 12.8277 12.3413C13.879 11.1728 14.4728 9.66399 14.5 8.09247C14.5469 4.69934 11.9494 1.80497 8.58686 1.50372ZM7.32811 9.88497C7.04862 9.78528 6.79482 9.62464 6.5851 9.41471C6.37539 9.20478 6.21501 8.95081 6.11561 8.67122C6.09856 8.62164 6.06658 8.57855 6.02405 8.54788C5.98152 8.51722 5.93054 8.50048 5.87811 8.49997H1.79498C1.75965 8.49975 1.72466 8.50702 1.69234 8.5213C1.66002 8.53558 1.63109 8.55656 1.60747 8.58284C1.58385 8.60912 1.56606 8.64011 1.55529 8.67377C1.54452 8.70742 1.54101 8.74298 1.54498 8.77809C1.72005 10.2227 2.37438 11.567 3.40336 12.596C4.43235 13.625 5.7766 14.2793 7.22123 14.4543C7.25635 14.4583 7.2919 14.4548 7.32556 14.444C7.35922 14.4333 7.39021 14.4155 7.41649 14.3919C7.44277 14.3682 7.46374 14.3393 7.47803 14.307C7.49231 14.2747 7.49958 14.2397 7.49936 14.2043V10.125C7.49946 10.0721 7.483 10.0205 7.45228 9.97746C7.42157 9.93442 7.37814 9.90207 7.32811 9.88497Z'></path></svg>",
    },
    {
      id: "4",
      title: "Pots",
      path: "/finance/pots",
      svgImage:
        "<svg viewBox='0 0 16 16'><path d='M11.5 3.05063V2C11.5 1.73478 11.3946 1.48043 11.2071 1.29289C11.0196 1.10536 10.7652 1 10.5 1H5.5C5.23478 1 4.98043 1.10536 4.79289 1.29289C4.60536 1.48043 4.5 1.73478 4.5 2V3.05063C3.93569 3.16641 3.42859 3.4733 3.06425 3.91951C2.6999 4.36571 2.50061 4.92394 2.5 5.5V12.5C2.5 13.163 2.76339 13.7989 3.23223 14.2678C3.70107 14.7366 4.33696 15 5 15H11C11.663 15 12.2989 14.7366 12.7678 14.2678C13.2366 13.7989 13.5 13.163 13.5 12.5V5.5C13.4994 4.92394 13.3001 4.36571 12.9358 3.91951C12.5714 3.4733 12.0643 3.16641 11.5 3.05063ZM7.5 2H8.5V3H7.5V2ZM5.5 2H6.5V3H5.5V2ZM8.5 11.5V12C8.5 12.1326 8.44732 12.2598 8.35355 12.3536C8.25979 12.4473 8.13261 12.5 8 12.5C7.86739 12.5 7.74021 12.4473 7.64645 12.3536C7.55268 12.2598 7.5 12.1326 7.5 12V11.5H7C6.86739 11.5 6.74021 11.4473 6.64645 11.3536C6.55268 11.2598 6.5 11.1326 6.5 11C6.5 10.8674 6.55268 10.7402 6.64645 10.6464C6.74021 10.5527 6.86739 10.5 7 10.5H8.5C8.63261 10.5 8.75979 10.4473 8.85355 10.3536C8.94732 10.2598 9 10.1326 9 10C9 9.86739 8.94732 9.74021 8.85355 9.64645C8.75979 9.55268 8.63261 9.5 8.5 9.5H7.5C7.10218 9.5 6.72064 9.34196 6.43934 9.06066C6.15804 8.77936 6 8.39782 6 8C6 7.60218 6.15804 7.22064 6.43934 6.93934C6.72064 6.65804 7.10218 6.5 7.5 6.5V6C7.5 5.86739 7.55268 5.74021 7.64645 5.64645C7.74021 5.55268 7.86739 5.5 8 5.5C8.13261 5.5 8.25979 5.55268 8.35355 5.64645C8.44732 5.74021 8.5 5.86739 8.5 6V6.5H9C9.13261 6.5 9.25979 6.55268 9.35355 6.64645C9.44732 6.74021 9.5 6.86739 9.5 7C9.5 7.13261 9.44732 7.25979 9.35355 7.35355C9.25979 7.44732 9.13261 7.5 9 7.5H7.5C7.36739 7.5 7.24021 7.55268 7.14645 7.64645C7.05268 7.74021 7 7.86739 7 8C7 8.13261 7.05268 8.25979 7.14645 8.35355C7.24021 8.44732 7.36739 8.5 7.5 8.5H8.5C8.89782 8.5 9.27936 8.65804 9.56066 8.93934C9.84196 9.22064 10 9.60218 10 10C10 10.3978 9.84196 10.7794 9.56066 11.0607C9.27936 11.342 8.89782 11.5 8.5 11.5ZM10.5 3H9.5V2H10.5V3Z'></path></svg>",
    },
    {
      id: "5",
      title: "Recurring Bills",
      path: "/finance/bills",
      svgImage:
        "<svg viewBox='0 0 16 16'><path d='M13.5 2.5H2.5C2.23478 2.5 1.98043 2.60536 1.79289 2.79289C1.60536 2.98043 1.5 3.23478 1.5 3.5V13C1.50005 13.0852 1.52187 13.169 1.56341 13.2434C1.60494 13.3178 1.66481 13.3804 1.73732 13.4252C1.80983 13.4699 1.89258 13.4954 1.97771 13.4992C2.06285 13.503 2.14754 13.485 2.22375 13.4469L4 12.5588L5.77625 13.4469C5.84572 13.4816 5.92232 13.4997 6 13.4997C6.07768 13.4997 6.15428 13.4816 6.22375 13.4469L8 12.5588L9.77625 13.4469C9.84571 13.4816 9.92232 13.4997 10 13.4997C10.0777 13.4997 10.1543 13.4816 10.2238 13.4469L12 12.5588L13.7762 13.4469C13.8525 13.485 13.9372 13.503 14.0223 13.4992C14.1074 13.4954 14.1902 13.4699 14.2627 13.4252C14.3352 13.3804 14.3951 13.3178 14.4366 13.2434C14.4781 13.169 14.5 13.0852 14.5 13V3.5C14.5 3.23478 14.3946 2.98043 14.2071 2.79289C14.0196 2.60536 13.7652 2.5 13.5 2.5ZM11 9H5C4.86739 9 4.74021 8.94732 4.64645 8.85355C4.55268 8.75979 4.5 8.63261 4.5 8.5C4.5 8.36739 4.55268 8.24021 4.64645 8.14645C4.74021 8.05268 4.86739 8 5 8H11C11.1326 8 11.2598 8.05268 11.3536 8.14645C11.4473 8.24021 11.5 8.36739 11.5 8.5C11.5 8.63261 11.4473 8.75979 11.3536 8.85355C11.2598 8.94732 11.1326 9 11 9ZM11 7H5C4.86739 7 4.74021 6.94732 4.64645 6.85355C4.55268 6.75979 4.5 6.63261 4.5 6.5C4.5 6.36739 4.55268 6.24021 4.64645 6.14645C4.74021 6.05268 4.86739 6 5 6H11C11.1326 6 11.2598 6.05268 11.3536 6.14645C11.4473 6.24021 11.5 6.36739 11.5 6.5C11.5 6.63261 11.4473 6.75979 11.3536 6.85355C11.2598 6.94732 11.1326 7 11 7Z'></path></svg>",
    },
  ];

  return (
    <Sidebar $isOpen={isOpen}>
      {!isOpen ? (
        <NavLink to="/finance/overview" className="logo logo--small">
          <img src={logoSmall} alt="finance-logo" />
        </NavLink>
      ) : (
        <NavLink to="/finance/overview" className="logo logo--large">
          <img src={logoLarge} alt="finance-logo" />
        </NavLink>
      )}

      <List>
        {dashboardInfo.map(
          (item: {
            id: string;
            title: string;
            path: string;
            svgImage: string;
          }) => {
            const isActive = location.pathname === item.path;
            return (
              <ItemStyles key={item.id} $active={isActive} $isOpen={isOpen}>
                <StyledNavLink to={item.path}>
                  <div
                    className="svgImage"
                    dangerouslySetInnerHTML={{ __html: item.svgImage }}
                  />
                  <p>{item.title}</p>
                </StyledNavLink>
              </ItemStyles>
            );
          }
        )}
      </List>

      <Button onClick={() => dispatch(toggleMenu())} $isOpen={isOpen}>
        <div className="svgImage">
          <img src={iconArrow} alt="arrow" />
        </div>
        <p>Minimize Menu</p>
      </Button>
    </Sidebar>
  );
};
