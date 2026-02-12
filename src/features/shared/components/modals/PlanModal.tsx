import { Modal } from "./Modal";
import { Button, Input, Label } from "@/components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { Formik, Form, FormikHelpers } from "formik";
import { v4 as uuidv4 } from "uuid";
import { colors } from "@/styles/colors";
import { ThemeOption, PlanModalProps } from "./type";

export const PlanModal = <
  T extends Record<string, unknown> = Record<string, unknown>,
  P = T,
>({
  type,
  title,
  paragraph,
  buttonText,
  dispatchAction,
  inputs,
  initialValues,
  validationSchema,
  showModal,
  usedColors = [],
  onClose,
  onSubmitCallback,
}: PlanModalProps<T, P>) => {
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
  ].map((theme) => ({
    ...theme,
    used: usedColors.includes(theme.value),
  }));
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>(themes[0]);

  const handleFormSubmit = (values: T, helpers: FormikHelpers<T>) => {
    const { resetForm, setSubmitting } = helpers;
    let payload: P;

    if (onSubmitCallback) {
      payload = onSubmitCallback(values);
    } else {
      payload = {
        ...values,
        id: type === "edit" ? (initialValues as { id?: string }).id : uuidv4(),
        theme: selectedTheme ? selectedTheme.value : themes[0].value,
      } as unknown as P;
    }

    setTimeout(() => {
      dispatch(dispatchAction(payload as never));
      resetForm();
      setSubmitting(false);
      onClose();
    }, 1000);
  };

  const handleThemeSelect = (theme: ThemeOption) => {
    if (theme.used) return;
    setSelectedTheme(theme);
    setOpen(false);
  };

  return (
    <Modal showModal={showModal} onClose={onClose}>
      <div className="modal-content">
        <h2 className="text-2xl mb-2 uppercase">{title}</h2>
        <p className="text-[.9rem] ">{paragraph}</p>

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

              <div className="relative">
                <Label text="Color Tag" />
                <button
                  type="button"
                  onClick={() => setOpen(!open)}
                  aria-haspopup="listbox"
                  aria-expanded={open}
                  className="my-2 flex items-center gap-2 py-3 px-4 w-full border border-beigeNormal rounded-lg bg-white cursor-pointer"
                >
                  <div
                    className="w-3.5 h-3.5 rounded-full"
                    style={{ backgroundColor: selectedTheme.value }}
                  />
                  <span>{selectedTheme.name}</span>
                  <span className="ml-auto">{open ? "▲" : "▼"}</span>
                </button>

                {open && (
                  <ul
                    role="listbox"
                    className="absolute top-[110%] left-0 w-full bg-white border border-gray-300 rounded-lg max-h-[200px] overflow-y-auto z-10 py-2"
                  >
                    {themes.map((theme) => (
                      <li
                        key={uuidv4()}
                        onClick={() => {
                          handleThemeSelect(theme);
                        }}
                        className={`flex items-center gap-2 py-2.5 px-4 transition-colors ${
                          theme.used
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer hover:bg-gray-100"
                        }`}
                        role="option"
                        aria-selected={false}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3.5 h-3.5 rounded-full"
                            style={{ backgroundColor: theme.value }}
                          />
                          <span>{theme.name}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <Button
                type="submit"
                background={colors.greyDark}
                backgroundhover={colors.greyMedium}
                color={colors.white}
                border="transparent"
                weight="700"
                size="1rem"
                width="100%"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : buttonText}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};
