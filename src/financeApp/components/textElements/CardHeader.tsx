import styled from "styled-components";
import iconPoints from "../../../../public/images/icon-ellipsis.svg";

interface CardHeaderProps {
  type: any;
  name: any;
  handleDropdownToggle: (value: any) => void;
}

const ContainerCard = styled.div`
    display: flex;
    justify-content: space-between;

        div{
            display: flex;
            align-items: center;
            gap: 1rem;

            .bg-circle{
                width: 16px;
                height: 16px;
                border-radius: 50%;
            }
        }

        button{
            background-color: transparent;
            border: none;
            cursor: pointer;
        }
    }
`;

export const CardHeader: React.FC<CardHeaderProps> = ({
  name,
  type,
  handleDropdownToggle,
}) => {
  return (
    <ContainerCard>
      <div>
        <div
          style={{ backgroundColor: type.theme }}
          className="bg-circle"
        ></div>
        <h2>{name}</h2>
      </div>
      <button onClick={() => handleDropdownToggle(type.id)}>
        <img src={iconPoints} alt="icon" />
      </button>
    </ContainerCard>
  );
};
