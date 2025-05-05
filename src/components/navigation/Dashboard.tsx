import { NavLink } from "react-router-dom"
import logoSmall from "../../../public/images/logo-small.svg"
import logoLarge from "../../../public/images/logo-large.svg"
import iconArrow from "../../../public/images/icon-minimize-menu.svg"
import styled from "styled-components"
import { typography, colors, breakpoints } from "../../styles/theme"
import dashboard from "./dashboard.json";
import { useDispatch, useSelector } from "react-redux"
import { toggleMenu } from "../../store/slices/uiSlice"
import { RootState } from "../../store/store"

interface SidebarProps {
  $isOpen: boolean;
}

interface StyledNavLinkProps {
  $isOpen: boolean;
}

const Sidebar = styled.aside<SidebarProps>`
    width: 100%;
    height: 60px;
    background-color: ${colors.greyDark};
    position: fixed;
    bottom: 0;
    z-index: 1000;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    .logo{
      display: none;
    }

    .svgImage{
        display: block;
    }


    @media (min-width: ${breakpoints.tablet}){
      &{
        height: 75px;
      }
    }

    @media (min-width: ${breakpoints.desktop}){
      width: ${({ $isOpen }) => ($isOpen ? "300px" : "80px")};
      height: 100vh;
      top: 0;
      transition: all 0.5s cubic-bezier(.01,.98,0,.98);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      border-radius: 0px;
      border-bottom-right-radius: 12px;
      border-top-right-radius: 12px;

      font-size: ${typography.textPreset3.size};

      .logo{
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
    padding: .5rem 0;

    @media (min-width: ${breakpoints.desktop}){
      height: 35%;
      flex-direction: column;
      justify-content: space-between;
      margin-top: 2.5rem;
    }
`;

const StyledNavLink = styled(NavLink) <StyledNavLinkProps>`
  &{
    text-decoration: none;
    text-align: center;
  }

  &.active{
    background-color: ${colors.white};
    height: 3rem;
    width: 4rem;
    border-bottom: 5px solid ${colors.green};
    padding-top: .5rem;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    transition: background-color 0.5s ease-in-out;

    path{
      fill: ${colors.green};
      transition: fill 0.5s ease-in-out;
    }

    p{
      color: ${colors.greyDark};
    }
  }

  p{
    display: none;
    color: ${colors.beigeNormal};
    font-size: ${typography.textPreset5Bold.size};
    font-weight: ${typography.textPreset5Bold.fontWeight}
  }

  svg{
      width: 1.5rem;
      height: 1.5rem;
    }

  path{
    fill: ${colors.beigeNormal};
  }

  path:hover{
    fill: ${colors.white};
  }


  @media (min-width: ${breakpoints.tablet}){
    &{
      height: auto;
    }

    &.active{
    width: 100px;
    height: 4.5rem;
    border-bottom: 10px solid ${colors.green};

    path{
      fill: ${colors.green};
    }
  }

  svg{
    width: 1rem;
    height: 1rem;
  }

    p{
      display: block;
    }
  }

  @media (min-width: ${breakpoints.desktop}){
    &{
      display: flex;
      padding: 1rem 0;
      padding-left: 1.5rem;
      justify-content: flex-start;
      align-items: center; 
      gap: 2rem;
      width: 100%;
    }

    &.active{
      border-radius: 0px;
      width: 100%;
      height: auto;
      border: 0;
    }

    svg{
      width: 1.5rem;
      height: 1.5rem;
    }

    p{
      opacity: ${({ $isOpen }) => ($isOpen ? "100%" : "0%")};
      transition: opacity 0.1s ease-in-out;
    }

    p:hover{
      color: ${colors.white};
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
        opacity: ${({ $isOpen }) => ($isOpen ? "100%" : "0%")};
        transition: opacity 0.1s ease-in-out;
        color: ${colors.beigeNormal};
        font-weight: ${typography.textPreset5Bold.fontWeight};
      }

      img{
        transform: ${({ $isOpen }) => ($isOpen ? "rotate(0deg)" : "rotate(180deg)")};
        transition: transform 0.5s ease-in-out;
        width: 1rem;
        height: 1rem;
    }
      
  `

export const Dashboard = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.ui.isOpen);

  return (
    <Sidebar $isOpen={isOpen}>
      {!isOpen ?
        <NavLink to="/" className="logo logo--small">
          <img src={logoSmall} alt="finance-logo" />
        </NavLink>
        :
        <NavLink to="/" className="logo logo--large">
          <img src={logoLarge} alt="finance-logo" />
        </NavLink>
      }

      <List>
        {dashboard.map((item: {id: string, title: string, path: string, svgImage: string}) => (
          <StyledNavLink to={item.path} key={item.id} $isOpen={isOpen}>
            <div className="svgImage" dangerouslySetInnerHTML={{ __html: item.svgImage }} />
            <p>{item.title}</p>
          </StyledNavLink>
        ))}
      </List>

      <Button onClick={() => dispatch(toggleMenu())} $isOpen={isOpen}>
        <div className="svgImage">
          <img src={iconArrow} alt="arrow" />
        </div>
        <p>Minimize Menu</p>
      </Button>
    </Sidebar>
  )
}