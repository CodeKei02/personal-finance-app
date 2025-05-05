import { Modal } from "./index";
import { Button, Input, Label } from "../form";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import styled from "styled-components";
import { colors } from "../../styles/theme";

interface ThemeOption {
    name: string;
    value: string;
    used?: boolean;
}

export interface FormInput {
    id: string;
    type: string;
    label: string;
    name: string;
    amount?: number;
    placeholder?: string;
    options?: string[];
    validation?: Yup.AnySchema;
}

interface PlanModalProps<T> {
    type?: string;
    title: string;
    paragraph: string;
    buttonText: string;
    dispatchAction: any;
    inputs: FormInput[];
    initialValues: Record<string, any>;
    validationSchema: Yup.ObjectSchema<any>;
    themeOptions?: ThemeOption[];
    showModal: boolean;
    onClose: () => void;
    onSubmitCallback?: (values: any) => T;
}

const Wrapper = styled.div`
  position: relative;
`;

const Selector = styled.button`
  margin: .5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 12px 16px;
  width: 100%;
  border: 1px solid ${colors.beigeNormal};
  border-radius: 8px;
  background-color: ${colors.white};
  cursor: pointer;

`;

const Arrow = styled.span`
  margin-left: auto;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  background: ${colors.white};
  border: 1px solid #ccc;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  padding: 0.5rem 0;

  
`;

const ListItem = styled.li<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 10px 16px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  transition: background 0.2s;

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &:hover {
    background: #f6f6f6;
  }

`;

const ColorCircle = styled.div<{ color: string }>`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

export const PlanModal = <T extends { id: string }>({
    type,
    title,
    paragraph,
    buttonText,
    dispatchAction,
    inputs,
    initialValues,
    validationSchema,
    showModal,
    onClose,
    onSubmitCallback,
}: PlanModalProps<T>) => {

    const themes = [
        { name: "Green", value: colors.green, used: false },
        { name: "Cyan", value: colors.cyan },
        { name: "Yellow", value: colors.yellow },
        { name: "Navy", value: colors.navy },
        { name: "Red", value: colors.red },
        { name: "Purple", value: colors.purple },
        { name: "Pink", value: colors.violet },
        { name: "Turquoise", value: colors.turquoise },
        { name: "Brown", value: colors.brown },
        { name: "Magenta", value: colors.magenta },
        { name: "Blue", value: colors.blue },
        { name: "Navy Grey", value: colors.navyGrey },
        { name: "Army Green", value: colors.armyGreen },
        { name: "Gold", value: colors.gold },
        { name: "Orange", value: colors.orange },
    ]
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState<ThemeOption | any>(themes[0]);

    const handleFormSubmit = (values: any, { resetForm, setSubmitting }: any) => {
        let payload: T;

        if (onSubmitCallback) {
            payload = onSubmitCallback(values);
        } else {
            payload = {
                ...values,
                id: type === 'edit' ? initialValues.id : uuidv4(),
                theme: selectedTheme ? selectedTheme.value : themes[0].value,
            } as T;
        }

        dispatch(dispatchAction(payload))
            .unwrap() 
            .then(() => {
                setTimeout(() => {
                    resetForm();
                    setSubmitting(false);
                    onClose();
                }, 1000); 
            });
    };

    const handleThemeSelect = (theme: ThemeOption) => {
        if (theme.used) return;
        setSelectedTheme(theme);
        setOpen(false);
    }

    return (
        <Modal showModal={showModal} onClose={onClose}>
            <div className="modal-content">
                <h2>{title}</h2>
                <p>{paragraph}</p>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleFormSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            {inputs.map((input) => (
                                <Input
                                    key={input.id}
                                    id={input.id}
                                    type={input.type}
                                    label={input.label}
                                    name={input.name}
                                    placeholder={input.placeholder}
                                    options={input.options}
                                />
                            ))}


                            <Wrapper>
                                <Label text="Color Tag" />
                                <Selector
                                    type="button"
                                    onClick={() => setOpen(!open)}
                                    aria-haspopup="listbox"
                                    aria-expanded={open}
                                >
                                    <ColorCircle color={selectedTheme.value} />
                                    <span>{selectedTheme.name}</span>
                                    <Arrow>{open ? '▲' : '▼'}</Arrow>
                                </Selector>

                                {open && (
                                    <DropdownList role="listbox">
                                        {themes.map((theme) => (

                                            <ListItem
                                                key={uuidv4()}
                                                onClick={() => { handleThemeSelect(theme) }}
                                                disabled={theme.used}
                                                role="option"
                                                aria-selected={false}
                                            >
                                                <div className="dropdown-item">
                                                    <ColorCircle color={theme.value} />
                                                    <span>{theme.name}</span>
                                                </div>
                                            </ListItem>

                                        ))}
                                    </DropdownList>
                                )}
                            </Wrapper>


                            <Button
                                type="submit"
                                background={colors.greyDark}
                                backgroundhover={colors.beigeLight}
                                color={colors.white}
                                border="transparent"
                                weight="700"
                                size="1rem"
                                width="100%"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Processing...' : buttonText}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal>
    );
};