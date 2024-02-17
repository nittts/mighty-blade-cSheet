import { useEffect, useState } from "react";
import { isEqual } from "lodash";

export const getChangedValues = <T extends Record<string, any>>(values: T, initialValues: T) => {
  return Object.entries(values).reduce((acc: Partial<T>, [key, value]) => {
    const hasChanged = initialValues[key as keyof T] !== value;

    if (hasChanged) {
      acc[key as keyof T] = value;
    }

    return acc;
  }, {});
};

export const SubmitListener = (props: any) => {
  const [lastValues, updateState] = useState(props.formik.values);

  useEffect(() => {
    const valuesEqualLastValues = isEqual(lastValues, props.formik.values);
    const valuesEqualInitialValues = props.formik.values === props.formik.initialValues;

    if (!valuesEqualLastValues) {
      updateState(props.formik.values);
    }

    if (!valuesEqualLastValues && !valuesEqualInitialValues) {
      props.formik.submitForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastValues, props.formik.values, props.formik.initialValues, props.onBlur, props.onChange, props.formik]);

  return null;
};
